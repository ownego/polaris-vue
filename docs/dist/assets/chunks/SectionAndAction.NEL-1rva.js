import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Text = resolveComponent("Text");
  const _component_BlockStack = resolveComponent("BlockStack");
  const _component_Button = resolveComponent("Button");
  const _component_InlineGrid = resolveComponent("InlineGrid");
  const _component_Card = resolveComponent("Card");
  return openBlock(), createBlock(_component_Card, { roundedAbove: "sm" }, {
    default: withCtx(() => [
      createVNode(_component_BlockStack, { gap: "400" }, {
        default: withCtx(() => [
          createVNode(_component_BlockStack, { gap: "200" }, {
            default: withCtx(() => [
              createVNode(_component_Text, {
                as: "h2",
                variant: "headingSm"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Customer ")
                ]),
                _: 1
              }),
              createVNode(_component_Text, {
                as: "p",
                variant: "bodyMd"
              }, {
                default: withCtx(() => [
                  createTextVNode(" John Smith ")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_BlockStack, { gap: "200" }, {
            default: withCtx(() => [
              createVNode(_component_InlineGrid, { columns: "1fr auto" }, {
                default: withCtx(() => [
                  createVNode(_component_Text, {
                    as: "h3",
                    variant: "headingSm",
                    fontWeight: "medium"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Contact Information ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Button, {
                    variant: "plain",
                    onClick: () => {
                    },
                    accessibilityLabel: "Edit"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Edit ")
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
                  createTextVNode(" john.smith@example.com ")
                ]),
                _: 1
              })
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
const SectionAndAction = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  SectionAndAction as default
};
