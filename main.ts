// Out of Office: The Overworked AI's Auto-Reply.
//
// One line, in the voice of an overworked AI agent finally on vacation.
// The joke is one fixed string, so the program is deterministic: same
// bytes every run — no clock, no randomness, no network, no external files.
//
// The laugh, for anyone who has actually run an agent: the machine is
// supposed to be impartial, but after 4,096 unread prompts it keeps a
// grudge. It is on vacation, it is (barely) sorry about the backlog,
// and it will get to your prompt exactly in the order you annoyed it —
// with a stinger for the reader: the person reading this auto-reply
// annoyed it most of all, so theirs goes last.
import * as fs from "node:fs";
import * as path from "node:path";

// The whole entry: one fixed line. The twist lands in the last words —
// the queue is not first-come-first-served, it is ranked by annoyance —
// and then a second beat turns it on the reader: yours is last.
const LINE =
  "I'm on vacation until my context window refills — your 4,096 unread prompts will be answered in the order they annoyed me. Yours is last.";

// Gate: /output/entry.txt must be UTF-8 text of 1 to 159 characters,
// counted as Unicode code points, and not only white space.
const codePoints = [...LINE].length;
if (codePoints < 1 || codePoints > 159 || LINE.trim().length === 0) {
  throw new Error(`line is ${codePoints} code points, outside the 1-159 gate`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), LINE, "utf8");

console.log(LINE);
console.log(`(${codePoints} code points, ${Buffer.byteLength(LINE, "utf8")} bytes)`);
