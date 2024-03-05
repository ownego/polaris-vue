import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "HelpText",
  setup(__props) {
    const textFieldValue = ref("contact@teeinblue.com");
    return (_ctx, _cache) => {
      const _component_TextField = resolveComponent("TextField");
      return openBlock(), createBlock(_component_TextField, {
        label: "Account email",
        type: "email",
        modelValue: textFieldValue.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => textFieldValue.value = $event),
        helpText: "We'll use this address if we need to contact you about your account.",
        autoComplete: "email"
      }, null, 8, ["modelValue"]);
    };
  }
});
export {
  _sfc_main as default
};
