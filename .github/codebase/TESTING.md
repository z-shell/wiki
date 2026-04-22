# Testing Patterns

## Core Sections (Required)

### 1) Test Stack and Commands

- Primary test framework: `[TODO]` no local test framework is declared in `package.json`
- Assertion/mocking tools: `[TODO]` none found in tracked source or manifest
- Commands:

```bash
# [TODO] No `test` script declared in package.json
# [TODO] No unit test command found
# [TODO] No integration/e2e test command declared in package.json
# [TODO] No coverage command found
```

Operational quality gates that do exist:

- `pnpm lint`
- `pnpm build`
- GitHub Actions workflows for link checking and build-size/build-time checks

### 2) Test Layout

- Test file placement pattern: no local `*.test.*` or `*.spec.*` files were found in the repo
- Naming convention: `[TODO]` no test files exist to infer a naming convention
- Setup files and where they run: `[TODO]` no test setup files were found

### 3) Test Scope Matrix

| Scope       | Covered? | Typical target | Notes                                                                  |
| ----------- | -------- | -------------- | ---------------------------------------------------------------------- |
| Unit        | No       | N/A            | No local unit-test framework or test files found                       |
| Integration | No       | N/A            | No local integration-test suite found                                  |
| E2E         | No       | N/A            | No local or CI-declared E2E suite remains after Argos workflow removal |

### 4) Mocking and Isolation Strategy

- Main mocking approach: `[TODO]` no test suite was found
- Isolation guarantees: `[TODO]` no test setup/reset strategy was found
- Common failure mode in tests: CI verification is currently skewed toward lint/build/link/perf/visual workflows rather than local unit/integration tests

### 5) Coverage and Quality Signals

- Coverage tool + threshold: `[TODO]` none found
- Current reported coverage: `[TODO]` none found
- Known gaps/flaky areas:
  - no local automated test suite is declared
  - docs correctness is enforced more through build/link workflows than through assertions

### 6) Evidence

- `package.json`
- `.github/workflows/link-checker.yml`
- `.github/workflows/ci-perf.yml`
- `.github/codebase/.codebase-scan.txt`
