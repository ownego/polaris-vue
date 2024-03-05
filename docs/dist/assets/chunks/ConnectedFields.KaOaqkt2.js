import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode, a as createTextVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ConnectedFields",
  setup(__props) {
    const textFieldValue = ref("10.6");
    const selectValue = ref("kg");
    return (_ctx, _cache) => {
      const _component_Select = resolveComponent("Select");
      const _component_Button = resolveComponent("Button");
      const _component_TextField = resolveComponent("TextField");
      return openBlock(), createBlock(_component_TextField, {
        label: "Weight",
        type: "number",
        modelValue: textFieldValue.value,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => textFieldValue.value = $event),
        autoComplete: "off"
      }, {
        connectedLeft: withCtx(() => [
          createVNode(_component_Select, {
            modelValue: selectValue.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectValue.value = $event),
            label: "Weight unit",
            "label-hidden": "",
            options: ["kg", "lb"]
          }, null, 8, ["modelValue"])
        ]),
        connectedRight: withCtx(() => [
          createVNode(_component_Button, null, {
            default: withCtx(() => [
              createTextVNode("Submit")
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"]);
    };
  }
});
export {
  _sfc_main as default
};
