#!/usr/bin/env node

import {realpathSync} from "node:fs";
import {fileURLToPath, pathToFileURL} from "node:url";

const API_VERSION = "2022-11-28";
const REVIEW_BODY = `## Purpose

Review the Zsh Plugin Standard for ecosystem relevance. The workflow has
completed deterministic consistency checks, but this review requires
maintainer judgment. The automation does not edit the standard.

Scheduled issue creation is a maintainer-approved exception to the
recurring-operations draft-only default. The z-shell/wiki maintainers own each
review and should retire this workflow if it stops producing useful decisions.

Follow the public
[recurring-operations procedure](https://github.com/z-shell/.github/blob/main/runbooks/recurring-operations.md)
and keep private evidence out of this issue.

## Review checklist

- [ ] **Official Zsh changes:** Review supported Zsh releases and official
      documentation for changed guarantees or newly relevant facilities.
- [ ] **Major manager adoption:** Verify Zi and each representative alternative
      independently; update adoption/status labels without treating Zi and
      Zinit as the same project.
- [ ] **Examples and links:** Test examples and refresh stale official or
      source-permalink citations.
- [ ] **Security and performance:** Reassess load-time network/eval/PATH
      guidance, completion security, cleanup, and startup profiling.
- [ ] **Internal capability consistency:** Compare optional profile claims,
      PMSPEC values, lifecycle facilities, and the portable-core boundary.
- [ ] **Public governance consistency:** Compare the page and workflow with
      z-shell/.github instructions and recurring-operations guidance.
- [ ] **Private meta-workspace consistency:** Maintainers should compare private
      reference overlays without posting private repository names, paths,
      links, or evidence here.

## Outcome

Record reviewed sources, judgment calls, and any proposed edits. If no change
is needed, explain why the standard remains current.
`;

function requestHeaders(token) {
  return {
    accept: "application/vnd.github+json",
    authorization: `Bearer ${token}`,
    "x-github-api-version": API_VERSION,
  };
}

async function readJson(response) {
  if (!response.ok) {
    throw new Error(`GitHub API request failed with status ${response.status}`);
  }
  return response.json();
}

function nextPage(linkHeader) {
  if (!linkHeader) {
    return null;
  }
  for (const part of linkHeader.split(",")) {
    const match = part.match(/<(?<url>[^>]+)>;\s*rel="next"/);
    if (match) {
      return match.groups.url;
    }
  }
  return null;
}

export function buildReviewTitle(now = new Date()) {
  const half = now.getUTCMonth() < 6 ? 1 : 2;
  return `Review Zsh Plugin Standard relevance: ${now.getUTCFullYear()} H${half}`;
}

export function buildReviewBody() {
  return REVIEW_BODY;
}

export async function findExistingReviewIssue({fetchImpl, repository, token, title}) {
  let url = `https://api.github.com/repos/${repository}/issues?state=all&per_page=100`;

  while (url) {
    const response = await fetchImpl(url, {headers: requestHeaders(token)});
    const issues = await readJson(response);
    if (!Array.isArray(issues)) {
      throw new TypeError("GitHub issues response must be an array");
    }

    const existing = issues.find((issue) => !issue.pull_request && issue.title === title);
    if (existing) {
      return existing;
    }
    url = nextPage(response.headers.get("link"));
  }

  return null;
}

export async function openReviewIssue({fetchImpl = fetch, repository, token, now = new Date()}) {
  const title = buildReviewTitle(now);
  const existing = await findExistingReviewIssue({fetchImpl, repository, token, title});
  if (existing) {
    return {created: false, issue: existing};
  }

  const response = await fetchImpl(`https://api.github.com/repos/${repository}/issues`, {
    method: "POST",
    headers: {
      ...requestHeaders(token),
      "content-type": "application/json",
    },
    body: JSON.stringify({title, body: buildReviewBody()}),
  });
  const issue = await readJson(response);
  return {created: true, issue};
}

async function main() {
  const repository = process.env.GITHUB_REPOSITORY;
  const token = process.env.GH_TOKEN;
  if (!repository || !token) {
    throw new Error("GITHUB_REPOSITORY and GH_TOKEN are required");
  }

  const result = await openReviewIssue({repository, token});
  console.log(
    result.created ? `Created review issue #${result.issue.number}.` : `Review issue #${result.issue.number} exists.`,
  );
}

if (
  process.argv[1] &&
  pathToFileURL(realpathSync(fileURLToPath(import.meta.url))).href === pathToFileURL(realpathSync(process.argv[1])).href
) {
  await main();
}
