#!/usr/bin/env node

import {readFileSync, realpathSync} from "node:fs";
import {fileURLToPath, pathToFileURL} from "node:url";

import {parse} from "yaml";

import {buildReviewBody} from "./open-plugin-standard-review.mjs";

export const STANDARD_PATH = "community/00_contributing/03_zsh_plugin_standard.mdx";
export const WORKFLOW_PATH = ".github/workflows/plugin-standard-review.yml";

const GITHUB_TOKEN_EXPRESSION = "$" + "{{ github.token }}";
const GITHUB_WORKFLOW_EXPRESSION = "$" + "{{ github.workflow }}";
const PINNED_ACTION = /@[0-9a-f]{40}$/;

const REQUIRED_ANCHORS = [
  "what-is-a-zsh-plugin",
  "zero-handling",
  "functions-directory",
  "binaries-directory",
  "unload-function",
  "activity-indicator",
  "global-parameter-with-prefix",
  "global-parameter-with-capabilities",
  "run-on-unload-call",
  "run-on-update-call",
  "use-of-add-zsh-hook-to-install-hooks",
  "use-of-add-zle-hook-widget-to-install-zle-hooks",
  "standard-parameter-naming",
  "standard-plugins-hash",
  "the-proposed-function-name-prefixes",
  "status--zero-handling-",
  "status--functions-directory-",
  "status--binaries-directory-",
  "status--run-on-unload-call-",
  "status--run-on-update-call-",
  "status--activity-indicator-",
  "status--global-parameter-with-prefix-",
  "status--global-parameter-with-capabilities-",
  "zsh-plugin-programming-best-practices",
];

const REQUIRED_STANDARD_TEXT = [
  "This is ecosystem guidance, not an official Zsh language specification.",
  "## Portable core",
  "## Optional manager interoperability profiles",
  // Managers are named where a plugin author needs the interop fact, which is
  // the profile appendix, not the page introduction. These pins keep the
  // anti-conflation guarantee at that location rather than requiring
  // manager positioning up front.
  "The canonical z-shell manager is",
  "Zinit",
  "it is not Zi",
  "not guaranteed to be absolute",
  "autoload -Uz add-zsh-hook",
  "autoload -Uz add-zle-hook-widget",
  "zmodload zsh/zle",
  "The plugin should not run `compinit`",
  "zsh -n ./example.plugin.zsh",
  "zsh -f -c",
  "XDG_CACHE_HOME",
  "XDG_STATE_HOME",
  "XDG_DATA_HOME",
  "zsh/zprof",
  "Do not access the network",
  "Do not automatically prepend",
  "There is no plugin manifest standard",
];

const REQUIRED_REVIEW_BODY_TEXT = [
  "Official Zsh changes",
  "Major manager adoption",
  "Examples and links",
  "Security and performance",
  "Internal capability consistency",
  "Public governance consistency",
  "Private meta-workspace consistency",
  "https://github.com/z-shell/.github/blob/main/runbooks/recurring-operations.md",
  "does not edit the standard",
  "maintainer-approved exception",
  "z-shell/wiki maintainers own",
];

function missingText(content, required, label) {
  return required.filter((text) => !content.includes(text)).map((text) => `${label} is missing: ${text}`);
}

function codeBlock(content, title) {
  const marker = `\`\`\`zsh title="${title}"\n`;
  const start = content.indexOf(marker);
  if (start < 0) {
    return null;
  }
  const codeStart = start + marker.length;
  const end = content.indexOf("\n```", codeStart);
  return end < 0 ? null : content.slice(codeStart, end);
}

function validateZleExample(content, title, requiresHookHelper) {
  const code = codeBlock(content, title);
  if (code === null) {
    return [`standard is missing ZLE example: ${title}`];
  }

  const nestedLoadAndTest =
    /^if \[\[ -o interactive \]\]; then\n {2}if zmodload zsh\/zle && \(\( \$\{\+builtins\[zle\]\} \)\); then$/m;
  const loadAndTest = /^ {2}if zmodload zsh\/zle && \(\( \$\{\+builtins\[zle\]\} \)\); then$/m;
  const nestedMatch = nestedLoadAndTest.exec(code);
  const loadMatch = loadAndTest.exec(code);
  if (!nestedMatch || !loadMatch || !code.endsWith("  fi\nfi")) {
    return [`${title} must load zsh/zle inside the interactive guard before testing the zle builtin`];
  }
  if (requiresHookHelper && !/^ {4}autoload -Uz add-zle-hook-widget$/m.test(code.slice(loadMatch.index))) {
    return [`${title} must autoload add-zle-hook-widget after ZLE is available`];
  }
  return [];
}

function validateLoaderExample(content) {
  const code = codeBlock(content, "Contain entrypoint setup");
  if (code === null) {
    return ["standard is missing the scoped entrypoint example"];
  }
  const statusPreservingCleanup =
    /\(\) \{\n {2}_example_load "\$@"\n {2}local loader_status=\$\?\n {2}unfunction _example_load\n {2}return "\$loader_status"\n\} "\$@"$/;
  return statusPreservingCleanup.test(code)
    ? []
    : ["scoped entrypoint must return the loader status after removing its temporary function"];
}

export function validateStandard(content) {
  const errors = [];

  if (!/^id: zsh_plugin_standard$/m.test(content)) {
    errors.push("frontmatter must preserve id: zsh_plugin_standard");
  }
  if (!/^slug: \/zsh_plugin_standard$/m.test(content)) {
    errors.push("frontmatter must preserve slug: /zsh_plugin_standard");
  }

  errors.push(...missingText(content, REQUIRED_STANDARD_TEXT, "standard"));
  errors.push(
    ...REQUIRED_ANCHORS.filter((anchor) => !content.includes(`#${anchor} `) && !content.includes(`id="${anchor}"`)).map(
      (anchor) => `standard is missing compatibility anchor: ${anchor}`,
    ),
  );

  const coreIndex = content.indexOf("## Portable core");
  const profilesIndex = content.indexOf("## Optional manager interoperability profiles");
  if (coreIndex < 0 || profilesIndex < 0 || coreIndex >= profilesIndex) {
    errors.push("portable core must appear before optional manager profiles");
  }
  errors.push(...validateZleExample(content, "Register an interactive ZLE hook", true));
  errors.push(...validateZleExample(content, "Check an optional feature", false));
  errors.push(...validateLoaderExample(content));

  const stalePatterns = [
    [/always gives the absolute path/i, "must not claim %N is always absolute"],
    [/trap "unset -f/, "must not broadly delete newly defined functions"],
    [/setopt posix_argzero` will be detected/, "must not claim posix_argzero is detected; it makes 0 read-only"],
    // Anchored to line start so the form is caught as published code but still
    // citable in prose, where it is wrapped in backticks mid-sentence.
    [
      /^0="\$\{\$\{\(M\)0:#\/\*\}:-\$PWD\/\$0\}"$/m,
      "must not publish the superseded $PWD self-location form; use the :a modifier instead",
    ],
    [/PMSPEC=0fuUpiPs(?!X)/, "must not publish the obsolete PMSPEC value as a universal contract"],
    [/zmodload\s+-e\s+zsh\/zle/, "must load zsh/zle before testing the required ZLE facility"],
  ];
  for (const [pattern, message] of stalePatterns) {
    if (pattern.test(content)) {
      errors.push(message);
    }
  }

  // Established ecosystem conventions may be documented, because published
  // plugins link to these anchors and their code comments must land on prose
  // that explains the code beneath them. They must never be promoted
  // unqualified: each one carries a note stating the recommended direction for
  // new plugins, and the eval-based manager callbacks carry a warning against
  // passing untrusted data. Publishing the convention without its qualifier is
  // the regression this guards, not the convention itself.
  errors.push(...requiresQualifier(content, "typeset -gA Plugins", "Direction of travel", "shared Plugins hash"));
  errors.push(...requiresQualifier(content, "→prompt_zinc_precmd", "Direction of travel", "function-name prefixes"));
  errors.push(
    ...requiresQualifier(content, "@zsh-plugin-run-on-unload ", "never pass untrusted", "eval-based unload callback"),
  );
  errors.push(
    ...requiresQualifier(content, 'eval "$(<plugin)"', "This is an eval-based interface", "eval-based loading"),
  );

  return errors;
}

// A documented-but-qualified convention must keep its qualifier nearby.
//
// Scoped to a window rather than the whole document: a qualifier sitting in a
// distant section would otherwise satisfy a new, unqualified mention added
// somewhere else, leaving a check that reads as protection but is not. Every
// occurrence must be covered, so the qualifier has to survive alongside each
// one. The window spans a generous section's worth of prose in either
// direction, because a warning admonition may precede or follow the code it
// qualifies.
const QUALIFIER_WINDOW = 4000;

function requiresQualifier(content, convention, qualifier, label) {
  const errors = [];
  for (let at = content.indexOf(convention); at >= 0; at = content.indexOf(convention, at + 1)) {
    const near = content.slice(Math.max(0, at - QUALIFIER_WINDOW), at + convention.length + QUALIFIER_WINDOW);
    if (!near.includes(qualifier)) {
      const line = content.slice(0, at).split("\n").length;
      errors.push(`${label} is documented without its "${qualifier}" qualifier near line ${line}`);
    }
  }
  return errors;
}

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function hasExactKeys(value, expected) {
  if (!isRecord(value)) {
    return false;
  }
  const actual = Object.keys(value).sort();
  const sortedExpected = [...expected].sort();
  return actual.length === sortedExpected.length && actual.every((key, index) => key === sortedExpected[index]);
}

export function validateWorkflow(content) {
  const errors = [];
  let workflow;
  try {
    workflow = parse(content);
  } catch (error) {
    return [`workflow must be valid YAML: ${error instanceof Error ? error.message : error}`];
  }
  if (!isRecord(workflow)) {
    return ["workflow root must be a mapping"];
  }
  if (!hasExactKeys(workflow, ["name", "on", "permissions", "concurrency", "jobs"])) {
    errors.push("workflow must contain only the required top-level keys");
  }

  if (workflow.name !== "Zsh Plugin Standard Review") {
    errors.push("workflow must use the expected plain-text name");
  }

  const triggers = workflow.on;
  if (!isRecord(triggers)) {
    errors.push("workflow must define an on mapping");
  } else {
    if (
      Object.keys(triggers).length !== 2 ||
      !Object.hasOwn(triggers, "schedule") ||
      !Object.hasOwn(triggers, "workflow_dispatch")
    ) {
      errors.push("workflow triggers must be exactly schedule and workflow_dispatch");
    }
    if (
      !Object.hasOwn(triggers, "workflow_dispatch") ||
      (triggers.workflow_dispatch !== null &&
        (!isRecord(triggers.workflow_dispatch) || Object.keys(triggers.workflow_dispatch).length !== 0))
    ) {
      errors.push("workflow must support workflow_dispatch");
    }
    const schedules = triggers.schedule;
    if (
      !Array.isArray(schedules) ||
      schedules.length !== 1 ||
      !isRecord(schedules[0]) ||
      !hasExactKeys(schedules[0], ["cron"]) ||
      schedules[0].cron !== "23 7 17 1,7 *"
    ) {
      errors.push("workflow must run exactly at 07:23 UTC on January 17 and July 17");
    }
  }

  const {permissions} = workflow;
  if (
    !isRecord(permissions) ||
    permissions.contents !== "read" ||
    permissions.issues !== "write" ||
    Object.keys(permissions).length !== 2
  ) {
    errors.push("workflow permissions must be exactly contents: read and issues: write");
  }

  const {concurrency} = workflow;
  if (
    !isRecord(concurrency) ||
    concurrency.group !== GITHUB_WORKFLOW_EXPRESSION ||
    concurrency["cancel-in-progress"] !== false ||
    Object.keys(concurrency).length !== 2
  ) {
    errors.push("workflow must serialize reviews without cancelling an in-progress run");
  }

  if (!isRecord(workflow.jobs) || Object.keys(workflow.jobs).length !== 1) {
    errors.push("workflow must define only the review job");
  }
  const reviewJob = isRecord(workflow.jobs) ? workflow.jobs.review : undefined;
  if (!isRecord(reviewJob)) {
    errors.push("workflow must define the review job");
    return errors;
  }
  if (!hasExactKeys(reviewJob, ["name", "runs-on", "timeout-minutes", "steps"])) {
    errors.push("review job must contain only its required configuration");
  }
  if (reviewJob.name !== "Validate and open review" || reviewJob["runs-on"] !== "ubuntu-latest") {
    errors.push("review job must use the expected name and Ubuntu runner");
  }
  if (Object.hasOwn(reviewJob, "permissions")) {
    errors.push("review job must not override top-level permissions");
  }
  if (Object.hasOwn(reviewJob, "if")) {
    errors.push("review job must not be conditionally skipped");
  }
  if (!Number.isInteger(reviewJob["timeout-minutes"]) || reviewJob["timeout-minutes"] <= 0) {
    errors.push("workflow must bound job runtime");
  }

  const expectedSteps = [
    {
      name: "Check out repository",
      keys: ["name", "uses"],
      uses: /^actions\/checkout@[0-9a-f]{40}$/,
    },
    {
      name: "Set up pnpm",
      keys: ["name", "uses"],
      uses: /^pnpm\/action-setup@[0-9a-f]{40}$/,
    },
    {
      name: "Set up Node.js",
      keys: ["name", "uses", "with"],
      uses: /^actions\/setup-node@[0-9a-f]{40}$/,
    },
    {
      name: "Install dependencies",
      keys: ["name", "run"],
      run: "pnpm install --frozen-lockfile",
    },
    {
      name: "Install Zsh",
      keys: ["name", "run"],
      run: "sudo apt-get update && sudo apt-get install --yes --no-install-recommends zsh",
    },
    {
      name: "Validate deterministic contract",
      keys: ["name", "run"],
      run: "pnpm validate:plugin-standard",
    },
    {
      name: "Open ecosystem relevance review",
      keys: ["name", "env", "run"],
      run: "node scripts/open-plugin-standard-review.mjs",
    },
  ];
  const {steps} = reviewJob;
  if (!Array.isArray(steps) || steps.length !== expectedSteps.length) {
    errors.push("review job must define the complete required step sequence");
    return errors;
  }

  for (const [index, expected] of expectedSteps.entries()) {
    const step = steps[index];
    if (!isRecord(step) || step.name !== expected.name) {
      errors.push(`workflow step ${index + 1} must be ${expected.name}`);
      continue;
    }
    if (!hasExactKeys(step, expected.keys)) {
      errors.push(`workflow step ${expected.name} must contain only its required configuration`);
    }
    if (Object.hasOwn(step, "if") || Object.hasOwn(step, "continue-on-error")) {
      errors.push(`workflow step ${expected.name} must not be skipped or allowed to fail`);
    }
    if (expected.uses && (typeof step.uses !== "string" || !expected.uses.test(step.uses))) {
      errors.push(`workflow action must be pinned to the expected action at step ${index + 1}`);
    }
    if (expected.run && step.run !== expected.run) {
      errors.push(`workflow step ${expected.name} must run: ${expected.run}`);
    }
    if (typeof step.uses === "string" && !PINNED_ACTION.test(step.uses)) {
      errors.push(`workflow action must be pinned to a full commit SHA: ${step.uses}`);
    }
  }

  const [, , setupNodeStep, , , , issueStep] = steps;
  if (
    !isRecord(setupNodeStep) ||
    !hasExactKeys(setupNodeStep.with, ["node-version", "cache"]) ||
    setupNodeStep.with["node-version"] !== "22" ||
    setupNodeStep.with.cache !== "pnpm"
  ) {
    errors.push("Node setup must use Node 22 with the pnpm cache");
  }

  if (
    !isRecord(issueStep) ||
    !hasExactKeys(issueStep.env, ["GH_TOKEN"]) ||
    issueStep.env.GH_TOKEN !== GITHUB_TOKEN_EXPRESSION
  ) {
    errors.push("review issue step must use the repository-scoped GitHub token");
  }

  return errors;
}

export function validateReviewBody(content) {
  return missingText(content, REQUIRED_REVIEW_BODY_TEXT, "review issue body");
}

export function validateRepository({standard, workflow}) {
  return [
    ...validateStandard(standard).map((message) => `${STANDARD_PATH}: ${message}`),
    ...validateWorkflow(workflow).map((message) => `${WORKFLOW_PATH}: ${message}`),
    ...validateReviewBody(buildReviewBody()).map((message) => `scripts/open-plugin-standard-review.mjs: ${message}`),
  ];
}

function main() {
  const errors = validateRepository({
    standard: readFileSync(STANDARD_PATH, "utf8"),
    workflow: readFileSync(WORKFLOW_PATH, "utf8"),
  });

  if (errors.length > 0) {
    for (const error of errors) {
      console.error(`${error}:1:1`);
    }
    process.exitCode = 1;
    return;
  }

  console.log("Zsh Plugin Standard and review workflow are consistent.");
}

if (
  process.argv[1] &&
  pathToFileURL(realpathSync(fileURLToPath(import.meta.url))).href === pathToFileURL(realpathSync(process.argv[1])).href
) {
  main();
}
