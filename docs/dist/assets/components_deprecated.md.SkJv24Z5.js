import { M as MarkdownIt } from "./chunks/theme.Wc-8iswD.js";
import { o as openBlock, c as createElementBlock, m as createBaseVNode, a as createTextVNode, t as toDisplayString, I as createVNode, w as withCtx, p as unref, D as resolveComponent } from "./chunks/framework.2IsXxFXf.js";
const _hoisted_1 = {
  id: "frontmatter-title",
  tabindex: "-1"
};
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("a", {
  class: "header-anchor",
  href: "#frontmatter-title",
  "aria-label": 'Permalink to "{{ $frontmatter.title }}"'
}, "​", -1);
const _hoisted_3 = ["innerHTML"];
const __pageData = JSON.parse('{"title":"Deprecated","description":"","frontmatter":{"outline":false,"aside":false,"prev":false,"next":false,"title":"Deprecated","shortDescription":"Deprecated components will be removed in future major versions of Polaris. They should be avoided and will show warnings.","description":"Deprecated components will be removed in future major versions of Polaris. These components could be deprecated for a [number of reasons](https://polaris.shopify.com/getting-started/components-lifecycle#requirements-for-deprecation) and should be avoided. These components will show warnings in the component file and provide details for alternative usage. For more information, check out the [component lifecycles](https://polaris.shopify.com/getting-started/components-lifecycle#deprecated)."},"headers":[],"params":{"category":"deprecated","name":"Deprecated"},"relativePath":"components/deprecated.md","filePath":"category/deprecated.md"}');
const __default__ = { name: "components/deprecated.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  setup(__props) {
    const md = new MarkdownIt();
    return (_ctx, _cache) => {
      const _component_Lede = resolveComponent("Lede");
      const _component_ListComponents = resolveComponent("ListComponents");
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("h1", _hoisted_1, [
          createTextVNode(toDisplayString(_ctx.$frontmatter.title) + " ", 1),
          _hoisted_2
        ]),
        createVNode(_component_Lede, null, {
          default: withCtx(() => [
            createBaseVNode("div", {
              innerHTML: unref(md).render(_ctx.$frontmatter.description)
            }, null, 8, _hoisted_3)
          ]),
          _: 1
        }),
        createVNode(_component_ListComponents)
      ]);
    };
  }
});
export {
  __pageData,
  _sfc_main as default
};
