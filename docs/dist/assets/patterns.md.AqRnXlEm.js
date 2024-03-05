import { _ as _export_sfc, o as openBlock, c as createElementBlock, m as createBaseVNode, a as createTextVNode, t as toDisplayString, U as createStaticVNode } from "./chunks/framework.1qnja6qJ.js";
const __pageData = JSON.parse('{"title":"Patterns","description":"","frontmatter":{"title":"Patterns","outline":"deep","prev":false,"next":{"text":"Contributing","link":"/contributing"}},"headers":[],"relativePath":"patterns.md","filePath":"patterns.md"}');
const _sfc_main = { name: "patterns.md" };
const _hoisted_1 = {
  id: "frontmatter-title",
  tabindex: "-1"
};
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("a", {
  class: "header-anchor",
  href: "#frontmatter-title",
  "aria-label": 'Permalink to "{{ $frontmatter.title }}"'
}, "​", -1);
const _hoisted_3 = /* @__PURE__ */ createStaticVNode('<h3 id="we-re-still-building-this" tabindex="-1">We&#39;re still building this... <a class="header-anchor" href="#we-re-still-building-this" aria-label="Permalink to &quot;We&#39;re still building this...&quot;">​</a></h3><p>This page is a collection of patterns that are commonly used in the Shopify admin. Each pattern is described in detail, with examples and best practices.</p><p>Some of the patterns are:</p><ul><li>Date picker (Advanced like Shopify&#39;s)</li><li>Common layouts</li><li>Product picker (Modal, variants, list, etc.)</li><li>Resource picker</li><li>Toggle buttons</li><li>Tabs and accordion</li><li>...</li></ul>', 4);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    createBaseVNode("h1", _hoisted_1, [
      createTextVNode(toDisplayString(_ctx.$frontmatter.title) + " ", 1),
      _hoisted_2
    ]),
    _hoisted_3
  ]);
}
const patterns = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  patterns as default
};
