import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode, m as createBaseVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("br", null, null, -1);
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("br", null, null, -1);
function _sfc_render(_ctx, _cache) {
  const _component_Text = resolveComponent("Text");
  const _component_Badge = resolveComponent("Badge");
  const _component_LegacyStack = resolveComponent("LegacyStack");
  return openBlock(), createBlock(_component_LegacyStack, { alignment: "center" }, {
    default: withCtx(() => [
      createVNode(_component_Text, {
        variant: "headingMd",
        as: "h2"
      }, {
        default: withCtx(() => [
          createTextVNode(" Order "),
          _hoisted_1,
          createTextVNode(" #1136 "),
          _hoisted_2,
          createTextVNode(" was paid ")
        ]),
        _: 1
      }),
      createVNode(_component_Badge, null, {
        default: withCtx(() => [
          createTextVNode("Paid")
        ]),
        _: 1
      }),
      createVNode(_component_Badge, null, {
        default: withCtx(() => [
          createTextVNode("Fulfilled")
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const VerticalCenter = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  VerticalCenter as default
};
