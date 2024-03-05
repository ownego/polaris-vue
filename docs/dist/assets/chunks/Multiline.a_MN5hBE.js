import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Multiline",
  setup(__props) {
    const value = ref("1776 Barnes Street\nOrlando, FL 32801");
    return (_ctx, _cache) => {
      const _component_TextField = resolveComponent("TextField");
      return openBlock(), createBlock(_component_TextField, {
        label: "Shipping address",
        modelValue: value.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => value.value = $event),
        multiline: 4,
        autoComplete: "off"
      }, null, 8, ["modelValue"]);
    };
  }
});
export {
  _sfc_main as default
};
