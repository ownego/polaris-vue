import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithLoading",
  setup(__props) {
    const inputValue = ref("Ownego");
    const handleClearButtonClick = () => {
      inputValue.value = "";
    };
    return (_ctx, _cache) => {
      const _component_TextField = resolveComponent("TextField");
      return openBlock(), createBlock(_component_TextField, {
        label: "Store name",
        modelValue: inputValue.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => inputValue.value = $event),
        autoComplete: "off",
        clearButton: "",
        onClearButtonClick: handleClearButtonClick,
        loading: ""
      }, null, 8, ["modelValue"]);
    };
  }
});
export {
  _sfc_main as default
};
