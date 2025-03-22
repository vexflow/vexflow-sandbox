---
title: Testing
layout: markdown_layout.njk
---

Test thoroughly before making new releases!

1. First, make sure you are in the correct repository:

```
❯ git remote -v
origin	git@github.com:vexflow/vexflow.git (fetch)
origin	git@github.com:vexflow/vexflow.git (push)
```

2. Run the test script: `grunt test`

<details>
  <summary><u>CLICK TO SEE <b><code>grunt test</code></b> OUTPUT</u></summary>

```
❯ grunt test
Running "clean:build" (clean) task
>> 0 paths cleaned.

Running "webpack:debug" (webpack) task
asset vexflow-debug-with-tests.js 2.78 MiB [emitted] (name: vexflow-debug-with-tests) 1 related asset
asset vexflow-debug.js 1.87 MiB [emitted] (name: vexflow-debug) 1 related asset
runtime modules 1.74 KiB 8 modules
modules by path ./src/ 1.69 MiB
  modules by path ./src/*.ts 962 KiB 90 modules
  modules by path ./src/fonts/*.ts 773 KiB
    ./src/fonts/academico.ts 29.6 KiB [built] [code generated]
    + 5 modules
modules by path ./tests/*.ts 709 KiB
  ./tests/vexflow_test_helpers.ts 13.2 KiB [built] [code generated]
  ./tests/index.ts 2.98 KiB [built] [code generated]
  ./tests/accidental_tests.ts 48.2 KiB [built] [code generated]
  ./tests/annotation_tests.ts 19.9 KiB [built] [code generated]
  + 67 modules
modules by path ./entry/*.ts 4.32 KiB
  ./entry/vexflow-debug.ts 1.93 KiB [built] [code generated]
  ./entry/vexflow-debug-with-tests.ts 2.39 KiB [built] [code generated]
webpack 5.94.0 compiled successfully in 1829 ms

Running "qunit:files" (qunit) task
Testing tests/flow-headless-browser.html ...................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................OK
>> 1827 tests completed in 3807ms, with 0 failed, 0 skipped, and 0 todo.

Done.
```

</details>

3. Run the full `grunt` build:
<details>
  <summary><u>CLICK TO <b><code>grunt</code></b> OUTPUT</u></summary>

```
❯ grunt
Running "clean:build" (clean) task
>> 1 path cleaned.

Running "eslint:target" (eslint) task

Running "webpack:prodAndDebug" (webpack) task
asset vexflow.js 1.08 MiB [emitted] [minimized] [big] (name: vexflow) 1 related asset
asset vexflow-bravura.js 711 KiB [emitted] [minimized] [big] (name: vexflow-bravura) 1 related asset
asset vexflow-core.js 329 KiB [emitted] [minimized] [big] (name: vexflow-core) 1 related asset
orphan modules 1.69 MiB [orphan] 96 modules
runtime modules 1.81 KiB 9 modules
cacheable modules 3.95 MiB
  ./entry/vexflow.ts + 96 modules 1.7 MiB [built] [code generated]
  ./entry/vexflow-core.ts + 90 modules 962 KiB [built] [code generated]
  ./entry/vexflow-bravura.ts + 93 modules 1.31 MiB [built] [code generated]

WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.
Assets:
  vexflow.js (1.08 MiB)
  vexflow-core.js (329 KiB)
  vexflow-bravura.js (711 KiB)

WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This can impact web performance.
Entrypoints:
  vexflow (1.08 MiB)
      vexflow.js
  vexflow-core (329 KiB)
      vexflow-core.js
  vexflow-bravura (711 KiB)
      vexflow-bravura.js


WARNING in webpack performance recommendations:
You can limit the size of your bundles by using import() or require.ensure to lazy load some parts of your application.
For more info visit https://webpack.js.org/guides/code-splitting/

webpack 5.94.0 compiled with 3 warnings in 3103 ms

asset vexflow-debug-with-tests.js 2.78 MiB [emitted] (name: vexflow-debug-with-tests) 1 related asset
asset vexflow-debug.js 1.87 MiB [emitted] (name: vexflow-debug) 1 related asset
runtime modules 1.74 KiB 8 modules
modules by path ./src/ 1.69 MiB
  modules by path ./src/*.ts 962 KiB 90 modules
  modules by path ./src/fonts/*.ts 773 KiB
    ./src/fonts/academico.ts 29.6 KiB [built] [code generated]
    + 5 modules
modules by path ./tests/*.ts 709 KiB
  ./tests/vexflow_test_helpers.ts 13.2 KiB [built] [code generated]
  ./tests/index.ts 2.98 KiB [built] [code generated]
  ./tests/accidental_tests.ts 48.2 KiB [built] [code generated]
  ./tests/annotation_tests.ts 19.9 KiB [built] [code generated]
  + 67 modules
modules by path ./entry/*.ts 4.32 KiB
  ./entry/vexflow-debug.ts 1.93 KiB [built] [code generated]
  ./entry/vexflow-debug-with-tests.ts 2.39 KiB [built] [code generated]
webpack 5.94.0 compiled successfully in 2755 ms

Running "build:esm" task
ESM: Building to ./build/esm/
TypeScript: Compiling 175 files...
Writing ESM version data to vexflow/build/esm/src/version.js

Running "build:types" task
Types: Building *.d.ts files in build/types/
TypeScript: Compiling 100 files...

Done.
```

</details>

4. The `build/` directory contains three subdirectories:

```
cjs/
esm/
types/
```

<details>
  <summary><u>CLICK TO SEE LIST OF FILES in <b>build/</b></u></summary>

```
❯ ls -R build | sed -e 's/^/    /' -e 's/^    \.//' -e 's/^    build/build/'

build/cjs:
    vexflow-bravura.js
    vexflow-bravura.js.map
    vexflow-core.js
    vexflow-core.js.map
    vexflow-debug-with-tests.js
    vexflow-debug-with-tests.js.map
    vexflow-debug.js
    vexflow-debug.js.map
    vexflow.js
    vexflow.js.map

build/esm:
    entry
    package.json
    src
    tests

build/esm/entry:
    vexflow-bravura.js
    vexflow-core.js
    vexflow-debug-with-tests.js
    vexflow-debug.js
    vexflow.js

build/esm/src:
    accidental.js
    annotation.js
    articulation.js
    barnote.js
    beam.js
    bend.js
    boundingbox.js
    canvascontext.js
    chordsymbol.js
    clef.js
    clefnote.js
    crescendo.js
    curve.js
    dot.js
    easyscore.js
    element.js
    factory.js
    flag.js
    font.js
    fonts
    formatter.js
    fraction.js
    frethandfinger.js
    ghostnote.js
    glyphnote.js
    glyphs.js
    gracenote.js
    gracenotegroup.js
    gracetabnote.js
    index.js
    keymanager.js
    keysignature.js
    keysignote.js
    metrics.js
    modifier.js
    modifiercontext.js
    multimeasurerest.js
    music.js
    note.js
    notehead.js
    notesubgroup.js
    ornament.js
    parenthesis.js
    parser.js
    pedalmarking.js
    registry.js
    rendercontext.js
    renderer.js
    repeatnote.js
    stave.js
    stavebarline.js
    staveconnector.js
    stavehairpin.js
    staveline.js
    stavemodifier.js
    stavenote.js
    staverepetition.js
    stavesection.js
    stavetempo.js
    stavetext.js
    stavetie.js
    stavevolta.js
    stem.js
    stemmablenote.js
    stringnumber.js
    strokes.js
    svgcontext.js
    system.js
    tables.js
    tabnote.js
    tabslide.js
    tabstave.js
    tabtie.js
    textbracket.js
    textdynamics.js
    textnote.js
    tickable.js
    tickcontext.js
    timesignature.js
    timesignote.js
    tremolo.js
    tuning.js
    tuplet.js
    typeguard.js
    util.js
    version.js
    vexflow.js
    vibrato.js
    vibratobracket.js
    voice.js
    web.js

build/esm/src/fonts:
    academico.js
    academicobold.js
    bravura.js
    gonville.js
    petaluma.js
    petalumascript.js

build/esm/tests:
    accidental_tests.js
    annotation_tests.js
    articulation_tests.js
    auto_beam_formatting_tests.js
    barline_tests.js
    beam_tests.js
    bend_tests.js
    boundingbox_tests.js
    chordsymbol_tests.js
    clef_tests.js
    crossbeam_tests.js
    curve_tests.js
    demo_petzold_tests.js
    dot_tests.js
    easyscore_tests.js
    factory_tests.js
    font_tests.js
    formatter
    formatter_tests.js
    fraction_tests.js
    ghostnote_tests.js
    glyphnote_tests.js
    gracenote_tests.js
    gracetabnote_tests.js
    index.js
    key_clef_tests.js
    keymanager_tests.js
    keysignature_tests.js
    mocks.js
    modifier_tests.js
    multimeasurerest_tests.js
    music_tests.js
    notehead_tests.js
    notesubgroup_tests.js
    offscreencanvas_tests.js
    ornament_tests.js
    parser_tests.js
    pedalmarking_tests.js
    percussion_tests.js
    qunit
    registry_tests.js
    renderer_tests.js
    rests_tests.js
    rhythm_tests.js
    stave_tests.js
    staveconnector_tests.js
    stavehairpin_tests.js
    staveline_tests.js
    stavemodifier_tests.js
    stavenote_tests.js
    stavetie_tests.js
    stringnumber_tests.js
    strokes_tests.js
    style_tests.js
    tabnote_tests.js
    tabslide_tests.js
    tabstave_tests.js
    tabtie_tests.js
    textbracket_tests.js
    textnote_tests.js
    threevoice_tests.js
    tickcontext_tests.js
    timesignature_tests.js
    tremolo_tests.js
    tuning_tests.js
    tuplet_tests.js
    typeguard_tests.js
    unison_tests.js
    vexflow_test_helpers.js
    vf_prefix_tests.js
    vibrato_tests.js
    vibratobracket_tests.js
    voice_tests.js

build/esm/tests/formatter:
    framestack.js
    tests.js

build/esm/tests/qunit:
    qunit.js

build/types:
    entry
    src

build/types/entry:
    vexflow-bravura.d.ts
    vexflow-core.d.ts
    vexflow-debug.d.ts
    vexflow.d.ts

build/types/src:
    accidental.d.ts
    annotation.d.ts
    articulation.d.ts
    barnote.d.ts
    beam.d.ts
    bend.d.ts
    boundingbox.d.ts
    canvascontext.d.ts
    chordsymbol.d.ts
    clef.d.ts
    clefnote.d.ts
    crescendo.d.ts
    curve.d.ts
    dot.d.ts
    easyscore.d.ts
    element.d.ts
    factory.d.ts
    flag.d.ts
    font.d.ts
    fonts
    formatter.d.ts
    fraction.d.ts
    frethandfinger.d.ts
    ghostnote.d.ts
    glyphnote.d.ts
    glyphs.d.ts
    gracenote.d.ts
    gracenotegroup.d.ts
    gracetabnote.d.ts
    index.d.ts
    keymanager.d.ts
    keysignature.d.ts
    keysignote.d.ts
    metrics.d.ts
    modifier.d.ts
    modifiercontext.d.ts
    multimeasurerest.d.ts
    music.d.ts
    note.d.ts
    notehead.d.ts
    notesubgroup.d.ts
    ornament.d.ts
    parenthesis.d.ts
    parser.d.ts
    pedalmarking.d.ts
    registry.d.ts
    rendercontext.d.ts
    renderer.d.ts
    repeatnote.d.ts
    stave.d.ts
    stavebarline.d.ts
    staveconnector.d.ts
    stavehairpin.d.ts
    staveline.d.ts
    stavemodifier.d.ts
    stavenote.d.ts
    staverepetition.d.ts
    stavesection.d.ts
    stavetempo.d.ts
    stavetext.d.ts
    stavetie.d.ts
    stavevolta.d.ts
    stem.d.ts
    stemmablenote.d.ts
    stringnumber.d.ts
    strokes.d.ts
    svgcontext.d.ts
    system.d.ts
    tables.d.ts
    tabnote.d.ts
    tabslide.d.ts
    tabstave.d.ts
    tabtie.d.ts
    textbracket.d.ts
    textdynamics.d.ts
    textnote.d.ts
    tickable.d.ts
    tickcontext.d.ts
    timesignature.d.ts
    timesignote.d.ts
    tremolo.d.ts
    tuning.d.ts
    tuplet.d.ts
    typeguard.d.ts
    util.d.ts
    version.d.ts
    vexflow.d.ts
    vibrato.d.ts
    vibratobracket.d.ts
    voice.d.ts
    web.d.ts

build/types/src/fonts:
    academico.d.ts
    academicobold.d.ts
    bravura.d.ts
    gonville.d.ts
    petaluma.d.ts
    petalumascript.d.ts
```

</details>

5. Open `vexflow/tests/flow.html` and make sure the visual tests pass.

<img width="800" alt="visual_test" src="https://github.com/user-attachments/assets/99c518d9-abbc-40a7-ac0a-51eb43cc3e47" />

6. Open the files in `vexflow/demos/` and make sure each shows the correct output.
