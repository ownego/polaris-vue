import { d as defineComponent, h as ref, a3 as h, D as resolveComponent, k as computed, o as openBlock, c as createElementBlock, I as createVNode } from "./framework.1qnja6qJ.js";
const _hoisted_1 = { style: { height: "150px" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DynamicChildrenContent",
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
    const choices = computed(() => [
      { label: "None", value: "none" },
      { label: "Minimum purchase", value: "minimum_purchase" },
      {
        label: "Minimum quantity",
        value: "minimum_quantity",
        renderChildren: selected.value.includes("minimum_quantity") && children
      }
    ]);
    return (_ctx, _cache) => {
      const _component_ChoiceList = resolveComponent("ChoiceList");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_ChoiceList, {
          title: "Discount minimum requirements",
          choices: choices.value,
          modelValue: selected.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selected.value = $event)
        }, null, 8, ["choices", "modelValue"])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
