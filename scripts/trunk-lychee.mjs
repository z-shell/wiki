#!/usr/bin/env node

import {spawnSync} from "node:child_process";
import {realpathSync} from "node:fs";
import {isAbsolute, relative} from "node:path";
import {fileURLToPath, pathToFileURL} from "node:url";

function displayPath(path, cwd) {
  return (isAbsolute(path) ? relative(cwd, path) : path).replaceAll("\\", "/");
}

export function formatLycheeIssues(report, cwd = process.cwd()) {
  const issues = [];
  const errorMap = report?.error_map;
  if (!errorMap || typeof errorMap !== "object" || Array.isArray(errorMap)) {
    return issues;
  }

  for (const [path, errors] of Object.entries(errorMap).sort(([left], [right]) => left.localeCompare(right))) {
    if (!Array.isArray(errors)) {
      continue;
    }
    for (const error of errors) {
      const code = error?.status?.code ?? "error";
      const status = String(error?.status?.text ?? "Link check failed")
        .replace(/\s+/g, " ")
        .trim();
      const url = String(error?.url ?? "unknown URL");
      issues.push(`${displayPath(path, cwd)}:1:1: error: [${code}] ${url} | ${status}`);
    }
  }

  return issues;
}

function main() {
  const targets = process.argv.slice(2);
  if (targets.length === 0) {
    console.error("trunk-lychee: expected at least one target");
    process.exitCode = 2;
    return;
  }

  const result = spawnSync(
    "lychee",
    ["--config", ".trunk/configs/.lychee.toml", "--root-dir", ".", "--format", "json", ...targets],
    {
      cwd: process.cwd(),
      encoding: "utf8",
      env: process.env,
      maxBuffer: 16 * 1024 * 1024,
    },
  );

  if (result.error) {
    console.error(`trunk-lychee: ${result.error.message}`);
    process.exitCode = 2;
    return;
  }

  let report;
  try {
    report = JSON.parse(result.stdout);
  } catch (error) {
    console.error(result.stderr.trim());
    console.error(`trunk-lychee: invalid JSON output: ${error instanceof Error ? error.message : error}`);
    process.exitCode = 2;
    return;
  }

  const issues = formatLycheeIssues(report);
  if (issues.length > 0) {
    console.log(issues.join("\n"));
    process.exitCode = 1;
    return;
  }

  if (result.status !== 0) {
    console.error(result.stderr.trim() || `trunk-lychee: lychee exited with status ${result.status}`);
    process.exitCode = 2;
  }
}

if (
  process.argv[1] &&
  pathToFileURL(realpathSync(fileURLToPath(import.meta.url))).href === pathToFileURL(realpathSync(process.argv[1])).href
) {
  main();
}
