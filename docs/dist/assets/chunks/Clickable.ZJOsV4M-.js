import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Tag = resolveComponent("Tag");
  const _component_Card = resolveComponent("Card");
  return openBlock(), createBlock(_component_Card, null, {
    default: withCtx(() => [
      createVNode(_component_Tag, {
        onClick: _cache[0] || (_cache[0] = () => console.log("Clicked"))
      }, {
        default: withCtx(() => [
          createTextVNode("Wholesale")
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const Clickable = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Clickable as default
};
