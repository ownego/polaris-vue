import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Default",
  setup(__props) {
    const checked = ref(true);
    return (_ctx, _cache) => {
      const _component_Checkbox = resolveComponent("Checkbox");
      return openBlock(), createBlock(_component_Checkbox, {
        label: "Basic checkbox",
        modelValue: checked.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => checked.value = $event)
      }, null, 8, ["modelValue"]);
    };
  }
});
export {
  _sfc_main as default
};
