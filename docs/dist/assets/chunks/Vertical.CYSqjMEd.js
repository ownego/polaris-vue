import { d as defineComponent, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode, m as createBaseVNode } from "./framework.2IsXxFXf.js";
const _hoisted_1 = { style: { "color": "var(--p-color-text-info-on-bg-fill)" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Vertical",
  setup(__props) {
    const placeHolderStyle = {
      background: "var(--p-color-text-info)",
      padding: "var(--p-space-1000) var(--p-space-200)",
      height: "auto",
      width: "auto"
    };
    return (_ctx, _cache) => {
      const _component_Text = resolveComponent("Text");
      const _component_InlineStack = resolveComponent("InlineStack");
      const _component_Bleed = resolveComponent("Bleed");
      const _component_Card = resolveComponent("Card");
      return openBlock(), createBlock(_component_Card, null, {
        default: withCtx(() => [
          createVNode(_component_Bleed, { marginBlock: "800" }, {
            default: withCtx(() => [
              createBaseVNode("div", { style: placeHolderStyle }, [
                createVNode(_component_InlineStack, {
                  gap: "400",
                  align: "center"
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_1, [
                      createVNode(_component_Text, {
                        as: "h2",
                        variant: "bodyMd",
                        "font-weight": "regular",
                        tone: "text-inverse"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" marginBlock ")
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                })
              ])
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
