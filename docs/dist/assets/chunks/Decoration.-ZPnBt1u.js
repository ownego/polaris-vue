import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Text = resolveComponent("Text");
  const _component_LegacyStack = resolveComponent("LegacyStack");
  return openBlock(), createBlock(_component_LegacyStack, { vertical: "" }, {
    default: withCtx(() => [
      createVNode(_component_Text, {
        as: "p",
        textDecorationLine: "line-through"
      }, {
        default: withCtx(() => [
          createTextVNode(" $100.00 ")
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const Decoration = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Decoration as default
};
