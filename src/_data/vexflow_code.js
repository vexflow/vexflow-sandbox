const helloWorldV5 = `
  console.log('Hello, World V55!');
`;

const helloWorldV4 = `
  console.log('Hello, World V44!');
`;

const helloWorldV3 = `
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

function escapeDoubleQuotes(str) {
  return str.replace(/"/g, '\\"');
}

function clean(str) {
  return escapeNewLines(str.trim());
}

export default {
  hello_world: {
    v5: clean(helloWorldV5),
    v4: clean(helloWorldV4),
    v3: clean(helloWorldV3),
  },
};
