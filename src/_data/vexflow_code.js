// This file contains example VexFlow code that works with the last three major versions of VexFlow.

const helloWorldV5 = `
// VexFlow 5 Hello World

const { Factory } = VexFlow;

// Create a VexFlow renderer attached to the DIV element with id="output".
const vf = new Factory({ renderer: { elementId: 'output' } });
const score = vf.EasyScore();
const system = vf.System();

// Create a 4/4 treble stave and add two parallel voices.
system.addStave({
  voices: [
    // Top voice has 4 quarter notes with stems up.
    score.voice(score.notes('C#5/q, B4, A4, G#4', { stem: 'up' })),

    // Bottom voice has two half notes, with stems down.
    score.voice(score.notes('C#4/h, C#4', { stem: 'down' }))
  ]
}).addClef('treble').addTimeSignature('4/4');

// Draw it!
vf.draw();
`;

const helloWorldV4 = `
// VexFlow 4.2.6 Hello World

const { Factory } = Vex.Flow;

// Create a VexFlow renderer attached to the DIV element with id="output".
const vf = new Factory({ renderer: { elementId: 'output' } });
const score = vf.EasyScore();
const system = vf.System();

// Create a 4/4 treble stave and add two parallel voices.
system.addStave({
  voices: [
    // Top voice has 4 quarter notes with stems up.
    score.voice(score.notes('C#5/q, B4, A4, G#4', { stem: 'up' })),

    // Bottom voice has two half notes, with stems down.
    score.voice(score.notes('C#4/h, C#4', { stem: 'down' }))
  ]
}).addClef('treble').addTimeSignature('4/4');

// Draw it!
vf.draw();
`;

const helloWorldV3 = `
// VexFlow 3.0.9 Hello World

const { Factory } = Vex.Flow;

// Create a VexFlow renderer attached to the DIV element with id="output".
const vf = new Factory({ renderer: { elementId: 'output' } });
const score = vf.EasyScore();
const system = vf.System();

// Create a 4/4 treble stave and add two parallel voices.
system.addStave({
  voices: [
    // Top voice has 4 quarter notes with stems up.
    score.voice(score.notes('C#5/q, B4, A4, G#4', { stem: 'up' })),

    // Bottom voice has two half notes, with stems down.
    score.voice(score.notes('C#4/h, C#4', { stem: 'down' }))
  ]
}).addClef('treble').addTimeSignature('4/4');

// Draw it!
vf.draw();
`;

function escapeNewLines(str) {
  return str.replace(/\n/g, "\\n");
}

function clean(str) {
  return "`" + escapeNewLines(str.trim()) + "`";
}

export default `
<script>
    const code = {
        hello_world: {
            v5: ${clean(helloWorldV5)},
            v4: ${clean(helloWorldV4)},
            v3: ${clean(helloWorldV3)},
        },
    };
</script>`;
