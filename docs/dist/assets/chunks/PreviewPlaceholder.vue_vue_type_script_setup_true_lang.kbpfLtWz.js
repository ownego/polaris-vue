import { d as defineComponent, k as computed, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode, w as withCtx, t as toDisplayString, a as createTextVNode, m as createBaseVNode, Q as normalizeStyle } from "./framework.1qnja6qJ.js";
const _hoisted_1 = { style: { "color": "var(--p-color-text-info-on-bg-fill)" } };
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
    const wrapperStyle = computed(() => {
      return {
        background: "var(--p-color-text-info)",
        padding: "14px var(--p-space-200)",
        height: props.height,
        width: props.width,
        borderBlockEnd: props.showBorder ? "1px dashed var(--p-color-bg-surface-success)" : "none"
      };
    });
    return (_ctx, _cache) => {
      const _component_Text = resolveComponent("Text");
      const _component_InlineStack = resolveComponent("InlineStack");
      return openBlock(), createElementBlock("div", {
        style: normalizeStyle(wrapperStyle.value)
      }, [
        createVNode(_component_InlineStack, { align: "center" }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_1, [
              createVNode(_component_Text, {
                as: "h2",
                variant: "bodyMd",
                fontWeight: "regular",
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
