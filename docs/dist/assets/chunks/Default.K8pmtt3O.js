import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Badge = resolveComponent("Badge");
  const _component_LegacyStack = resolveComponent("LegacyStack");
  return openBlock(), createBlock(_component_LegacyStack, null, {
    default: withCtx(() => [
      createVNode(_component_Badge, null, {
        default: withCtx(() => [
          createTextVNode("Paid")
        ]),
        _: 1
      }),
      createVNode(_component_Badge, null, {
        default: withCtx(() => [
          createTextVNode("Processing")
        ]),
        _: 1
      }),
      createVNode(_component_Badge, null, {
        default: withCtx(() => [
          createTextVNode("Fulfilled")
        ]),
        _: 1
      }),
      createVNode(_component_Badge, null, {
        default: withCtx(() => [
          createTextVNode("Completed")
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const Default = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Default as default
};
