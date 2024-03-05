import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Text = resolveComponent("Text");
  const _component_Box = resolveComponent("Box");
  const _component_Card = resolveComponent("Card");
  return openBlock(), createBlock(_component_Card, { roundedAbove: "sm" }, {
    default: withCtx(() => [
      createVNode(_component_Text, {
        as: "h2",
        variant: "headingSm"
      }, {
        default: withCtx(() => [
          createTextVNode(" Online store dashboard ")
        ]),
        _: 1
      }),
      createVNode(_component_Box, { paddingBlockStart: "200" }, {
        default: withCtx(() => [
          createVNode(_component_Text, {
            as: "p",
            variant: "bodyMd"
          }, {
            default: withCtx(() => [
              createTextVNode(" View a summary of your online store's performance. ")
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const WithSection = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  WithSection as default
};
