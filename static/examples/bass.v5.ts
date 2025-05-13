// VexFlow 5 – Bass Clef (JavaScript)

// Create a VexFlow Factory renderer attached to the DIV element with id="output".
const factory = new VexFlow.Factory({ renderer: { elementId: "output" } });
const score = factory.EasyScore();
const system = factory.System();

// Create a 4/4 bass stave and add two parallel voices.
system
  .addStave({
    voices: [
      // Top voice has 4 quarter notes with stems up.
      score.voice(score.notes("C4/q, B3, A3, G#3", { stem: "up", clef: "bass" })),

      // Bottom voice has two half notes, with stems down.
      score.voice(score.notes("C3/h, C#3", { stem: "down", clef: "bass" })),
    ],
  })
  .addClef("bass")
  .addTimeSignature("4/4");

// Draw it!
factory.draw();
