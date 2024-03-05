import { _ as _sfc_main$1 } from "./PreviewPlaceholder.vue_vue_type_script_setup_true_lang.seQ4fu9Y.js";
import { d as defineComponent, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ColumnWidth",
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_InlineGrid = resolveComponent("InlineGrid");
      return openBlock(), createBlock(_component_InlineGrid, { columns: ["oneThird", "twoThirds"] }, {
        default: withCtx(() => [
          createVNode(_sfc_main$1, {
            height: "320px",
            label: "oneThird"
          }),
          createVNode(_sfc_main$1, {
            height: "320px",
            label: "twoThirds",
            "show-border": ""
          })
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
