import assert from "node:assert/strict";
import {spawnSync} from "node:child_process";
import {readFileSync} from "node:fs";
import test from "node:test";

import {parse} from "yaml";

import {
  buildReviewBody,
  buildReviewTitle,
  findExistingReviewIssue,
  openReviewIssue,
} from "./open-plugin-standard-review.mjs";
import {
  STANDARD_PATH,
  WORKFLOW_PATH,
  validateRepository,
  validateStandard,
  validateWorkflow,
} from "./validate-plugin-standard.mjs";

const standard = readFileSync(STANDARD_PATH, "utf8");
const workflow = readFileSync(WORKFLOW_PATH, "utf8");

function mockResponse(body, link = null, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: new Headers(link ? {link} : undefined),
    json: async () => body,
  };
}

test("accepts the repository standard and review workflow", () => {
  assert.deepEqual(validateRepository({standard, workflow}), []);
});

test("requires the portable core to precede optional profiles", () => {
  const invalid = standard.replace("## Portable core", "## Removed portable core");
  assert.match(validateStandard(invalid).join("\n"), /Portable core|portable core/);
});

test("requires scoped entrypoint cleanup to preserve loader status", () => {
  const invalid = standard.replace('return "$loader_status"\n} "$@"', 'return 0\n} "$@"');
  assert.match(validateStandard(invalid).join("\n"), /return the loader status/);
});

test("propagates a nonzero loader status after cleanup", () => {
  const marker = '```zsh title="Contain entrypoint setup"\n';
  const start = standard.indexOf(marker) + marker.length;
  const end = standard.indexOf("\n```", start);
  const example = standard
    .slice(start, end)
    .replace("# Register the plugin's persistent functions, hooks, and state.", "return 23");
  const result = spawnSync("zsh", ["-f", "-c", `${example}\nexit $?`], {encoding: "utf8"});

  assert.equal(result.error, undefined);
  assert.equal(result.status, 23, result.stderr);
});

test("rejects the stale absolute-path claim", () => {
  assert.match(validateStandard(`${standard}\n%N always gives the absolute path.\n`).join("\n"), /always absolute/);
});

test("rejects checking ZLE without loading its module", () => {
  const invalid = standard.replaceAll("zmodload zsh/zle", "zmodload -e  zsh/zle");
  assert.match(validateStandard(invalid).join("\n"), /load zsh\/zle/);
});

test("requires each ZLE example to load before testing the facility", () => {
  const facility = "$" + "{+builtins[zle]}";
  const invalid = standard.replace(
    `if zmodload zsh/zle && (( ${facility} )); then`,
    `if (( ${facility} )) && zmodload zsh/zle; then`,
  );
  assert.match(validateStandard(invalid).join("\n"), /load zsh\/zle inside the interactive guard/);
});

test("requires the ZLE load to remain nested in the interactive guard", () => {
  const invalid = standard.replace(
    "if [[ -o interactive ]]; then\n  if zmodload zsh/zle",
    "if [[ -o interactive ]]; then\nfi\nif zmodload zsh/zle",
  );
  assert.match(validateStandard(invalid).join("\n"), /inside the interactive guard/);
});

test("rejects a disabled workflow trigger", () => {
  const invalid = workflow.replace("\non:\n", "\noff:\n");
  assert.match(validateWorkflow(invalid).join("\n"), /on mapping/);
});

test("rejects workflow_dispatch set to false", () => {
  const invalid = workflow.replace("workflow_dispatch:", "workflow_dispatch: false");
  assert.match(validateWorkflow(invalid).join("\n"), /workflow_dispatch/);
});

test("rejects removal of scheduled issue creation", () => {
  const invalid = workflow.replace("node scripts/open-plugin-standard-review.mjs", "echo skipped");
  assert.match(validateWorkflow(invalid).join("\n"), /open-plugin-standard-review/);
});

test("rejects validation before repository setup", () => {
  const parsed = parse(workflow);
  const [validateStep] = parsed.jobs.review.steps.splice(5, 1);
  parsed.jobs.review.steps.unshift(validateStep);
  assert.match(validateWorkflow(JSON.stringify(parsed)).join("\n"), /step 1/);
});

test("rejects removal of Zsh provisioning", () => {
  const parsed = parse(workflow);
  parsed.jobs.review.steps.splice(4, 1);
  assert.match(validateWorkflow(JSON.stringify(parsed)).join("\n"), /complete required step sequence/);
});

test("rejects mutation of Zsh provisioning", () => {
  const invalid = workflow.replace(
    "sudo apt-get update && sudo apt-get install --yes --no-install-recommends zsh",
    "sudo apt-get install --yes zsh",
  );
  assert.match(validateWorkflow(invalid).join("\n"), /Install Zsh must run/);
});

test("rejects Zsh provisioning after deterministic validation", () => {
  const parsed = parse(workflow);
  const [zshStep] = parsed.jobs.review.steps.splice(4, 1);
  parsed.jobs.review.steps.splice(5, 0, zshStep);
  assert.match(validateWorkflow(JSON.stringify(parsed)).join("\n"), /step 5 must be Install Zsh/);
});

test("rejects extra triggers and skippable required steps", () => {
  const parsed = parse(workflow);
  parsed.on.push = {};
  parsed.jobs.review.steps[5].if = false;
  const errors = validateWorkflow(JSON.stringify(parsed)).join("\n");
  assert.match(errors, /exactly schedule and workflow_dispatch/);
  assert.match(errors, /must not be skipped/);
});

test("rejects concurrency extensions and job permission overrides", () => {
  const parsed = parse(workflow);
  parsed.concurrency.extra = true;
  parsed.jobs.review.permissions = {issues: "none"};
  const errors = validateWorkflow(JSON.stringify(parsed)).join("\n");
  assert.match(errors, /serialize reviews/);
  assert.match(errors, /must not override/);
});

test("rejects behavior-changing workflow mapping fields", () => {
  const parsed = parse(workflow);
  parsed.on.schedule[0].timezone = "Europe/London";
  parsed.jobs.review.strategy = {matrix: {node: [22]}};
  parsed.jobs.review.steps[0].with = {repository: "other/repository"};
  parsed.jobs.review.steps[6].env.NODE_OPTIONS = "--import=./other.mjs";
  const errors = validateWorkflow(JSON.stringify(parsed)).join("\n");
  assert.match(errors, /07:23 UTC/);
  assert.match(errors, /review job must contain only/);
  assert.match(errors, /Check out repository must contain only/);
  assert.match(errors, /repository-scoped GitHub token/);
});

test("returns validation errors for non-mapping required steps", () => {
  const parsed = parse(workflow);
  parsed.jobs.review.steps[2] = null;
  parsed.jobs.review.steps[6] = "invalid";
  const errors = validateWorkflow(JSON.stringify(parsed)).join("\n");

  assert.match(errors, /Node setup must use Node 22/);
  assert.match(errors, /repository-scoped GitHub token/);
});

test("builds stable half-year review metadata", () => {
  assert.equal(buildReviewTitle(new Date("2026-01-17T07:23:00Z")), "Review Zsh Plugin Standard relevance: 2026 H1");
  assert.equal(buildReviewTitle(new Date("2026-07-17T07:23:00Z")), "Review Zsh Plugin Standard relevance: 2026 H2");
  assert.match(buildReviewBody(), /maintainer-approved exception/);
  assert.match(buildReviewBody(), /Private meta-workspace consistency/);
});

test("paginates and matches only an exact issue title", async () => {
  const title = "Review Zsh Plugin Standard relevance: 2026 H2";
  const firstPage = Array.from({length: 100}, (_, number) => ({
    number,
    title: number === 0 ? `${title} follow-up` : `Issue ${number}`,
  }));
  firstPage[1] = {number: 1, title, pull_request: {url: "https://api.github.com/repos/z-shell/wiki/pulls/1"}};
  const calls = [];
  const fetchImpl = async (url) => {
    calls.push(url);
    if (calls.length === 1) {
      return mockResponse(
        firstPage,
        '<https://api.github.com/repositories/1/issues?state=all&per_page=100&page=2>; rel="next"',
      );
    }
    return mockResponse([{number: 321, title}]);
  };

  const issue = await findExistingReviewIssue({fetchImpl, repository: "z-shell/wiki", token: "test", title});
  assert.equal(issue.number, 321);
  assert.equal(calls.length, 2);
});

test("does not create a duplicate review issue", async () => {
  const calls = [];
  const fetchImpl = async (url, options) => {
    calls.push({url, options});
    return mockResponse([{number: 42, title: "Review Zsh Plugin Standard relevance: 2026 H2"}]);
  };

  const result = await openReviewIssue({
    fetchImpl,
    repository: "z-shell/wiki",
    token: "test",
    now: new Date("2026-08-15T00:00:00Z"),
  });
  assert.equal(result.created, false);
  assert.equal(calls.length, 1);
});

test("creates one structured issue when no exact match exists", async () => {
  const calls = [];
  const fetchImpl = async (url, options = {}) => {
    calls.push({url, options});
    if (options.method === "POST") {
      return mockResponse({number: 99, ...JSON.parse(options.body)});
    }
    return mockResponse([]);
  };

  const result = await openReviewIssue({
    fetchImpl,
    repository: "z-shell/wiki",
    token: "test",
    now: new Date("2026-08-15T00:00:00Z"),
  });
  assert.equal(result.created, true);
  assert.equal(calls.length, 2);
  assert.equal(calls[1].options.method, "POST");
  assert.match(calls[1].options.body, /Official Zsh changes/);
});

test("requires exact minimal permissions", () => {
  const invalid = workflow.replace("contents: read", "contents: write");
  assert.match(validateWorkflow(invalid).join("\n"), /permissions/);
});

test("rejects mutable action references", () => {
  const invalid = workflow.replace(/actions\/checkout@[0-9a-f]{40}/, "actions/checkout@v7");
  assert.match(validateWorkflow(invalid).join("\n"), /pinned/);
});
