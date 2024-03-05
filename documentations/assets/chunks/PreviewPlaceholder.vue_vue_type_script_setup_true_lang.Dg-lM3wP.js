import { d as defineComponent, k as computed, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode, w as withCtx, Q as normalizeStyle, t as toDisplayString, a as createTextVNode, m as createBaseVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PreviewPlaceholder",
  props: {
    height: { default: "auto" },
    width: { default: "auto" },
    label: { default: "" },
    showBorder: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const style = computed(() => {
      return {
        display: "inherit",
        background: "var(--p-color-text-info)",
        height: props.height || void 0,
        width: props.width || void 0,
        borderInlineStart: props.showBorder ? "1px dashed var(--p-color-bg-surface-success)" : "none"
      };
    });
    const inlineDivStyle = computed(() => {
      return {
        color: "var(--p-color-text-info-on-bg-fill)",
        width: props.width || void 0
      };
    });
    return (_ctx, _cache) => {
      const _component_Text = resolveComponent("Text");
      const _component_InlineStack = resolveComponent("InlineStack");
      return openBlock(), createElementBlock("div", {
        style: normalizeStyle(style.value)
      }, [
        createVNode(_component_InlineStack, {
          gap: "400",
          align: "center",
          "block-align": "center"
        }, {
          default: withCtx(() => [
            createBaseVNode("div", {
              style: normalizeStyle(inlineDivStyle.value)
            }, [
              createVNode(_component_Text, {
                as: "h2",
                variant: "bodyMd",
                fontWeight: "medium",
                alignment: "center",
                tone: "text-inverse"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.label), 1)
                ]),
                _: 1
              })
            ], 4)
          ]),
          _: 1
        })
      ], 4);
    };
  }
});
export {
  _sfc_main as _
};
