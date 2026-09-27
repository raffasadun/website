import * as yaml from "js-yaml";

export default function (eleventyConfig) {
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));
  eleventyConfig.addPassthroughCopy({ "src/css": "css", "src/photos": "photos", "src/files": "files", "src/img": "img", "src/papers": "papers" });
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });

  eleventyConfig.addFilter("byTheme", (papers, theme, status) =>
    papers.filter((p) => p.theme === theme && (!status || p.status === status))
      .sort((a, b) => (b.year || 9999) - (a.year || 9999)));
  eleventyConfig.addFilter("byGroup", (items, group) => items.filter((m) => m.group === group));
  eleventyConfig.addFilter("monthYear", (d) => {
    if (!d) return "";
    const [y, m] = String(d).split("-");
    if (!m) return y;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[parseInt(m, 10) - 1]} ${y}`;
  });
  eleventyConfig.addFilter("mainLink", (p) => {
    const l = p.links || {};
    return p.pdf || l.free || l.journal || "";
  });
  eleventyConfig.addFilter("freeLabel", (url) => {
    if (!url) return "";
    if (url.includes("nber.org/papers")) return "NBER";
    if (url.includes("hbs.edu/faculty")) return "HBS";
    if (url.includes("ssrn.com")) return "SSRN";
    if (url.includes("cepr.org")) return "CEPR";
    if (url.includes("cep.lse.ac.uk")) return "CEP";
    if (url.includes("iza.org")) return "IZA";
    return "Free PDF";
  });
  eleventyConfig.addFilter("themeName", (key, themes) => (themes.find((t) => t.key === key) || {}).name || "");
  eleventyConfig.addFilter("yearGroups", (papers) => {
    const groups = new Map();
    const undated = papers.filter((p) => !p.year);
    [...papers].filter((p) => p.year).sort((a, b) => b.year - a.year).forEach((p) => {
      if (!groups.has(p.year)) groups.set(p.year, []);
      groups.get(p.year).push(p);
    });
    const out = [];
    if (undated.length) out.push(["Work in progress", undated]);
    for (const [y, list] of groups) out.push([String(y), list]);
    return out;
  });
  eleventyConfig.addFilter("json", (v) => JSON.stringify(v, null, 2));
  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  return { dir: { input: "src", output: "_site" } };
}
