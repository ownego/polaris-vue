import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode, a as createTextVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Default",
  setup(__props) {
    const value = ref("disabled");
    return (_ctx, _cache) => {
      const _component_RadioButton = resolveComponent("RadioButton");
      const _component_LegacyStack = resolveComponent("LegacyStack");
      return openBlock(), createBlock(_component_LegacyStack, { vertical: "" }, {
        default: withCtx(() => [
          createVNode(_component_RadioButton, {
            name: "accounts",
            value: "disabled",
            modelValue: value.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => value.value = $event),
            label: "Accounts are disabled",
            helpText: "Customers will only be able to check out as guests."
          }, null, 8, ["modelValue"]),
          createVNode(_component_RadioButton, {
            name: "accounts",
            value: "optional",
            modelValue: value.value,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => value.value = $event)
          }, {
            label: withCtx(() => [
              createTextVNode("Accounts are optional")
            ]),
            helpText: withCtx(() => [
              createTextVNode("Customers will be able to check out with a customer account or as a guest.")
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
