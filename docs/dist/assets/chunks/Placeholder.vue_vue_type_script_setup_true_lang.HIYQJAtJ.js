import { d as defineComponent, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode, w as withCtx, t as toDisplayString, a as createTextVNode, m as createBaseVNode, Q as normalizeStyle } from "./framework.1qnja6qJ.js";
const _hoisted_1 = { style: { "{ color": "'var(--p-color-text-info-on-bg-fill)' }" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Placeholder",
  props: {
    label: { default: "" },
    height: { default: "auto" },
    width: { default: "auto" },
    childAlign: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_Text = resolveComponent("Text");
      const _component_InlineStack = resolveComponent("InlineStack");
      return openBlock(), createElementBlock("div", {
        style: normalizeStyle({ background: "var(--p-color-text-info)", height: _ctx.height, width: _ctx.width })
      }, [
        createVNode(_component_InlineStack, {
          gap: "400",
          align: _ctx.childAlign
        }, {
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
        }, 8, ["align"])
      ], 4);
    };
  }
});
export {
  _sfc_main as _
};
