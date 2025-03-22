# VexFlow Sandbox

The VexFlow 5 sandbox is hosted on GitHub Pages:

https://vexflow.github.io/vexflow-sandbox/

The site is built with the [11ty](https://www.11ty.dev/) static site generator.

1. Install dependencies: `npm install`
1. The `src/` folder contains `index.html`, which is interpreted as a [liquid template](https://www.11ty.dev/docs/languages/liquid/).
   - 11ty also supports [markdown](https://www.11ty.dev/docs/languages/markdown/) and other template files.
1. Start the dev server: `npm start`
1. Navigate to: `http://localhost:8080/`
1. Other pages in `src/` will be translated to paths as follows:
    - `hello.html` → `/hello/`
    - `typescript.html` → `/typescript/`
    - `readme.md` → `/readme/`
