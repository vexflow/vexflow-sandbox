export default async function (eleventyConfig) {
  eleventyConfig.addGlobalData("currDate", () => new Date());

  eleventyConfig.addPassthroughCopy({ static: "/" });
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
