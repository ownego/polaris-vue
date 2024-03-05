import { d as defineComponent, k as computed, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode, w as withCtx, t as toDisplayString, a as createTextVNode, m as createBaseVNode, Q as normalizeStyle } from "./framework.2IsXxFXf.js";
const _hoisted_1 = { style: { "color": "var(--p-color-text-info-on-bg-fill)" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PreviewPlaceholder",
  props: {
    height: { default: "auto" },
    width: { default: "auto" },
    label: { default: "" },
    showBorder: { type: Boolean, default: false },
    showBorderTop: { type: Boolean, default: false },
    padding: { default: "6px 0px" }
  },
  setup(__props) {
    const props = __props;
    const style = computed(() => {
      return {
        background: "var(--p-color-text-info)",
        height: props.height,
        width: props.width,
        borderInlineStart: props.showBorder ? "1px dashed var(--p-color-bg-surface-success)" : "none",
        borderBlockStart: props.showBorderTop ? "1px dashed var(--p-color-bg-surface-success)" : "none",
        padding: props.padding
      };
    });
    return (_ctx, _cache) => {
      const _component_Text = resolveComponent("Text");
      const _component_InlineStack = resolveComponent("InlineStack");
      return openBlock(), createElementBlock("div", {
        style: normalizeStyle(style.value)
      }, [
        createVNode(_component_InlineStack, { align: "center" }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_1, [
              createVNode(_component_Text, {
                as: "h2",
                variant: "bodyMd",
                fontWeight: "medium",
                tone: "text-inverse"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.label), 1)
                ]),
                _: 1
              })
            ])
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
