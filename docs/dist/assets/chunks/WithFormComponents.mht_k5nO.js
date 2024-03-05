import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode, w as withCtx, a as createTextVNode } from "./framework.2IsXxFXf.js";
const _hoisted_1 = { style: { "height": "250px" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithFormComponents",
  setup(__props) {
    const popoverActive = ref(true);
    const selectOptions = ["Tagged with"];
    const inputVal = ref("");
    const togglePopoverActive = () => {
      popoverActive.value = !popoverActive.value;
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Select = resolveComponent("Select");
      const _component_TextField = resolveComponent("TextField");
      const _component_FormLayout = resolveComponent("FormLayout");
      const _component_Popover = resolveComponent("Popover");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_Popover, {
          sectioned: "",
          active: popoverActive.value,
          autofocusTarget: "first-node",
          onClose: togglePopoverActive
        }, {
          activator: withCtx(() => [
            createVNode(_component_Button, {
              onClick: togglePopoverActive,
              disclosure: ""
            }, {
              default: withCtx(() => [
                createTextVNode("Filter")
              ]),
              _: 1
            })
          ]),
          default: withCtx(() => [
            createVNode(_component_FormLayout, null, {
              default: withCtx(() => [
                createVNode(_component_Select, {
                  label: "Show all customers where:",
                  options: selectOptions
                }),
                createVNode(_component_TextField, {
                  label: "Tags",
                  modelValue: inputVal.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => inputVal.value = $event),
                  autoComplete: "off"
                }, null, 8, ["modelValue"]),
                createVNode(_component_Button, { size: "slim" }, {
                  default: withCtx(() => [
                    createTextVNode("Add filter")
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["active"])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
