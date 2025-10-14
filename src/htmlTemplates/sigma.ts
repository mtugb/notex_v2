import type { HtmlStructure } from "../lib/htmlComposer";

export const sigma: HtmlStructure = {
  class: "pt-sigma",
  children: [
    { class: "pt-sigma__upper-limit", text: "n" },
    { class: "pt-sigma__lower-limit", text: "i = 1" },
    { class: "pt-sigma__symbol" },
  ],
};

const following: HtmlStructure[] = [
  {
    text: "i",
    children: [{ class: "pt-sup", text: "3" }],
  },
  { text: " + a" },
  {
    children: [{ class: "pt-sub", text: "i" }],
  },
  { children: [{ class: "pt-sup", text: "2" }] },
];
