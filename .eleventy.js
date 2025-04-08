import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import { minify } from "html-minifier";

// TODO: The GitHub workflow can set an environment variable to turn off debug mode.
const DEBUG_MODE = true;

function htmlMinifierTransform(content, outputPath) {
  if (outputPath && outputPath.endsWith(".html")) {
    const options = DEBUG_MODE
      ? {}
      : {
          // See: https://github.com/kangax/html-minifier?tab=readme-ov-file#options-quick-reference
          removeComments: true,
          minifyJS: true,
          minifyCSS: true,
          collapseWhitespace: true,
        };
    return minify(content, options);
  } else {
    return content;
  }
}

export default async function (eleventyConfig) {
  eleventyConfig.addTransform("html-minifier", htmlMinifierTransform);
  eleventyConfig.addGlobalData("currDate", () => new Date());
  eleventyConfig.addPassthroughCopy({ static: "/" });
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin, {
    // baseHref: eleventyConfig.pathPrefix,
    extensions: "html",
  });
}

export const config = {
  dir: {
    input: "src/",
    includes: "./_includes/",
    data: "./_data/",
    output: "./_site/",
  },
  pathPrefix: "/vexflow-sandbox/",
};
