import { d as defineComponent, k as computed, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode, w as withCtx, t as toDisplayString, a as createTextVNode, m as createBaseVNode, Q as normalizeStyle } from "./framework.1qnja6qJ.js";
const _hoisted_1 = { style: { "color": "var(--p-color-text-info-on-bg-fill)" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PreviewPlaceholder",
  props: {
    label: { default: "" },
    height: { default: "auto" },
    width: { default: "auto" }
  },
  setup(__props) {
    const props = __props;
    const styles = computed(() => {
      return {
        background: "var(--p-color-text-info)",
        padding: "14px var(--p-space-200)",
        height: props.height,
        width: props.width
      };
    });
    return (_ctx, _cache) => {
      const _component_Text = resolveComponent("Text");
      const _component_InlineStack = resolveComponent("InlineStack");
      return openBlock(), createElementBlock("div", {
        style: normalizeStyle(styles.value)
      }, [
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
