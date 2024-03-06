import { P as PlusIcon } from "./Preview.vue_vue_type_style_index_0_lang.a_K4ko6J.js";
import { d as defineComponent, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, p as unref } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithIcon",
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createBlock(_component_Button, { icon: unref(PlusIcon) }, {
        default: withCtx(() => [
          createTextVNode("Add theme")
        ]),
        _: 1
      }, 8, ["icon"]);
    };
  }
});
export {
  _sfc_main as default
};
