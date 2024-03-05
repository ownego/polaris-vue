import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "InlineLabel",
  setup(__props) {
    const selected = ref("newestUpdate");
    const options = [
      { label: "Newest update", value: "newestUpdate" },
      { label: "Oldest update", value: "oldestUpdate" },
      { label: "Most spent", value: "mostSpent" },
      { label: "Most orders", value: "mostOrders" },
      { label: "Last name A-Z", value: "lastNameAlpha" },
      { label: "Last name Z-A", value: "lastNameReverseAlpha" }
    ];
    return (_ctx, _cache) => {
      const _component_Select = resolveComponent("Select");
      return openBlock(), createBlock(_component_Select, {
        label: "Sort by",
        "label-inline": "",
        options,
        modelValue: selected.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selected.value = $event)
      }, null, 8, ["modelValue"]);
    };
  }
});
export {
  _sfc_main as default
};
