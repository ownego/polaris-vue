import "./Preview.vue_vue_type_style_index_0_lang.vIfP4F2u.js";
import { u as useIndexResourceState } from "./useIndexResourceState.STrm8l_N.js";
import { d as defineComponent, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode, w as withCtx, p as unref, F as Fragment, t as toDisplayString, a as createTextVNode, K as resolveDynamicComponent, b as createBlock, E as renderList, a3 as h } from "./framework.1qnja6qJ.js";
const _hoisted_1 = { style: { width: "500px" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithStickyLastColumn",
  setup(__props) {
    const orders = [
      {
        id: "1020",
        order: "#1020",
        date: "Jul 20 at 4:34pm",
        customer: "Jaydon Stanton",
        total: "$969.44",
        paymentStatus: () => h(resolveComponent("Badge"), { progress: "complete" }, () => "Paid"),
        fulfillmentStatus: () => h(resolveComponent("Badge"), { progress: "incomplete" }, () => "Unfulfilled")
      },
      {
        id: "1019",
        order: "#1019",
        date: "Jul 20 at 3:46pm",
        customer: "Ruben Westerfelt",
        total: "$701.19",
        paymentStatus: () => h(resolveComponent("Badge"), { progress: "partiallyComplete" }, () => "Partially paid"),
        fulfillmentStatus: () => h(resolveComponent("Badge"), { progress: "incomplete" }, () => "Unfulfilled")
      },
      {
        id: "1018",
        order: "#1018",
        date: "Jul 20 at 3.44pm",
        customer: "Leo Carder",
        total: "$798.24",
        paymentStatus: () => h(resolveComponent("Badge"), { progress: "complete" }, () => "Paid"),
        fulfillmentStatus: () => h(resolveComponent("Badge"), { progress: "incomplete" }, () => "Unfulfilled")
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
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_LegacyCard, null, {
          default: withCtx(() => [
            createVNode(_component_IndexTable, {
              lastColumnSticky: "",
              resourceName,
              itemCount: orders.length,
              selectedItemsCount: unref(allResourcesSelected) ? "All" : unref(selectedResources).length,
              onSelectionChange: unref(handleSelectionChange),
              headings: [
                { title: "Order" },
                { title: "Date" },
                { title: "Customer" },
                { title: "Total", alignment: "end" },
                { title: "Payment status" },
                { title: "Fulfillment status" }
              ]
            }, {
              default: withCtx(() => [
                (openBlock(), createElementBlock(Fragment, null, renderList(orders, ({ id, order, date, customer, total, paymentStatus, fulfillmentStatus }, index) => {
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
                            variant: "bodyMd",
                            fontWeight: "bold",
                            as: "span"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(order), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(_component_IndexTableCell, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(date), 1)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(_component_IndexTableCell, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(customer), 1)
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
                              createTextVNode(toDisplayString(total), 1)
                            ]),
                            _: 2
                          }, 1024)
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
      ]);
    };
  }
});
export {
  _sfc_main as default
};
