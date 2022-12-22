import * as markdownToVue from "./markdownToVue";
import * as fs from "node:fs";

const mappings: markdownToVue.Mappings = {
  h1: "heading1",
  h2: "heading2",
  h3: "heading3",
  h4: "heading4",
  h5: "heading5",
  ul: "unordered-list",
  ol: "ordered-list",
  code: "code",
  pre: "code-block",
};
const packageName = "plog";

// add packageName in front of mappings
for (let tag in mappings) {
  mappings[tag] = `${packageName}-${mappings[tag]}`;
}

const docsDirectory = "./docs";
const outputDirectory = "./pages/docs";
const appConfigPath = "./plog.config.ts";

const watch = (
  sources: string[],
  callback: Function,
  immediate: boolean = false
) => {
  if (immediate) callback();
  sources.forEach((source) => {
    fs.watch(source, () => {
      callback();
    });
  });
};

watch(
  [docsDirectory, appConfigPath],
  () => {
    markdownToVue.render(docsDirectory, outputDirectory, mappings);
  },
  true
);
