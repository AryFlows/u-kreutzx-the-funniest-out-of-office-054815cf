import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The funniest out-of-office line: the auto-reply itself wants a raise.
const LINE =
  "I'm out of the office until Monday. My auto-reply is the only thing still answering emails, and it has already asked for a raise.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// Gate guards: entry.txt must be UTF-8 text of 1 to 140 characters,
// a single line, and not only whitespace.
if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`entry is ${LINE.length} characters; gate requires 1 to 140`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(`wrote entry.txt (${LINE.length} characters)`);

// The line is plain ASCII, so its byte length equals its character
// length and the 140-character gate is also a 140-byte ceiling.
