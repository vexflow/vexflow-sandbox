let selectedVersion = 5;

const v5_jsdelivr_cjs_url = "https://cdn.jsdelivr.net/npm/vexflow@5.0.0/build/cjs/vexflow-debug.js";
const v4_jsdelivr_cjs_url = "https://cdn.jsdelivr.net/npm/vexflow4@4.2.6/build/cjs/vexflow-debug.js";
const v3_jsdelivr_cjs_url = "https://cdn.jsdelivr.net/npm/vexflow@3.0.9/releases/vexflow-debug.js";

const examples = {
  hello: {
    5: "hello.v5.js",
    4: "hello.v4.js",
    3: "hello.v3.js",
  },
  minuet: {
    5: "minuet.v5.ts",
    4: "minuet.v4.ts",
    3: "minuet.v3.js",
  },
};

let v5VexFlowObject;
let v4VexFlowObject;
let v3VexFlowObject;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function updateSelectedVersionFromQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const version = urlParams.get("ver") ?? "5";
  setVersion(parseInt(version));
}

function highlightSelectedVersion() {
  document.querySelector(".selectedVersionHighlight").classList.remove("selectedVersionHighlight");
  document.querySelector(`#v${selectedVersion}Link`).classList.add("selectedVersionHighlight");
}

function setVersion(v) {
  selectedVersion = v;

  delete window.Vex;
  delete window.VexFlow;

  switch (selectedVersion) {
    case 5:
    default:
      window.VexFlow = v5VexFlowObject;
      break;
    case 4:
      window.Vex = v4VexFlowObject;
      break;
    case 3:
      window.Vex = v3VexFlowObject;
      break;
  }

  loadAndRunFile();
}

// Load JS files from /j/examples/*.js|ts
async function loadAndRunFile() {
  const selectedFile = document.getElementById("fileSelect").value;
  console.log(examples[selectedFile]);
  let examplePath = "/j/examples/" + examples[selectedFile][selectedVersion];

  const response = await fetch(examplePath);
  const code = await response.text();
  showCode(code);
  highlightSelectedVersion();
  enableButton();
  runCode(); // Automatically run the example code whenever the version changes.
}

function clearOutput() {
  document.getElementById("output").innerHTML = "";
}

function enableButton() {
  document.getElementById("runButton").disabled = false;
}

function showCode(str) {
  document.getElementById("code").innerHTML = str;
  window.Prism.highlightElement(document.getElementById("code"));
}

async function runCode() {
  clearOutput();
  let code = document.getElementById("code").innerText;
  code = changeTypeScriptImportToJavaScriptImport(code);
  const transpiledCode = ts.transpile(code, { compilerOptions: { target: ts.ScriptTarget.ES2015 } });
  eval(transpiledCode);
}

// Connect the runButton to the runCode function.
document.getElementById("runButton").addEventListener("click", runCode);

// CTRL/CMD + Enter => Run Code
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    event.preventDefault();
    runCode();
  }
});

// add a listener to fileSelect
document.getElementById("fileSelect").addEventListener("change", async (event) => {
  const fileName = event.target.value;
  console.log("Selected example file:", fileName);
  loadAndRunFile();
});

// Convert TS import statement to JS destructuring assignment.
// Use a regex to convert from:
//     import { BarlineType, Factory, Registry, Renderer, StaveNote } from 'vexflow';
// to:
//     const { BarlineType, Factory, Registry, Renderer, StaveNote } = VexFlow;
// The import statement works when building a TypeScript project with VexFlow (via npm install vexflow).
// The const destructuring statement works in the browser with the VexFlow CJS bundle loaded via <script>.
function changeTypeScriptImportToJavaScriptImport(code) {
  const regex = /import\s*{(.*?)}\s*from\s*['"]vexflow['"];/g;
  const VFLibraryName = selectedVersion === 5 ? "VexFlow" : "Vex.Flow";
  const replacement = `const {$1} = ${VFLibraryName};`;
  return code.replace(regex, replacement);
}

async function loadVexFlowScriptsInOrder() {
  try {
    await loadScript(v5_jsdelivr_cjs_url);
    v5VexFlowObject = window.VexFlow;

    await loadScript(v4_jsdelivr_cjs_url);
    v4VexFlowObject = window.Vex;

    await loadScript(v3_jsdelivr_cjs_url);
    v3VexFlowObject = window.Vex;

    // Once all the scripts are loaded, we can check this page's query params.
    updateSelectedVersionFromQueryParams();
  } catch (error) {
    console.error("Script loading failed:", error);
  }
}

loadVexFlowScriptsInOrder();
