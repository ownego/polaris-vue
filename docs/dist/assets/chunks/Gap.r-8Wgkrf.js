import { _ as _sfc_main$1 } from "./PreviewPlaceholder.vue_vue_type_script_setup_true_lang.NklbSLTc.js";
import { d as defineComponent, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode, m as createBaseVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Gap",
  setup(__props) {
    const spacingStyleWithMargin = {
      display: "flex",
      background: "var(--p-color-bg-surface-success)",
      width: "436px",
      height: "20px",
      marginBlockEnd: "8px"
    };
    const spacingStyleNoMargin = {
      display: "flex",
      background: "var(--p-color-bg-surface-success)",
      width: "227.98px",
      height: "40px",
      marginBlockEnd: "none"
    };
    return (_ctx, _cache) => {
      const _component_InlineStack = resolveComponent("InlineStack");
      const _component_BlockStack = resolveComponent("BlockStack");
      return openBlock(), createBlock(_component_BlockStack, null, {
        default: withCtx(() => [
          createVNode(_component_InlineStack, null, {
            default: withCtx(() => [
              createBaseVNode("div", { style: spacingStyleWithMargin }, [
                createVNode(_component_InlineStack, {
                  gap: "400",
                  wrap: false,
                  "block-align": "center"
                }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$1, {
                      width: "106px",
                      height: "36px"
                    }),
                    createVNode(_sfc_main$1, {
                      width: "106px",
                      height: "20px"
                    }),
                    createVNode(_sfc_main$1, {
                      width: "106px",
                      height: "20px"
                    }),
                    createVNode(_sfc_main$1, {
                      width: "106px",
                      height: "20px"
                    })
                  ]),
                  _: 1
                })
              ])
            ]),
            _: 1
          }),
          createBaseVNode("div", { style: spacingStyleNoMargin }, [
            createVNode(_component_InlineStack, {
              gap: "400",
              wrap: false,
              "block-align": "end"
            }, {
              default: withCtx(() => [
                createVNode(_sfc_main$1, {
                  width: "106px",
                  height: "20px"
                }),
                createVNode(_sfc_main$1, {
                  width: "106px",
                  height: "20px"
                })
              ]),
              _: 1
            })
          ])
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
