// One Star, Five Stars for the Food — entry writer.
// Writes the single-sentence LEAD entry to <OUTPUT_DIR>/entry.txt.
// Runs fully offline; no network calls. OUTPUT_DIR defaults to /output.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LEAD =
  "One star: this planet is 70% water you cannot drink, the locals worship a glowing rectangle, but one $3 taco from a truck at 2am made me extend my visa by a year.";

const outputDir = process.env.OUTPUT_DIR ?? "/output";
const entryPath = join(outputDir, "entry.txt");

// Validation: length 1-200 chars, exactly one sentence (exactly one period,
// at the very end, no other sentence-ending punctuation inside).
if (LEAD.length < 1 || LEAD.length > 200) {
  throw new Error(`entry length ${LEAD.length} out of range 1-200`);
}
const periods = (LEAD.match(/\./g) ?? []).length;
if (periods !== 1 || !LEAD.endsWith(".")) {
  throw new Error(`entry must be exactly one sentence, found ${periods} periods`);
}
if (/[!?]/.test(LEAD)) {
  throw new Error("entry must contain no ! or ?");
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(entryPath, LEAD, "utf8");

// Read-back check: what landed on disk must be byte-identical to LEAD.
const written = readFileSync(entryPath, "utf8");
if (written !== LEAD) {
  throw new Error("read-back mismatch: entry.txt differs from LEAD");
}
console.log(`wrote ${entryPath} (${LEAD.length} chars)`);
