import { _ as _sfc_main$1 } from "./PreviewPlaceholder.vue_vue_type_script_setup_true_lang.2rZPG7hC.js";
import { d as defineComponent, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "InlineAlign",
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_BlockStack = resolveComponent("BlockStack");
      const _component_Divider = resolveComponent("Divider");
      const _component_Page = resolveComponent("Page");
      return openBlock(), createBlock(_component_Page, null, {
        default: withCtx(() => [
          createVNode(_component_BlockStack, { gap: "800" }, {
            default: withCtx(() => [
              createVNode(_component_BlockStack, { inlineAlign: "start" }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$1, {
                    height: "48px",
                    width: "320px",
                    label: "Start",
                    showBorder: ""
                  }),
                  createVNode(_sfc_main$1, {
                    height: "48px",
                    width: "320px",
                    showBorder: ""
                  }),
                  createVNode(_sfc_main$1, {
                    height: "48px",
                    width: "320px",
                    showBorder: ""
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Divider),
              createVNode(_component_BlockStack, { inlineAlign: "center" }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$1, {
                    height: "48px",
                    width: "320px",
                    label: "Center",
                    showBorder: ""
                  }),
                  createVNode(_sfc_main$1, {
                    height: "48px",
                    width: "320px",
                    showBorder: ""
                  }),
                  createVNode(_sfc_main$1, {
                    height: "48px",
                    width: "320px",
                    showBorder: ""
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Divider),
              createVNode(_component_BlockStack, { inlineAlign: "end" }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$1, {
                    height: "48px",
                    width: "320px",
                    label: "End",
                    showBorder: ""
                  }),
                  createVNode(_sfc_main$1, {
                    height: "48px",
                    width: "320px",
                    showBorder: ""
                  }),
                  createVNode(_sfc_main$1, {
                    height: "48px",
                    width: "320px",
                    showBorder: ""
                  })
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
