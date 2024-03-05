import { d as defineComponent, h as ref, a3 as h, D as resolveComponent, o as openBlock, b as createBlock } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ChildrenContent",
  setup(__props) {
    const selected = ref(["none"]);
    const textFieldValue = ref("");
    const children = h(resolveComponent("TextField"), {
      label: "Minimum Quantity",
      labelHidden: true,
      modelValue: textFieldValue.value,
      autoComplete: "off",
      "onUpdate:modelValue": (value) => {
        textFieldValue.value = value;
      }
    });
    const choices = [
      { label: "None", value: "none" },
      { label: "Minimum purchase", value: "minimum_purchase" },
      {
        label: "Minimum quantity",
        value: "minimum_quantity",
        renderChildren: children
      }
    ];
    return (_ctx, _cache) => {
      const _component_ChoiceList = resolveComponent("ChoiceList");
      return openBlock(), createBlock(_component_ChoiceList, {
        title: "Discount minimum requirements",
        choices,
        modelValue: selected.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selected.value = $event)
      }, null, 8, ["modelValue"]);
    };
  }
});
export {
  _sfc_main as default
};
