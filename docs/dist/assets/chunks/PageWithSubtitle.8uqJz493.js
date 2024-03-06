import { A as ArrowDownIcon } from "./Preview.vue_vue_type_style_index_0_lang.a_K4ko6J.js";
import { d as defineComponent, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode, p as unref } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PageWithSubtitle",
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_Text = resolveComponent("Text");
      const _component_LegacyCard = resolveComponent("LegacyCard");
      const _component_Page = resolveComponent("Page");
      return openBlock(), createBlock(_component_Page, {
        title: "Invoice",
        subtitle: "Statement period: May 3, 2019 to June 2, 2019",
        backAction: { content: "Products", url: "#" },
        secondaryActions: [{ content: "Download", icon: unref(ArrowDownIcon) }]
      }, {
        default: withCtx(() => [
          createVNode(_component_LegacyCard, {
            title: "Credit card",
            sectioned: ""
          }, {
            default: withCtx(() => [
              createVNode(_component_Text, { as: "p" }, {
                default: withCtx(() => [
                  createTextVNode("Credit card information")
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["secondaryActions"]);
    };
  }
});
export {
  _sfc_main as default
};
