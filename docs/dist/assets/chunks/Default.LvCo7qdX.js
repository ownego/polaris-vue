import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Default",
  setup(__props) {
    const selected = ref(["hidden"]);
    return (_ctx, _cache) => {
      const _component_ChoiceList = resolveComponent("ChoiceList");
      return openBlock(), createBlock(_component_ChoiceList, {
        title: "Company name",
        choices: [
          { label: "Hidden", value: "hidden" },
          { label: "Optional", value: "optional" },
          { label: "Required", value: "required" }
        ],
        modelValue: selected.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selected.value = $event)
      }, null, 8, ["modelValue"]);
    };
  }
});
export {
  _sfc_main as default
};
