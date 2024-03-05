import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Text = resolveComponent("Text");
  const _component_BlockStack = resolveComponent("BlockStack");
  const _component_Button = resolveComponent("Button");
  const _component_ButtonGroup = resolveComponent("ButtonGroup");
  const _component_InlineStack = resolveComponent("InlineStack");
  const _component_Card = resolveComponent("Card");
  return openBlock(), createBlock(_component_Card, { roundedAbove: "sm" }, {
    default: withCtx(() => [
      createVNode(_component_BlockStack, { gap: "500" }, {
        default: withCtx(() => [
          createVNode(_component_BlockStack, { gap: "200" }, {
            default: withCtx(() => [
              createVNode(_component_Text, {
                as: "h2",
                variant: "headingSm"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Secure your account with 2-step authentication ")
                ]),
                _: 1
              }),
              createVNode(_component_Text, {
                as: "p",
                variant: "bodyMd"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Two-step authentication adds an extra layer of security when logging in to your account. A special code will be required each time you log in, ensuring only you can access your account. ")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_InlineStack, { align: "end" }, {
            default: withCtx(() => [
              createVNode(_component_ButtonGroup, null, {
                default: withCtx(() => [
                  createVNode(_component_Button, {
                    accessibilityLabel: "Enable two-step authentication",
                    onClick: () => {
                    }
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Enable two-step authentication ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Button, { variant: "plain" }, {
                    default: withCtx(() => [
                      createTextVNode("Learn more")
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
      })
    ]),
    _: 1
  });
}
const WithCustomFooterAction = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  WithCustomFooterAction as default
};
