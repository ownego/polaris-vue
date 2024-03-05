import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ValidationError",
  setup(__props) {
    const selected = ref("");
    return (_ctx, _cache) => {
      const _component_Select = resolveComponent("Select");
      return openBlock(), createBlock(_component_Select, {
        label: "Province",
        options: ["Alberta"],
        modelValue: selected.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selected.value = $event),
        error: "Province is required"
      }, null, 8, ["modelValue"]);
    };
  }
});
export {
  _sfc_main as default
};
