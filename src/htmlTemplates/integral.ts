import type { HtmlStructure } from "../lib/htmlComposer";

export const integral: HtmlStructure = {
  class: "pt-integral",
  children: [
    { class: "pt-integral__upper-limit", text: "　" },
    { class: "pt-integral__lower-limit", text: "　" },
    { class: "pt-integral__symbol" },
  ],
};
