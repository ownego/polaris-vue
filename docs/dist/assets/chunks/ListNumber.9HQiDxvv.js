import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_ListItem = resolveComponent("ListItem");
  const _component_List = resolveComponent("List");
  return openBlock(), createBlock(_component_List, { type: "number" }, {
    default: withCtx(() => [
      createVNode(_component_ListItem, null, {
        default: withCtx(() => [
          createTextVNode("First item")
        ]),
        _: 1
      }),
      createVNode(_component_ListItem, null, {
        default: withCtx(() => [
          createTextVNode("Second item")
        ]),
        _: 1
      }),
      createVNode(_component_ListItem, null, {
        default: withCtx(() => [
          createTextVNode("Third Item")
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const ListNumber = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ListNumber as default
};
