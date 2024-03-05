import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Text = resolveComponent("Text");
  const _component_LegacyStack = resolveComponent("LegacyStack");
  return openBlock(), createBlock(_component_LegacyStack, { vertical: "" }, {
    default: withCtx(() => [
      createVNode(_component_Text, {
        as: "p",
        tone: "subdued"
      }, {
        default: withCtx(() => [
          createTextVNode(" Use to de-emphasize a piece of text that is less important to merchants than other nearby text. May also be used to indicate when normal content is absent, for example, “No supplier listed”. Don’t use only for aesthetic effect. ")
        ]),
        _: 1
      }),
      createVNode(_component_Text, {
        as: "p",
        tone: "success"
      }, {
        default: withCtx(() => [
          createTextVNode(" Use in combination with a symbol showing an increasing value to indicate an upward trend. ")
        ]),
        _: 1
      }),
      createVNode(_component_Text, {
        as: "p",
        tone: "caution"
      }, {
        default: withCtx(() => [
          createTextVNode(" Use to denote something that needs attention, or that merchants need to take action on. ")
        ]),
        _: 1
      }),
      createVNode(_component_Text, {
        as: "p",
        tone: "critical"
      }, {
        default: withCtx(() => [
          createTextVNode(" Use in combination with a symbol showing a decreasing value to indicate a downward trend. ")
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const Tone = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Tone as default
};
