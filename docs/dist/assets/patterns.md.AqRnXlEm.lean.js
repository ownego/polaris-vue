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
const _hoisted_3 = /* @__PURE__ */ createStaticVNode("", 4);
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
