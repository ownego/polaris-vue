import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Text = resolveComponent("Text");
  const _component_Divider = resolveComponent("Divider");
  const _component_BlockStack = resolveComponent("BlockStack");
  const _component_Card = resolveComponent("Card");
  return openBlock(), createBlock(_component_Card, null, {
    default: withCtx(() => [
      createVNode(_component_BlockStack, { gap: "500" }, {
        default: withCtx(() => [
          createVNode(_component_Text, {
            as: "h1",
            variant: "headingSm"
          }, {
            default: withCtx(() => [
              createTextVNode(" Default ")
            ]),
            _: 1
          }),
          createVNode(_component_Divider),
          createVNode(_component_Text, {
            as: "h1",
            variant: "headingSm"
          }, {
            default: withCtx(() => [
              createTextVNode(" Border ")
            ]),
            _: 1
          }),
          createVNode(_component_Divider, { borderColor: "border" }),
          createVNode(_component_Text, {
            as: "h1",
            variant: "headingSm"
          }, {
            default: withCtx(() => [
              createTextVNode(" Border inverse ")
            ]),
            _: 1
          }),
          createVNode(_component_Divider, { borderColor: "border-inverse" }),
          createVNode(_component_Text, {
            as: "h1",
            variant: "headingSm"
          }, {
            default: withCtx(() => [
              createTextVNode(" Transparent ")
            ]),
            _: 1
          }),
          createVNode(_component_Divider, { borderColor: "transparent" })
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
