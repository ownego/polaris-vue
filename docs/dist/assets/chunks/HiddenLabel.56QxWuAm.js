import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "HiddenLabel",
  setup(__props) {
    const choices = [
      { label: "Gift cards never expire", value: "no" },
      { label: "Gift cards expire", value: "yes" }
    ];
    const options = ["months after purchase"];
    const value = ref("12");
    const selected = ref(["yes"]);
    return (_ctx, _cache) => {
      const _component_ChoiceList = resolveComponent("ChoiceList");
      const _component_Select = resolveComponent("Select");
      const _component_TextField = resolveComponent("TextField");
      const _component_FormLayout = resolveComponent("FormLayout");
      return openBlock(), createBlock(_component_FormLayout, null, {
        default: withCtx(() => [
          createVNode(_component_ChoiceList, {
            title: "Gift card auto-expiration",
            choices,
            modelValue: selected.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selected.value = $event)
          }, null, 8, ["modelValue"]),
          createVNode(_component_TextField, {
            label: "Gift cards expire after",
            type: "number",
            "label-hidden": "",
            modelValue: value.value,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => value.value = $event),
            disabled: selected.value.includes("no"),
            autoComplete: "off"
          }, {
            connectedRight: withCtx(() => [
              createVNode(_component_Select, {
                label: "Unit of time",
                "label-hidden": "",
                options
              })
            ]),
            _: 1
          }, 8, ["modelValue", "disabled"])
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
