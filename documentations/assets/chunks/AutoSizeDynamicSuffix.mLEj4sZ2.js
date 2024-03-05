import { d as defineComponent, h as ref, k as computed, D as resolveComponent, o as openBlock, b as createBlock } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AutoSizeDynamicSuffix",
  setup(__props) {
    const inputValue = ref("Ownego");
    const suffix = computed(() => inputValue.value ? "in: Unfulfilled orders" : null);
    return (_ctx, _cache) => {
      const _component_TextField = resolveComponent("TextField");
      return openBlock(), createBlock(_component_TextField, {
        label: "Search view",
        modelValue: inputValue.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => inputValue.value = $event),
        autoComplete: "off",
        autoSize: "",
        placeholder: "Searching in Unfulfilled orders",
        suffix: suffix.value
      }, null, 8, ["modelValue", "suffix"]);
    };
  }
});
export {
  _sfc_main as default
};
