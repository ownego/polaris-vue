import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode, m as createBaseVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("div", null, "Item 1", -1);
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", null, "Item 2", -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("div", null, "Item 3", -1);
function _sfc_render(_ctx, _cache) {
  const _component_ListboxAction = resolveComponent("ListboxAction");
  const _component_ListboxOption = resolveComponent("ListboxOption");
  const _component_ListboxLoading = resolveComponent("ListboxLoading");
  const _component_Listbox = resolveComponent("Listbox");
  return openBlock(), createBlock(_component_Listbox, { accessibilityLabel: "Listbox with custom element example" }, {
    default: withCtx(() => [
      createVNode(_component_ListboxAction, {
        value: "ActionValue",
        divider: ""
      }, {
        default: withCtx(() => [
          createTextVNode(" Add item ")
        ]),
        _: 1
      }),
      createVNode(_component_ListboxOption, { value: "UniqueValue-1" }, {
        default: withCtx(() => [
          _hoisted_1
        ]),
        _: 1
      }),
      createVNode(_component_ListboxOption, { value: "UniqueValue-2" }, {
        default: withCtx(() => [
          _hoisted_2
        ]),
        _: 1
      }),
      createVNode(_component_ListboxOption, { value: "UniqueValue-3" }, {
        default: withCtx(() => [
          _hoisted_3
        ]),
        _: 1
      }),
      createVNode(_component_ListboxLoading, { accessibilityLabel: "items are loading" })
    ]),
    _: 1
  });
}
const WithCustomElement = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  WithCustomElement as default
};
