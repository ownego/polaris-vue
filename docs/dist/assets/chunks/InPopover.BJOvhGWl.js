import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode, w as withCtx, a as createTextVNode } from "./framework.1qnja6qJ.js";
const _hoisted_1 = { style: { "height": "275px" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "InPopover",
  setup(__props) {
    const popoverActive = ref(true);
    const selected = ref([]);
    const options = [
      {
        value: "byward_market",
        label: "Byward Market",
        active: true
      },
      { value: "centretown", label: "Centretown" },
      {
        value: "hintonburg",
        label: "Hintonburg",
        active: true
      },
      { value: "westboro", label: "Westboro" },
      { value: "downtown", label: "Downtown" }
    ];
    const handleSelect = (value) => {
      console.log(value);
      selected.value = value;
    };
    const togglePopoverActive = () => {
      popoverActive.value = !popoverActive.value;
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_OptionList = resolveComponent("OptionList");
      const _component_Popover = resolveComponent("Popover");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_Popover, {
          active: popoverActive.value,
          onClose: togglePopoverActive
        }, {
          activator: withCtx(() => [
            createVNode(_component_Button, {
              onClick: togglePopoverActive,
              disclosure: ""
            }, {
              default: withCtx(() => [
                createTextVNode(" Options ")
              ]),
              _: 1
            })
          ]),
          default: withCtx(() => [
            createVNode(_component_OptionList, {
              title: "Inventory Location",
              options,
              selected: selected.value,
              onChange: handleSelect
            }, null, 8, ["selected"])
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
