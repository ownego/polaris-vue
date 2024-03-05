import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RightAlignText",
  setup(__props) {
    const textFieldValue = ref("1");
    return (_ctx, _cache) => {
      const _component_LegacyStackItem = resolveComponent("LegacyStackItem");
      const _component_TextField = resolveComponent("TextField");
      const _component_LegacyStack = resolveComponent("LegacyStack");
      return openBlock(), createBlock(_component_LegacyStack, null, {
        default: withCtx(() => [
          createVNode(_component_LegacyStackItem, { fill: "" }, {
            default: withCtx(() => [
              createTextVNode("Price")
            ]),
            _: 1
          }),
          createVNode(_component_TextField, {
            label: "Price",
            "label-hidden": "",
            modelValue: textFieldValue.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => textFieldValue.value = $event),
            autoComplete: "off",
            align: "right"
          }, null, 8, ["modelValue"])
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
