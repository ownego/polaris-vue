import { _ as _sfc_main$1 } from "./PreviewPlaceholder.vue_vue_type_script_setup_true_lang.HhvdvJrZ.js";
import { d as defineComponent, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Direction",
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_Bleed = resolveComponent("Bleed");
      const _component_Card = resolveComponent("Card");
      const _component_BlockStack = resolveComponent("BlockStack");
      return openBlock(), createBlock(_component_BlockStack, { gap: "600" }, {
        default: withCtx(() => [
          createVNode(_component_Card, null, {
            default: withCtx(() => [
              createVNode(_component_Bleed, { "margin-inline-start": "800" }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$1, { label: "marginInlineStart" })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_Card, null, {
            default: withCtx(() => [
              createVNode(_component_Bleed, { "margin-inline-end": "800" }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$1, { label: "marginInlineEnd" })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_Card, null, {
            default: withCtx(() => [
              createVNode(_component_Bleed, { "margin-block-start": "800" }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$1, { label: "marginBlockStart" })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_Card, null, {
            default: withCtx(() => [
              createVNode(_component_Bleed, { "margin-block-end": "800" }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$1, { label: "marginBlockEnd" })
                ]),
                _: 1
              })
            ]),
            _: 1
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
