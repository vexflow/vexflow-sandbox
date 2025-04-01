const v5_jsdelivr_cjs_url = "https://cdn.jsdelivr.net/npm/vexflow@5.0.0/build/cjs/vexflow-debug.js";
const v4_jsdelivr_cjs_url = "https://cdn.jsdelivr.net/npm/vexflow4@4.2.6/build/cjs/vexflow-debug.js";
const v3_jsdelivr_cjs_url = "https://cdn.jsdelivr.net/npm/vexflow@3.0.9/releases/vexflow-debug.js";
const v2_jsdelivr_cjs_url = "https://cdn.jsdelivr.net/npm/vexflow@1.2.93/releases/vexflow-debug.js";

let v5VexFlowObject;
let v4VexFlowObject;
let v3VexFlowObject;
let v2VexFlowObject;

let fileSelect = document.getElementById("fileSelect");
let versionSelect = document.getElementById("versionSelect");
let runButton = document.getElementById("runButton");
let code = document.getElementById("code");
let output = document.getElementById("output");

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Load & validate the file name and version number.
function loadQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);

  let demo = urlParams.get("demo") ?? "hello";
  // If the specified demo is not found, set it to the default.
  if (fileSelect.querySelector(`option[value="${demo}"]`) == null) {
    demo = "hello";
  }
  fileSelect.value = demo;

  const version = urlParams.get("ver") ?? "5";
  // If the specified version is not found, set it to the default.
  if (versionSelect.querySelector(`option[value="${version}"]`) == null) {
    version = "5";
  }
  versionSelect.value = version;
}

function getSelectedFile() {
  return fileSelect.value;
}

function getSelectedVersion() {
  return versionSelect.value;
}

function saveQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set("ver", getSelectedVersion());
  urlParams.set("demo", getSelectedFile());
  window.history.replaceState({}, "", `?${urlParams.toString()}`);
}

// Choose the correct VexFlow object based on the selected version.
function updateVexFlowVersion() {
  delete window.Vex;
  delete window.VexFlow;

  switch (getSelectedVersion()) {
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
  }
}

// Load JS/TS files from /j/examples/*.js
// All files have the .js extension, even if they are TypeScript files.
async function loadAndRunFile() {
  const examplePath = "j/examples/" + getSelectedFile() + ".v" + getSelectedVersion() + ".js";

  const response = await fetch(examplePath);
  const code = await response.text();
  showCode(code);
  enableButton();
  runCode(); // Automatically run the example code whenever the version changes.
}

function clearOutput() {
  output.innerHTML = "";
}

function enableButton() {
  runButton.disabled = false;
}

function showCode(str) {
  code.innerHTML = str;
  Prism.highlightElement(code);
}

async function runCode() {
  clearOutput();
  let c = code.innerText;
  c = changeTypeScriptImportToJavaScriptImport(c);
  const transpiledCode = ts.transpile(c, { compilerOptions: { target: ts.ScriptTarget.ES2015 } });
  eval(transpiledCode);
}

// Connect the runButton to the runCode function.
runButton.addEventListener("click", runCode);

document.addEventListener("keydown", (event) => {
  // CTRL/CMD + Enter => Run Code
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    event.preventDefault();
    runCode();
  }

  if (document.activeElement.id !== "code") {
    // Arrow keys UP/DOWN/LEFT/RIGHT changes the currently selected file.
    if (event.key.startsWith("Arrow")) {
      let d;
      switch (event.key) {
        case "ArrowUp":
          d = -1;
          break;
        case "ArrowDown":
          d = 1;
          break;
        case "ArrowLeft":
          d = -1;
          break;
        case "ArrowRight":
          d = 1;
          break;
      }
      let newIndex = fileSelect.selectedIndex + d;
      if (newIndex < 0) {
        newIndex = fileSelect.options.length - 1;
      }
      if (newIndex >= fileSelect.options.length) {
        newIndex = 0;
      }
      fileSelect.selectedIndex = newIndex;
      fileSelect.dispatchEvent(new Event("change"));
    } else if (event.key >= "1" && event.key <= "5") {
      // Number keys 5, 4, 3, 2, 1 select the correct VexFlow version.
      // Make sure the <code> is not in focus.
      // Update versionSelect
      versionSelect.value = event.key;
      versionSelect.dispatchEvent(new Event("change"));
    }
  }
});

// When the user chooses a file or version from the dropdowns, we load and run the code.
fileSelect.addEventListener("change", show);
versionSelect.addEventListener("change", show);

// Convert TS import statement to JS destructuring assignment.
// Use a regex to convert from:
//     import { BarlineType, Factory, Registry, Renderer, StaveNote } from 'vexflow';
// to:
//     const { BarlineType, Factory, Registry, Renderer, StaveNote } = VexFlow;
// The import statement works when building a TypeScript project with VexFlow (via npm install vexflow).
// The const destructuring statement works in the browser with the VexFlow CJS bundle loaded via <script>.
function changeTypeScriptImportToJavaScriptImport(code) {
  const regex = /import\s*{(.*?)}\s*from\s*['"]vexflow['"];/g;
  const VFLibraryName = getSelectedVersion() === "5" ? "VexFlow" : "Vex.Flow";
  const replacement = `const {$1} = ${VFLibraryName};`;
  return code.replace(regex, replacement);
}

function show() {
  updateVexFlowVersion();
  loadAndRunFile();
  saveQueryParams();
}

async function loadVexFlowScriptsInOrder() {
  try {
    await loadScript(v5_jsdelivr_cjs_url);
    v5VexFlowObject = window.VexFlow;

    await loadScript(v4_jsdelivr_cjs_url);
    v4VexFlowObject = window.Vex;

    await loadScript(v3_jsdelivr_cjs_url);
    v3VexFlowObject = window.Vex;

    await loadScript(v2_jsdelivr_cjs_url);
    v2VexFlowObject = window.Vex;

    // Once all the scripts are loaded, we can check this page's query params.
    loadQueryParams();

    show();
  } catch (error) {
    console.error("Script loading failed:", error);
  }
}

loadVexFlowScriptsInOrder();
