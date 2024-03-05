import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Text = resolveComponent("Text");
  const _component_Button = resolveComponent("Button");
  const _component_InlineGrid = resolveComponent("InlineGrid");
  const _component_BlockStack = resolveComponent("BlockStack");
  const _component_Card = resolveComponent("Card");
  return openBlock(), createBlock(_component_Card, { roundedAbove: "sm" }, {
    default: withCtx(() => [
      createVNode(_component_BlockStack, { gap: "200" }, {
        default: withCtx(() => [
          createVNode(_component_InlineGrid, { columns: "1fr auto" }, {
            default: withCtx(() => [
              createVNode(_component_Text, {
                as: "h2",
                variant: "headingSm"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Variants ")
                ]),
                _: 1
              }),
              createVNode(_component_Button, {
                variant: "plain",
                accessibilityLabel: "Add variant",
                onClick: () => {
                }
              }, {
                default: withCtx(() => [
                  createTextVNode(" Add variant ")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_Text, {
            as: "p",
            variant: "bodyMd"
          }, {
            default: withCtx(() => [
              createTextVNode(" Add variants if this product comes in multiple versions, like different sizes or colors. ")
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
const WithHeaderAction = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  WithHeaderAction as default
};
