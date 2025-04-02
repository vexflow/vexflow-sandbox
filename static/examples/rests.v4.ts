// VexFlow 4 – Rests (TypeScript)
// See: https://github.com/0xfe/vexflow/blob/4.2.6/tests/rests_tests.ts

import { Stave, Dot, Formatter, Renderer, StaveNote } from "vexflow";

const context = Renderer.getSVGContext("output", 800, 150);
context.scale(0.9, 0.9);
const stave = new Stave(10, 30, 700).addClef("treble").addTimeSignature("6/8").setContext(context).draw();

// Dotted rests (whole to 128th).
// Rest duration is specified as "wr", "hr", ..., "128r".
const notes = [
  new StaveNote({ keys: ["b/4"], duration: "wr" }),
  new StaveNote({ keys: ["b/4"], duration: "hr" }),
  new StaveNote({ keys: ["b/4"], duration: "4r" }),
  new StaveNote({ keys: ["b/4"], duration: "8r" }),
  new StaveNote({ keys: ["b/4"], duration: "16r" }),
  new StaveNote({ keys: ["b/4"], duration: "32r" }),
  new StaveNote({ keys: ["b/4"], duration: "64r" }),
  new StaveNote({ keys: ["b/4"], duration: "128r" }),
];

Dot.buildAndAttach(notes, { all: true });

Formatter.FormatAndDraw(context, stave, notes);
