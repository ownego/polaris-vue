import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode, w as withCtx, a as createTextVNode } from "./framework.1qnja6qJ.js";
const _hoisted_1 = { style: { "height": "250px" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithActionList",
  setup(__props) {
    const popoverActive = ref(true);
    const actionListItem = [{ content: "Import" }, { content: "Export" }];
    const togglePopoverActive = () => {
      popoverActive.value = !popoverActive.value;
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_ActionList = resolveComponent("ActionList");
      const _component_Popover = resolveComponent("Popover");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_Popover, {
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
                createTextVNode("More actions")
              ]),
              _: 1
            })
          ]),
          default: withCtx(() => [
            createVNode(_component_ActionList, {
              actionRole: "menuitem",
              items: actionListItem
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
