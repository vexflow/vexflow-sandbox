// VexFlow 5 – Hello World (JavaScript)

const { Factory } = VexFlow;

// Create a VexFlow renderer attached to the DIV element with id="output".
const vf = new Factory({ renderer: { elementId: "output" } });
const score = vf.EasyScore();
const system = vf.System();

// Create a 4/4 treble stave and add two parallel voices.
system
  .addStave({
    voices: [
      // Top voice has 4 quarter notes with stems up.
      score.voice(score.notes("C#5/q, B4, A4, G#4", { stem: "up" })),

      // Bottom voice has two half notes, with stems down.
      score.voice(score.notes("C#4/h, C#4", { stem: "down" })),
    ],
  })
  .addClef("treble")
  .addTimeSignature("4/4");

// Draw it!
vf.draw();
