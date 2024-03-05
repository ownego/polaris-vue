import { _ as _sfc_main$1 } from "./PreviewPlaceholder.vue_vue_type_script_setup_true_lang.Dg-lM3wP.js";
import { d as defineComponent, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode, w as withCtx } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Gap",
  setup(__props) {
    const spacingStyle = {
      background: "var(--p-color-bg-surface-success)",
      width: "100%",
      height: "auto"
    };
    return (_ctx, _cache) => {
      const _component_InlineGrid = resolveComponent("InlineGrid");
      return openBlock(), createElementBlock("div", { style: spacingStyle }, [
        createVNode(_component_InlineGrid, {
          gap: "400",
          columns: 3
        }, {
          default: withCtx(() => [
            createVNode(_sfc_main$1, { height: "320px" }),
            createVNode(_sfc_main$1, { height: "320px" }),
            createVNode(_sfc_main$1, { height: "320px" })
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  _sfc_main as default
};
