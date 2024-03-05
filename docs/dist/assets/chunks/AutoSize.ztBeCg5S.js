import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AutoSize",
  setup(__props) {
    const value = ref("Ownego");
    return (_ctx, _cache) => {
      const _component_TextField = resolveComponent("TextField");
      return openBlock(), createBlock(_component_TextField, {
        label: "Store name",
        modelValue: value.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => value.value = $event),
        autoComplete: "off",
        autoSize: "",
        suffix: "in: Your stores"
      }, null, 8, ["modelValue"]);
    };
  }
});
export {
  _sfc_main as default
};
