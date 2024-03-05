import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode, m as createBaseVNode, t as toDisplayString, F as Fragment } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Default",
  setup(__props) {
    const value = ref("Teeinblue");
    return (_ctx, _cache) => {
      const _component_TextField = resolveComponent("TextField");
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_component_TextField, {
          label: "Store name",
          modelValue: value.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => value.value = $event),
          autoComplete: "off"
        }, null, 8, ["modelValue"]),
        createBaseVNode("p", null, "Value: " + toDisplayString(value.value), 1)
      ], 64);
    };
  }
});
export {
  _sfc_main as default
};
