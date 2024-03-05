import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Badge = resolveComponent("Badge");
  const _component_Card = resolveComponent("Card");
  return openBlock(), createBlock(_component_Card, null, {
    default: withCtx(() => [
      createVNode(_component_Badge, {
        progress: "partiallyComplete",
        tone: "warning"
      }, {
        default: withCtx(() => [
          createTextVNode(" Partially fulfilled ")
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const Partially = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Partially as default
};
