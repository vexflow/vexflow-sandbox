// VexFlow 3.0.9 – Canvas (JavaScript)

const { Renderer, Stave, StaveNote, Formatter } = Vex.Flow;

const canvas = document.getElementById("output");
canvas.width = 1100;
canvas.height = 400;
const renderer = new Renderer(canvas, Renderer.Backends.CANVAS);
const context = renderer.getContext();

const stave = new Stave(10, 40, 400);
stave.addClef("treble");
stave.addTimeSignature("4/4");
stave.setContext(context).draw();

const notes = [
  new StaveNote({ keys: ["c/5"], duration: "4" }),
  new StaveNote({ keys: ["b/4"], duration: "4" }),
  new StaveNote({ keys: ["a/4"], duration: "4" }),
  new StaveNote({ keys: ["g/4"], duration: "4" }),
];

Formatter.FormatAndDraw(context, stave, notes);
