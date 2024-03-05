import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithMultipleFooterAction",
  setup(__props) {
    const items = [
      { content: "Cancel shipment", destructive: true },
      { content: "Add another shipment", disabled: true }
    ];
    const actionActive = ref(false);
    const handleToggleAction = () => {
      actionActive.value = !actionActive.value;
    };
    return (_ctx, _cache) => {
      const _component_Text = resolveComponent("Text");
      const _component_ListItem = resolveComponent("ListItem");
      const _component_List = resolveComponent("List");
      const _component_BlockStack = resolveComponent("BlockStack");
      const _component_ActionList = resolveComponent("ActionList");
      const _component_Button = resolveComponent("Button");
      const _component_Popover = resolveComponent("Popover");
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
                      createVNode(_component_Popover, {
                        active: actionActive.value,
                        onClose: handleToggleAction
                      }, {
                        activator: withCtx(() => [
                          createVNode(_component_Button, {
                            disclosure: "",
                            accessibilityLabel: "More",
                            onClick: handleToggleAction
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" More ")
                            ]),
                            _: 1
                          })
                        ]),
                        default: withCtx(() => [
                          createVNode(_component_ActionList, { items })
                        ]),
                        _: 1
                      }, 8, ["active"]),
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
    };
  }
});
export {
  _sfc_main as default
};
