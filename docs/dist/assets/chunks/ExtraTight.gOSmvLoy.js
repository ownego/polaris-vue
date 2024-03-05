import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_ListItem = resolveComponent("ListItem");
  const _component_List = resolveComponent("List");
  return openBlock(), createBlock(_component_List, { gap: "extraTight" }, {
    default: withCtx(() => [
      createVNode(_component_ListItem, null, {
        default: withCtx(() => [
          createTextVNode("Yellow shirt")
        ]),
        _: 1
      }),
      createVNode(_component_ListItem, null, {
        default: withCtx(() => [
          createTextVNode("Red shirt")
        ]),
        _: 1
      }),
      createVNode(_component_ListItem, null, {
        default: withCtx(() => [
          createTextVNode("Green shirt")
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const ExtraTight = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ExtraTight as default
};
