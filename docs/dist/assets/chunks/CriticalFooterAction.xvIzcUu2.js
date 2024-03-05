import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Text = resolveComponent("Text");
  const _component_ListItem = resolveComponent("ListItem");
  const _component_List = resolveComponent("List");
  const _component_BlockStack = resolveComponent("BlockStack");
  const _component_Button = resolveComponent("Button");
  const _component_ButtonGroup = resolveComponent("ButtonGroup");
  const _component_InlineStack = resolveComponent("InlineStack");
  const _component_Card = resolveComponent("Card");
  return openBlock(), createBlock(_component_Card, { roundedAbove: "sm" }, {
    default: withCtx(() => [
      createVNode(_component_BlockStack, { gap: "200" }, {
        default: withCtx(() => [
          createVNode(_component_Text, {
            as: "h2",
            variant: "headingSm"
          }, {
            default: withCtx(() => [
              createTextVNode(" Shipment 1234 ")
            ]),
            _: 1
          }),
          createVNode(_component_BlockStack, { gap: "200" }, {
            default: withCtx(() => [
              createVNode(_component_Text, {
                as: "h3",
                variant: "headingSm",
                fontWeight: "medium"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Items ")
                ]),
                _: 1
              }),
              createVNode(_component_List, null, {
                default: withCtx(() => [
                  createVNode(_component_ListItem, null, {
                    default: withCtx(() => [
                      createTextVNode("1 × Oasis Glass, 4-Pack")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_ListItem, null, {
                    default: withCtx(() => [
                      createTextVNode("1 × Anubis Cup, 2-Pack")
                    ]),
                    _: 1
                  })
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
                    variant: "primary",
                    tone: "critical",
                    accessibilityLabel: "Cancel shipment",
                    onClick: () => {
                    }
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Cancel shipment ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Button, {
                    variant: "primary",
                    accessibilityLabel: "Add tracking number",
                    onClick: () => {
                    }
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Add tracking number ")
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
const CriticalFooterAction = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  CriticalFooterAction as default
};
