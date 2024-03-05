import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ClearButton",
  setup(__props) {
    const textFieldValue = ref("Ownego");
    const handleClearButtonClick = () => {
      textFieldValue.value = "";
    };
    return (_ctx, _cache) => {
      const _component_TextField = resolveComponent("TextField");
      return openBlock(), createBlock(_component_TextField, {
        label: "Store name",
        modelValue: textFieldValue.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => textFieldValue.value = $event),
        "clear-button": "",
        onClearButtonClick: handleClearButtonClick,
        autoComplete: "off"
      }, null, 8, ["modelValue"]);
    };
  }
});
export {
  _sfc_main as default
};
