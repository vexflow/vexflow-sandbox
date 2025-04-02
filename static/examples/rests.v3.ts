// VexFlow 3.0.9 – Rests (JavaScript)
// See: https://github.com/0xfe/vexflow/blob/3.0.9/tests/rests_tests.js

var Renderer = Vex.Flow.Renderer;
var Stave = Vex.Flow.Stave;
var Formatter = Vex.Flow.Formatter;
var StaveNote = Vex.Flow.StaveNote;

var ctx = new Renderer.getSVGContext("output", 700, 150);
ctx.scale(0.9, 0.9);
ctx.fillStyle = "#221";
ctx.strokeStyle = "#221";
ctx.font = " 10pt Arial";

var stave = new Stave(10, 30, 700).addTrebleGlyph().addTimeSignature("4/4").setContext(ctx).draw();

var notes = [
  new StaveNote({ keys: ["b/4"], stem_direction: 1, duration: "wr" }).addDotToAll(),
  new StaveNote({ keys: ["b/4"], stem_direction: 1, duration: "hr" }).addDotToAll(),
  new StaveNote({ keys: ["b/4"], stem_direction: 1, duration: "4r" }).addDotToAll(),
  new StaveNote({ keys: ["b/4"], stem_direction: 1, duration: "8r" }).addDotToAll(),
  new StaveNote({ keys: ["b/4"], stem_direction: 1, duration: "16r" }).addDotToAll(),
  new StaveNote({ keys: ["b/4"], stem_direction: 1, duration: "32r" }).addDotToAll(),
  new StaveNote({ keys: ["b/4"], stem_direction: 1, duration: "64r" }).addDotToAll(),
];

Formatter.FormatAndDraw(ctx, stave, notes);
