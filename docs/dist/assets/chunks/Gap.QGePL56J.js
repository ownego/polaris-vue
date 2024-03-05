import { d as defineComponent, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode, w as withCtx, m as createBaseVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Gap",
  setup(__props) {
    const wrapperStyle = {
      background: "var(--p-color-bg-surface-success)",
      height: "auto"
    };
    const innerBlockStackStyle = {
      background: "var(--p-color-text-info)",
      padding: "14px var(--p-space-200)",
      height: "48px"
    };
    return (_ctx, _cache) => {
      const _component_BlockStack = resolveComponent("BlockStack");
      return openBlock(), createElementBlock("div", { style: wrapperStyle }, [
        createVNode(_component_BlockStack, { gap: "500" }, {
          default: withCtx(() => [
            createBaseVNode("div", { style: innerBlockStackStyle }),
            createBaseVNode("div", { style: innerBlockStackStyle }),
            createBaseVNode("div", { style: innerBlockStackStyle })
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
