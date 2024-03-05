import { P as PlusCircleIcon } from "./PlusCircleIcon.lacase-5.js";
import { d as defineComponent, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode, p as unref, m as createBaseVNode } from "./framework.2IsXxFXf.js";
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("div", null, "Add item", -1);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithAction",
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_ListboxOption = resolveComponent("ListboxOption");
      const _component_Icon = resolveComponent("Icon");
      const _component_LegacyStack = resolveComponent("LegacyStack");
      const _component_ListboxAction = resolveComponent("ListboxAction");
      const _component_Listbox = resolveComponent("Listbox");
      return openBlock(), createBlock(_component_Listbox, { accessibilityLabel: "Listbox with Action example" }, {
        default: withCtx(() => [
          createVNode(_component_ListboxOption, { value: "UniqueValue-1" }, {
            default: withCtx(() => [
              createTextVNode("Item 1")
            ]),
            _: 1
          }),
          createVNode(_component_ListboxOption, {
            value: "UniqueValue-2",
            divider: ""
          }, {
            default: withCtx(() => [
              createTextVNode(" Item 2 ")
            ]),
            _: 1
          }),
          createVNode(_component_ListboxAction, { value: "ActionValue" }, {
            default: withCtx(() => [
              createVNode(_component_LegacyStack, { spacing: "tight" }, {
                default: withCtx(() => [
                  createVNode(_component_Icon, {
                    source: unref(PlusCircleIcon),
                    tone: "base"
                  }, null, 8, ["source"]),
                  _hoisted_1
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
