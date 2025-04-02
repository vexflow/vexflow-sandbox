let local_cjs_url = undefined;
// local_cjs_url = "../build/cjs/vexflow-debug.js"; // Uncomment this line to use the local development build.

const v5_jsdelivr_cjs_url = "https://cdn.jsdelivr.net/npm/vexflow@5.0.0/build/cjs/vexflow-debug.js";
const v4_jsdelivr_cjs_url = "https://cdn.jsdelivr.net/npm/vexflow4@4.2.6/build/cjs/vexflow-debug.js";
const v3_jsdelivr_cjs_url = "https://cdn.jsdelivr.net/npm/vexflow@3.0.9/releases/vexflow-debug.js";
const v2_jsdelivr_cjs_url = "https://cdn.jsdelivr.net/npm/vexflow@1.2.93/releases/vexflow-debug.js";

const runButton = document.getElementById("runButton");
const code = document.getElementById("code");
const output = document.getElementById("output");

const fileSelect = document.getElementById("fileSelect");
const fileQueryParamName = "file";
const files = [
  { value: "hello", label: "Hello World" },
  { value: "bass", label: "Bass Clef" },
  { value: "rests", label: "Rests" },
  { value: "minuet", label: "Minuet in G" },
];

const versionSelect = document.getElementById("versionSelect");
const versionQueryParamName = "ver";
const versions = [
  { value: "4", label: "4.2.6" },
  { value: "3", label: "3.0.9" },
  { value: "2", label: "1.2.93" },
];

let v5VexFlowObject;
let v4VexFlowObject;
let v3VexFlowObject;
let v2VexFlowObject;
let localVexFlowObject;

function populateFileSelect() {
  files.forEach((file) => fileSelect.add(new Option(file.label, file.value)));
}

function populateVersionSelect() {
  versions.forEach((version) => versionSelect.add(new Option(version.label, version.value)));
}

function updateDropdown(selectElement, urlParamValue, defaultValue) {
  let v = urlParamValue ?? defaultValue;
  if (selectElement.querySelector(`option[value="${v}"]`) == null) {
    v = defaultValue;
  }
  selectElement.value = v;
}

// Load & validate the file name and version number.
function loadQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  updateDropdown(fileSelect, urlParams.get(fileQueryParamName), files[0].value);
  updateDropdown(versionSelect, urlParams.get(versionQueryParamName), versions[0].value);
}

function saveQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set(versionQueryParamName, versionSelect.value);
  urlParams.set(fileQueryParamName, fileSelect.value);
  window.history.replaceState({}, "", `?${urlParams.toString()}`);
}

// Choose the correct VexFlow object based on the selected version.
function updateVexFlowVersion() {
  delete window.Vex;
  delete window.VexFlow;

  switch (versionSelect.value) {
    case "5":
    default:
      window.VexFlow = v5VexFlowObject;
      break;
    case "4":
      window.Vex = v4VexFlowObject;
      break;
    case "3":
      window.Vex = v3VexFlowObject;
      break;
    case "2":
    case "1":
      window.Vex = v2VexFlowObject;
      break;
    case "0": // Select the local development version.
      window.VexFlow = localVexFlowObject;
      break;
  }
}

// Load JS/TS files from examples/*.ts
// All files have a .ts extension, even if they are JavaScript files.
async function loadAndRunFile() {
  let fileVersion = versionSelect.value;
  if (fileVersion === "0") {
    fileVersion = "5"; // The local development library should use example code for v5.
  }

  const examplePath = "examples/" + fileSelect.value + ".v" + fileVersion + ".ts";
  const response = await fetch(examplePath);
  const codeText = await response.text();
  code.innerHTML = codeText;
  Prism.highlightElement(code);
  runButton.disabled = false;
  runCode();
}

async function runCode() {
  output.innerHTML = "";
  let c = code.innerText;
  c = changeTypeScriptImportToJavaScriptImport(c);
  const transpiledCode = ts.transpile(c, { compilerOptions: { target: ts.ScriptTarget.ES2015 } });
  eval(transpiledCode);
}

function changeSelectedItem(selectBox, direction) {
  let newIndex = selectBox.selectedIndex + direction;
  if (newIndex < 0) {
    newIndex = selectBox.options.length - 1;
  }
  if (newIndex >= selectBox.options.length) {
    newIndex = 0;
  }
  selectBox.selectedIndex = newIndex;
  selectBox.dispatchEvent(new Event("change"));
}

function onKeyDown(event) {
  // CTRL/CMD + Enter => Run Code
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    event.preventDefault();
    runCode();
  }

  // Make sure the <code> is not in focus.
  if (document.activeElement.id !== "code") {
    if (event.key.startsWith("Arrow")) {
      switch (event.key) {
        // Arrow keys LEFT/RIGHT change the currently selected VERSION.
        case "ArrowLeft":
          changeSelectedItem(versionSelect, -1);
          break;
        case "ArrowRight":
          changeSelectedItem(versionSelect, +1);
          break;
        // Arrow keys UP/DOWN change the currently selected FILE.
        case "ArrowUp":
          changeSelectedItem(fileSelect, -1);
          break;
        case "ArrowDown":
        default:
          changeSelectedItem(fileSelect, +1);
          break;
      }
    } else if (event.key >= "0" && event.key <= "5") {
      // Number keys 5, 4, 3, 2, 1, 0 select the correct VexFlow version.
      if (event.key === "1") {
        versionSelect.value = "2"; // SPECIAL CASE. Alias 1 => 2
      } else {
        versionSelect.value = event.key;
      }
      versionSelect.dispatchEvent(new Event("change"));
    }
  }
}

function addEventListeners() {
  document.addEventListener("keydown", onKeyDown);
  runButton.addEventListener("click", runCode);
  fileSelect.addEventListener("change", show);
  versionSelect.addEventListener("change", show);
}

// Convert TS import statement to JS destructuring assignment.
// Use a regex to convert from:
//     import { BarlineType, Factory, Registry, Renderer, StaveNote } from 'vexflow';
// to:
//     const { BarlineType, Factory, Registry, Renderer, StaveNote } = VexFlow;
// The import statement works when:
//   - building a TypeScript project with VexFlow (via npm install vexflow).
//   - loading VexFlow as ES modules.
// The const destructuring statement works in the browser with the VexFlow CJS bundle loaded via <script>.
function changeTypeScriptImportToJavaScriptImport(code) {
  const regex = /import\s*{(.*?)}\s*from\s*['"]vexflow['"];/g;
  const isV5OrNewer = versionSelect.value === "5" || versionSelect.value === "0";
  const VFLibraryName = isV5OrNewer ? "VexFlow" : "Vex.Flow";
  const replacement = `const {$1} = ${VFLibraryName};`;
  return code.replace(regex, replacement);
}

function show() {
  updateVexFlowVersion();
  loadAndRunFile();
  saveQueryParams();
}

//////////////////////////////////////////////////////////////////////////////////////////
// Load VexFlow libraries.
// We load multiple versions so we can quickly compare them.

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function addLocalLibraryIfItExists() {
  if (!local_cjs_url) {
    return;
  }
  await loadScript(local_cjs_url);
  localVexFlowObject = window.VexFlow;

  const gitShortHash = localVexFlowObject.BUILD.ID.substr(0, 7);

  // Set the value to "0" so we can use the 0 number key to select it.
  versions.unshift({ value: "0", label: `local (${gitShortHash})` });
}

async function loadVexFlowScriptsInOrder() {
  try {
    await loadScript(v5_jsdelivr_cjs_url);
    v5VexFlowObject = window.VexFlow;
    versions.unshift({ value: "5", label: v5VexFlowObject.BUILD.VERSION });

    await loadScript(v4_jsdelivr_cjs_url);
    v4VexFlowObject = window.Vex;

    await loadScript(v3_jsdelivr_cjs_url);
    v3VexFlowObject = window.Vex;

    await loadScript(v2_jsdelivr_cjs_url);
    v2VexFlowObject = window.Vex;

    await addLocalLibraryIfItExists();

    populateFileSelect();
    populateVersionSelect();

    // Once all the scripts are loaded, we can check this page's query params.
    loadQueryParams();

    show();
  } catch (error) {
    console.error("Script loading failed:", error);
  }
}

addEventListeners();
loadVexFlowScriptsInOrder();
