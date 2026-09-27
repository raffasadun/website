import * as yaml from "js-yaml";

export default function (eleventyConfig) {
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));
  eleventyConfig.addPassthroughCopy({ "src/css": "css", "src/photos": "photos", "src/files": "files", "src/img": "img" });
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
    return l.pdf || l.journal || l.nber || l.ssrn ||
      `https://scholar.google.com/scholar?q=${encodeURIComponent('"' + p.title + '"')}`;
  });
  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  return { dir: { input: "src", output: "_site" } };
}
