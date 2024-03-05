import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode, F as Fragment, t as toDisplayString, m as createBaseVNode, E as renderList, c as createElementBlock } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AllElement",
  setup(__props) {
    const items = [{ content: "Gross Sales" }, { content: "Net Sales" }];
    const resourceItems = [
      {
        sales: "Orders",
        amount: "USD$0.00",
        url: "#"
      },
      {
        sales: "Returns",
        amount: "-USD$250.00",
        url: "#"
      }
    ];
    const actionActive = ref(false);
    const handleToggleAction = () => {
      actionActive.value = !actionActive.value;
    };
    return (_ctx, _cache) => {
      const _component_Text = resolveComponent("Text");
      const _component_Button = resolveComponent("Button");
      const _component_ActionList = resolveComponent("ActionList");
      const _component_Popover = resolveComponent("Popover");
      const _component_ButtonGroup = resolveComponent("ButtonGroup");
      const _component_InlineGrid = resolveComponent("InlineGrid");
      const _component_BlockStack = resolveComponent("BlockStack");
      const _component_InlineStack = resolveComponent("InlineStack");
      const _component_ResourceItem = resolveComponent("ResourceItem");
      const _component_ResourceList = resolveComponent("ResourceList");
      const _component_ListItem = resolveComponent("ListItem");
      const _component_List = resolveComponent("List");
      const _component_Box = resolveComponent("Box");
      const _component_Bleed = resolveComponent("Bleed");
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
                      createTextVNode(" Sales ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_ButtonGroup, null, {
                    default: withCtx(() => [
                      createVNode(_component_Button, { variant: "plain" }, {
                        default: withCtx(() => [
                          createTextVNode("Total Sales")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Popover, {
                        active: actionActive.value,
                        onClose: handleToggleAction
                      }, {
                        activator: withCtx(() => [
                          createVNode(_component_Button, {
                            variant: "plain",
                            disclosure: "",
                            onClick: handleToggleAction
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" View Sales ")
                            ]),
                            _: 1
                          })
                        ]),
                        default: withCtx(() => [
                          createVNode(_component_ActionList, { items })
                        ]),
                        _: 1
                      }, 8, ["active"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_BlockStack, { gap: "400" }, {
                default: withCtx(() => [
                  createVNode(_component_Text, {
                    as: "p",
                    variant: "bodyMd"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" You can use sales reports to see information about your customers’ orders based on criteria such as sales over time, by channel, or by staff. ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Text, {
                    as: "h3",
                    variant: "headingSm",
                    fontWeight: "medium"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Total Sales Breakdown ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createBaseVNode("div", null, [
                createVNode(_component_ResourceList, {
                  resourceName: { singular: "sale", plural: "sales" },
                  items: resourceItems,
                  "show-header": false
                }, {
                  default: withCtx(() => [
                    (openBlock(), createElementBlock(Fragment, null, renderList(resourceItems, (item) => {
                      return createVNode(_component_ResourceItem, {
                        key: item.sales,
                        id: item.sales,
                        url: item.url,
                        accessibilityLabel: `View Sales for ${item.sales}`
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_InlineStack, { align: "space-between" }, {
                            default: withCtx(() => [
                              createBaseVNode("div", null, toDisplayString(item.sales), 1),
                              createBaseVNode("div", null, toDisplayString(item.amount), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1032, ["id", "url", "accessibilityLabel"]);
                    }), 64))
                  ]),
                  _: 1
                })
              ]),
              createVNode(_component_Bleed, { marginInline: "400" }, {
                default: withCtx(() => [
                  createVNode(_component_Box, {
                    background: "bg-surface-secondary",
                    paddingBlock: "300",
                    paddingInline: "400"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_BlockStack, { gap: "200" }, {
                        default: withCtx(() => [
                          createVNode(_component_Text, {
                            as: "h3",
                            variant: "headingSm",
                            fontWeight: "medium"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Deactivated reports ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_List, null, {
                            default: withCtx(() => [
                              createVNode(_component_ListItem, null, {
                                default: withCtx(() => [
                                  createTextVNode("Payouts")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_ListItem, null, {
                                default: withCtx(() => [
                                  createTextVNode("Total Sales By Channel")
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
              }),
              createVNode(_component_BlockStack, { gap: "200" }, {
                default: withCtx(() => [
                  createVNode(_component_Text, {
                    as: "h3",
                    variant: "headingSm",
                    fontWeight: "medium"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Note ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Text, {
                    as: "p",
                    variant: "bodyMd"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" The sales reports are available only if your store is on the Shopify plan or higher. ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_InlineStack, { align: "end" }, {
                    default: withCtx(() => [
                      createVNode(_component_ButtonGroup, null, {
                        default: withCtx(() => [
                          createVNode(_component_Button, {
                            onClick: () => {
                            },
                            accessibilityLabel: "Dismiss"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Dismiss ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Button, {
                            variant: "primary",
                            onClick: () => {
                            },
                            accessibilityLabel: "Export Report"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Export Report ")
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
