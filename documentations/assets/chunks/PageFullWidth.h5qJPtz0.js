import { P as PlusIcon } from "./Preview.vue_vue_type_style_index_0_lang.w_jMciSf.js";
import { d as defineComponent, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode, p as unref } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PageFullWidth",
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_Text = resolveComponent("Text");
      const _component_LegacyCard = resolveComponent("LegacyCard");
      const _component_Page = resolveComponent("Page");
      return openBlock(), createBlock(_component_Page, {
        fullWidth: "",
        title: "Orders",
        primaryAction: { content: "Create order", icon: unref(PlusIcon) },
        secondaryActions: [{ content: "Export" }],
        pagination: {
          hasNext: true
        }
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
      }, 8, ["primaryAction"]);
    };
  }
});
export {
  _sfc_main as default
};
