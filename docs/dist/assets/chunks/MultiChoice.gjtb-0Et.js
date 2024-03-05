import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MultiChoice",
  setup(__props) {
    const selected = ref(["shipping"]);
    const choices = [
      {
        label: "Use the shipping address as the billing address by default",
        value: "shipping",
        helpText: "Reduces the number of fields required to check out. The billing address can still be edited."
      },
      {
        label: "Require a confirmation step",
        value: "confirmation",
        helpText: "Customers must review their order details before purchasing."
      }
    ];
    return (_ctx, _cache) => {
      const _component_ChoiceList = resolveComponent("ChoiceList");
      return openBlock(), createBlock(_component_ChoiceList, {
        allowMultiple: "",
        title: "While the customer is checking out",
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
