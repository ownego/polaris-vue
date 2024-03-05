import { d as defineComponent, a3 as h, D as resolveComponent, h as ref, o as openBlock, c as createElementBlock, I as createVNode, w as withCtx, a as createTextVNode } from "./framework.1qnja6qJ.js";
const _hoisted_1 = { style: { height: "150px" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ExtraSmall",
  setup(__props) {
    const actionItems = [
      {
        customer: true,
        content: "Chet Baker",
        prefix: h(resolveComponent("Avatar"), { customer: true, size: "xs", name: "Chet Baker" })
      },
      {
        customer: true,
        content: "Farrah Fawcett",
        prefix: h(resolveComponent("Avatar"), { customer: true, size: "xs", name: "Chet Baker" })
      }
    ];
    const active = ref(true);
    const toggleActive = () => {
      active.value = !active.value;
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_ActionList = resolveComponent("ActionList");
      const _component_Popover = resolveComponent("Popover");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_Popover, {
          active: active.value,
          onClose: toggleActive
        }, {
          activator: withCtx(() => [
            createVNode(_component_Button, {
              onClick: toggleActive,
              disclosure: ""
            }, {
              default: withCtx(() => [
                createTextVNode(" Manage staff ")
              ]),
              _: 1
            })
          ]),
          default: withCtx(() => [
            createVNode(_component_ActionList, { items: actionItems })
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
