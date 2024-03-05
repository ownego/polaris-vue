import "./Preview.vue_vue_type_style_index_0_lang.vIfP4F2u.js";
import { u as useIndexResourceState } from "./useIndexResourceState.STrm8l_N.js";
import { d as defineComponent, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, p as unref, F as Fragment, t as toDisplayString, a as createTextVNode, I as createVNode, K as resolveDynamicComponent, E as renderList, c as createElementBlock, a3 as h } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithStickyScrollBar",
  setup(__props) {
    const orders = [
      {
        id: `0001`,
        name: `Mae Jemison`,
        location: "Truth or Consequences, United States of America",
        items: 20,
        amountSpent: "$24.00",
        channel: "Point of sale",
        paymentStatus: () => h(resolveComponent("Badge"), { progress: "complete" }, () => "Paid"),
        fulfillmentStatus: () => h(resolveComponent("Badge"), { progress: "incomplete" }, () => "Unfulfilled"),
        tags: "No tags applied"
      },
      {
        id: `0002`,
        name: `Jaydon Stanton`,
        location: "Portland, United States of America",
        items: 15,
        amountSpent: "$359.10",
        channel: "Point of sale",
        paymentStatus: () => h(resolveComponent("Badge"), { progress: "partiallyComplete" }, () => "Partially paid"),
        fulfillmentStatus: () => h(resolveComponent("Badge"), { progress: "incomplete" }, () => "Unfulfilled"),
        tags: "No tags applied"
      },
      {
        id: `0003`,
        name: `Leo Cardner`,
        location: "Toronto, Canada",
        items: 3,
        amountSpent: "$15.99",
        channel: "Point of sale",
        paymentStatus: () => h(resolveComponent("Badge"), { progress: "complete" }, () => "Paid"),
        fulfillmentStatus: () => h(resolveComponent("Badge"), { progress: "incomplete" }, () => "Unfulfilled"),
        tags: "No tags applied"
      }
    ];
    const resourceName = {
      singular: "order",
      plural: "orders"
    };
    const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(orders);
    return (_ctx, _cache) => {
      const _component_Text = resolveComponent("Text");
      const _component_IndexTableCell = resolveComponent("IndexTableCell");
      const _component_IndexTableRow = resolveComponent("IndexTableRow");
      const _component_IndexTable = resolveComponent("IndexTable");
      const _component_LegacyCard = resolveComponent("LegacyCard");
      const _component_BlockStack = resolveComponent("BlockStack");
      const _component_Box = resolveComponent("Box");
      return openBlock(), createBlock(_component_Box, { paddingBlockEnd: "400" }, {
        default: withCtx(() => [
          createVNode(_component_BlockStack, { gap: "200" }, {
            default: withCtx(() => [
              createVNode(_component_LegacyCard, null, {
                default: withCtx(() => [
                  createVNode(_component_IndexTable, {
                    resourceName,
                    itemCount: orders.length,
                    selectedItemsCount: unref(allResourcesSelected) ? "All" : unref(selectedResources).length,
                    onSelectionChange: unref(handleSelectionChange),
                    headings: [
                      { title: "Name" },
                      { title: "Location" },
                      {
                        alignment: "end",
                        id: "order-count",
                        title: "Item count"
                      },
                      {
                        alignment: "end",
                        id: "amount-spent",
                        title: "Amount spent"
                      },
                      { title: "Channel" },
                      { title: "Payment status" },
                      { title: "Fulfillment status" },
                      { title: "Tags" }
                    ]
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createElementBlock(Fragment, null, renderList(orders, ({ id, name, location, items, amountSpent, channel, paymentStatus, fulfillmentStatus, tags }, index) => {
                        return createVNode(_component_IndexTableRow, {
                          id,
                          key: id,
                          position: index,
                          selected: unref(selectedResources).includes(id)
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_IndexTableCell, null, {
                              default: withCtx(() => [
                                createVNode(_component_Text, {
                                  fontWeight: "bold",
                                  as: "span"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(name), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_IndexTableCell, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(location), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_IndexTableCell, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(items), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_IndexTableCell, null, {
                              default: withCtx(() => [
                                createVNode(_component_Text, {
                                  as: "span",
                                  alignment: "end",
                                  numeric: ""
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(amountSpent), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_IndexTableCell, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(channel), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_IndexTableCell, null, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(resolveDynamicComponent(paymentStatus)))
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_IndexTableCell, null, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(resolveDynamicComponent(fulfillmentStatus)))
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_IndexTableCell, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(tags), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1032, ["id", "position", "selected"]);
                      }), 64))
                    ]),
                    _: 1
                  }, 8, ["itemCount", "selectedItemsCount", "onSelectionChange"])
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
