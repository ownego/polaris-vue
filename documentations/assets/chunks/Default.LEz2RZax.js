import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Default",
  setup(__props) {
    const selected = ref("today");
    const options = [
      { label: "Today", value: "today" },
      { label: "Yesterday", value: "yesterday" },
      { label: "Last 7 days", value: "lastWeek" }
    ];
    return (_ctx, _cache) => {
      const _component_Select = resolveComponent("Select");
      return openBlock(), createBlock(_component_Select, {
        label: "Date range",
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
