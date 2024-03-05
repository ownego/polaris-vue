import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_ListboxOption = resolveComponent("ListboxOption");
  const _component_ListboxLoading = resolveComponent("ListboxLoading");
  const _component_Listbox = resolveComponent("Listbox");
  return openBlock(), createBlock(_component_Listbox, { accessibilityLabel: "Basic Listbox example" }, {
    default: withCtx(() => [
      createVNode(_component_ListboxOption, { value: "UniqueValue-1" }, {
        default: withCtx(() => [
          createTextVNode("Item 1")
        ]),
        _: 1
      }),
      createVNode(_component_ListboxOption, { value: "UniqueValue-2" }, {
        default: withCtx(() => [
          createTextVNode("Item 2")
        ]),
        _: 1
      }),
      createVNode(_component_ListboxOption, { value: "UniqueValue-3" }, {
        default: withCtx(() => [
          createTextVNode("Item 3")
        ]),
        _: 1
      }),
      createVNode(_component_ListboxLoading, { accessibilityLabel: "Loading" })
    ]),
    _: 1
  });
}
const WithLoading = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  WithLoading as default
};
