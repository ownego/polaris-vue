import { d as defineComponent, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode, F as Fragment, t as toDisplayString, E as renderList, c as createElementBlock } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LegacyCardWithAllElements",
  setup(__props) {
    const items = [
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
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_ActionList = resolveComponent("ActionList");
      const _component_Popover = resolveComponent("Popover");
      const _component_LegacyCardHeader = resolveComponent("LegacyCardHeader");
      const _component_TextContainer = resolveComponent("TextContainer");
      const _component_LegacyCardSection = resolveComponent("LegacyCardSection");
      const _component_LegacyStackItem = resolveComponent("LegacyStackItem");
      const _component_LegacyStack = resolveComponent("LegacyStack");
      const _component_ResourceItem = resolveComponent("ResourceItem");
      const _component_ResourceList = resolveComponent("ResourceList");
      const _component_ListItem = resolveComponent("ListItem");
      const _component_List = resolveComponent("List");
      const _component_LegacyCard = resolveComponent("LegacyCard");
      return openBlock(), createBlock(_component_LegacyCard, {
        secondaryFooterActions: [{ content: "Dismiss" }],
        primaryFooterAction: { content: "Export Report" }
      }, {
        default: withCtx(() => [
          createVNode(_component_LegacyCardHeader, {
            title: "Sales",
            actions: [{ content: "Total Sales" }]
          }, {
            default: withCtx(() => [
              createVNode(_component_Popover, {
                active: false,
                onClose: () => {
                }
              }, {
                activator: withCtx(() => [
                  createVNode(_component_Button, {
                    disclosure: "",
                    variant: "plain"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" View Sales ")
                    ]),
                    _: 1
                  })
                ]),
                default: withCtx(() => [
                  createVNode(_component_ActionList, { items: [{ content: "Gross Sales" }, { content: "Net Sales" }] })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_LegacyCardSection, null, {
            default: withCtx(() => [
              createVNode(_component_TextContainer, null, {
                default: withCtx(() => [
                  createTextVNode(" You can use sales reports to see information about your customers’ orders based on criteria such as sales over time, by channel, or by staff. ")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_LegacyCardSection, { title: "Total Sales Breakdown" }, {
            default: withCtx(() => [
              createVNode(_component_ResourceList, {
                resourceName: { singular: "sale", plural: "sales" },
                items
              }, {
                default: withCtx(() => [
                  (openBlock(), createElementBlock(Fragment, null, renderList(items, ({ sales, amount, url }) => {
                    return createVNode(_component_ResourceItem, {
                      key: sales,
                      id: sales.toLocaleLowerCase(),
                      url,
                      accessibilityLabel: "View Sales for ${sales}",
                      onClick: () => console.log("clicked item", sales)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_LegacyStack, null, {
                          default: withCtx(() => [
                            createVNode(_component_LegacyStackItem, { fill: "" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(sales), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_LegacyStackItem, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(amount), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1032, ["id", "url", "onClick"]);
                  }), 64))
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_LegacyCardSection, {
            title: "Deactivated reports",
            subdued: ""
          }, {
            default: withCtx(() => [
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
          }),
          createVNode(_component_LegacyCardSection, { title: "Note" }, {
            default: withCtx(() => [
              createVNode(_component_TextContainer, null, {
                default: withCtx(() => [
                  createTextVNode(" The sales reports are available only if your store is on the Shopify plan or higher. ")
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
