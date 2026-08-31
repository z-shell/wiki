import assert from "node:assert/strict";
import {spawnSync} from "node:child_process";
import test from "node:test";

const CHILDREN = {
  "root-cjs": `
const {imageSize} = require("image-size");
const format = process.argv[1];
const payload = Uint8Array.from(Buffer.from(process.argv[2], "base64"));
try {
  imageSize(payload);
  console.log(\`parsed:\${format}:root-cjs\`);
} catch {
  console.log(\`rejected:\${format}:root-cjs\`);
}
`,
  "root-esm": `
const {imageSize} = await import("image-size");
const format = process.argv[1];
const payload = Uint8Array.from(Buffer.from(process.argv[2], "base64"));
try {
  imageSize(payload);
  console.log(\`parsed:\${format}:root-esm\`);
} catch {
  console.log(\`rejected:\${format}:root-esm\`);
}
`,
  "type-cjs": `
const format = process.argv[1];
const payload = Uint8Array.from(Buffer.from(process.argv[2], "base64"));
const parser = require(\`image-size/types/\${format.toLowerCase()}\`)[format];
try {
  parser.calculate(payload);
  console.log(\`parsed:\${format}:type-cjs\`);
} catch {
  console.log(\`rejected:\${format}:type-cjs\`);
}
`,
  "type-esm": `
const format = process.argv[1];
const payload = Uint8Array.from(Buffer.from(process.argv[2], "base64"));
const parser = (await import(\`image-size/types/\${format.toLowerCase()}\`))[format];
try {
  parser.calculate(payload);
  console.log(\`parsed:\${format}:type-esm\`);
} catch {
  console.log(\`rejected:\${format}:type-esm\`);
}
`,
};

const payloads = {
  ICNS: [
    0x69,
    0x63,
    0x6e,
    0x73, // icns
    0x00,
    0x00,
    0x00,
    0x10, // file length = 16
    0x69,
    0x73,
    0x33,
    0x32, // is32 entry
    0x00,
    0x00,
    0x00,
    0x00, // entry length = 0
  ],
  HEIF: [
    0x00, 0x00, 0x00, 0x10, 0x66, 0x74, 0x79, 0x70, 0x61, 0x76, 0x69, 0x66, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x24, 0x6d, 0x65, 0x74, 0x61, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x08, 0x69, 0x70, 0x72, 0x70, 0x00, 0x00,
    0x00, 0x14, 0x69, 0x70, 0x63, 0x6f, 0x00, 0x00, 0x00, 0x00, 0x69, 0x73, 0x70, 0x65, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  ],
  JXL: [
    0x00, 0x00, 0x00, 0x0c, 0x4a, 0x58, 0x4c, 0x20, 0x0d, 0x0a, 0x87, 0x0a, 0x00, 0x00, 0x00, 0x10, 0x66, 0x74, 0x79,
    0x70, 0x6a, 0x78, 0x6c, 0x20, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x6a, 0x78, 0x6c, 0x70, 0x00, 0x00,
    0x00, 0x00,
  ],
};

for (const [format, bytes] of Object.entries(payloads)) {
  for (const [entryPoint, source] of Object.entries(CHILDREN)) {
    test(`${format} zero-length entries cannot block the ${entryPoint} parser`, () => {
      const encoded = Buffer.from(bytes).toString("base64");
      const moduleFlag = entryPoint.endsWith("esm") ? ["--input-type=module"] : [];
      const result = spawnSync(process.execPath, [...moduleFlag, "-e", source, format, encoded], {
        encoding: "utf8",
        timeout: 1_000,
      });

      assert.ifError(result.error);
      assert.equal(result.signal, null, `${format} ${entryPoint} parser exited on ${result.signal}`);
      assert.equal(result.status, 0, result.stderr);
      assert.match(result.stdout, new RegExp(`^(?:parsed|rejected):${format}:${entryPoint}\\n$`));
    });
  }
}

test("the lockfile resolves only the patched image-size 2.0.2 snapshot", async () => {
  const {readFile} = await import("node:fs/promises");
  const {parseAllDocuments} = await import("yaml");
  const documents = parseAllDocuments(await readFile(new URL("../pnpm-lock.yaml", import.meta.url), "utf8"));
  const lockfile = documents.at(-1)?.toJS();
  const expectedPatchHash = lockfile?.patchedDependencies?.["image-size@2.0.2"];
  const packageKeys = Object.keys(lockfile?.packages ?? {}).filter((key) => key.startsWith("image-size@"));
  const snapshotKeys = Object.keys(lockfile?.snapshots ?? {}).filter((key) => key.startsWith("image-size@"));

  assert.match(expectedPatchHash, /^[a-f0-9]{64}$/);
  assert.deepEqual(packageKeys, ["image-size@2.0.2"]);
  assert.deepEqual(snapshotKeys, [`image-size@2.0.2(patch_hash=${expectedPatchHash})`]);
});

test("the patch remains limited to caller-local progress guards", async () => {
  const {readFile} = await import("node:fs/promises");
  const patch = await readFile(new URL("../patches/image-size@2.0.2.patch", import.meta.url), "utf8");
  const sections = patch
    .split(/^diff --git /m)
    .slice(1)
    .map((section) => {
      const [header, ...lines] = section.split("\n");
      const match = header.match(/^a\/(?<source>\S+) b\/(?<target>\S+)$/);
      const file = match?.groups?.source;
      assert.ok(file, `invalid patch header: ${header}`);
      assert.equal(file, match.groups.target, `patch paths differ: ${header}`);
      return {
        file,
        additions: lines.filter((line) => line.startsWith("+") && !line.startsWith("+++")).map((line) => line.slice(1)),
        deletions: lines.filter((line) => line.startsWith("-") && !line.startsWith("---")).map((line) => line.slice(1)),
      };
    });
  const combinedFiles = [
    "dist/detector.cjs",
    "dist/detector.mjs",
    "dist/fromFile.cjs",
    "dist/fromFile.mjs",
    "dist/index.cjs",
    "dist/index.mjs",
    "dist/lookup.cjs",
    "dist/lookup.mjs",
    "dist/types/index.cjs",
    "dist/types/index.mjs",
  ];
  const expectedFiles = [
    ...combinedFiles,
    "dist/types/heif.cjs",
    "dist/types/heif.mjs",
    "dist/types/icns.cjs",
    "dist/types/icns.mjs",
    "dist/types/jxl.cjs",
    "dist/types/jxl.mjs",
  ].sort();
  const icnsGuard = "      if (imageHeader[1] <= 0) return;";
  const heifBefore = "      currentOffset = ispeBox.offset + ispeBox.size;";
  const heifAfter = "      currentOffset = ispeBox.offset + (ispeBox.size > 0 ? ispeBox.size : 8);";
  const jxlBefore = "    offset = jxlpBox.offset + jxlpBox.size;";
  const jxlAfter = "    offset = jxlpBox.offset + (jxlpBox.size > 0 ? jxlpBox.size : 8);";

  assert.deepEqual(sections.map(({file}) => file).sort(), expectedFiles);
  for (const {file, additions, deletions} of sections) {
    const expectedAdditions = [];
    const expectedDeletions = [];
    if (combinedFiles.includes(file) || file.includes("/icns.")) expectedAdditions.push(icnsGuard);
    if (combinedFiles.includes(file) || file.includes("/heif.")) {
      expectedAdditions.push(heifAfter);
      expectedDeletions.push(heifBefore);
    }
    if (combinedFiles.includes(file) || file.includes("/jxl.")) {
      expectedAdditions.push(jxlAfter);
      expectedDeletions.push(jxlBefore);
    }
    assert.deepEqual(additions.toSorted(), expectedAdditions.toSorted(), `unexpected additions in ${file}`);
    assert.deepEqual(deletions.toSorted(), expectedDeletions.toSorted(), `unexpected deletions in ${file}`);
  }
});
