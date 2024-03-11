import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    // "./src/index",
    {
      builder: "mkdist",
      input: "./src",
      outDir: "./dist",
      ext: "mjs",
    },
  ],

  // Change outDir, default is 'dist'
  outDir: "dist",

  // Generates .d.ts declaration file
  declaration: true,
});
