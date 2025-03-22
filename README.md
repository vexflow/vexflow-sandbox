# VexFlow Sandbox

The VexFlow 5 sandbox is hosted on GitHub Pages:

https://vexflow.github.io/vexflow-sandbox/

The site is built with the [11ty](https://www.11ty.dev/) static site generator.

1. Use [pnpm](https://pnpm.io/) or npm to install dependencies.
   ```
   pnpm install
   ```
   or
   ```
   npm install
   ```
1. The `src/` folder contains `index.html`, which is interpreted as a [liquid template](https://www.11ty.dev/docs/languages/liquid/).
1. Run `pnpm start` or `npm start`.
1. Navigate to `http://localhost:8080/`.
1. Other HTML pages in `src/` will be translated to paths as follows:
   - `hello.html` → `/hello/`
   - `typescript.html` → `/typescript/`
