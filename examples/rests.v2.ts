// VexFlow 1.2.93 – Rests (JavaScript)
// See: https://github.com/0xfe/vexflow/blob/1.2.93/tests/rests_tests.js

var VF = Vex.Flow;

var ctx = new VF.Renderer.getSVGContext("output", 700, 150);
ctx.scale(0.9, 0.9);
ctx.fillStyle = "#221";
ctx.strokeStyle = "#221";
ctx.font = " 10pt Arial";

var stave = new VF.Stave(10, 30, 700).addTrebleGlyph().addTimeSignature("4/4").setContext(ctx).draw();

var notes = [
  new VF.StaveNote({ keys: ["b/4"], stem_direction: 1, duration: "wr" }).addDotToAll(),
  new VF.StaveNote({ keys: ["b/4"], stem_direction: 1, duration: "hr" }).addDotToAll(),
  new VF.StaveNote({ keys: ["b/4"], stem_direction: 1, duration: "4r" }).addDotToAll(),
  new VF.StaveNote({ keys: ["b/4"], stem_direction: 1, duration: "8r" }).addDotToAll(),
  new VF.StaveNote({ keys: ["b/4"], stem_direction: 1, duration: "16r" }).addDotToAll(),
  new VF.StaveNote({ keys: ["b/4"], stem_direction: 1, duration: "32r" }).addDotToAll(),
  new VF.StaveNote({ keys: ["b/4"], stem_direction: 1, duration: "64r" }).addDotToAll(),
];

VF.Formatter.FormatAndDraw(ctx, stave, notes);
