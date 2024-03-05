import { u as useBreakpoints } from "./Preview.vue_vue_type_style_index_0_lang.w_jMciSf.js";
import { u as useIndexResourceState } from "./useIndexResourceState.7iLFTXn6.js";
import { d as defineComponent, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, p as unref, F as Fragment, t as toDisplayString, a as createTextVNode, I as createVNode, E as renderList, c as createElementBlock } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithSelectionNoBulkActions",
  setup(__props) {
    const breakpoints = useBreakpoints();
    const { smDown } = breakpoints.value;
    const customers = [
      {
        id: "3410",
        url: "#",
        name: "Mae Jemison",
        location: "Decatur, USA",
        orders: 20,
        amountSpent: "$2,400"
      },
      {
        id: "3411",
        url: "#",
        name: "Joe Jemison",
        location: "Sydney, AU",
        orders: 20,
        amountSpent: "$1,400"
      },
      {
        id: "3412",
        url: "#",
        name: "Sam Jemison",
        location: "Decatur, USA",
        orders: 20,
        amountSpent: "$400"
      },
      {
        id: "3413",
        url: "#",
        name: "Mae Jemison",
        location: "Decatur, USA",
        orders: 20,
        amountSpent: "$4,300"
      },
      {
        id: "2563",
        url: "#",
        name: "Ellen Ochoa",
        location: "Los Angeles, USA",
        orders: 30,
        amountSpent: "$140"
      }
    ];
    const resourceName = {
      singular: "customer",
      plural: "customers"
    };
    const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(customers);
    return (_ctx, _cache) => {
      const _component_Text = resolveComponent("Text");
      const _component_IndexTableCell = resolveComponent("IndexTableCell");
      const _component_IndexTableRow = resolveComponent("IndexTableRow");
      const _component_IndexTable = resolveComponent("IndexTable");
      const _component_LegacyCard = resolveComponent("LegacyCard");
      return openBlock(), createBlock(_component_LegacyCard, null, {
        default: withCtx(() => [
          createVNode(_component_IndexTable, {
            condensed: unref(smDown),
            resourceName,
            itemCount: customers.length,
            selectedItemsCount: unref(allResourcesSelected) ? "All" : unref(selectedResources).length,
            onSelectionChange: unref(handleSelectionChange),
            headings: [
              { title: "Name" },
              { title: "Location" },
              {
                alignment: "end",
                id: "order-count",
                title: "Order count"
              },
              {
                alignment: "end",
                id: "amount-spent",
                title: "Amount spent"
              }
            ]
          }, {
            default: withCtx(() => [
              (openBlock(), createElementBlock(Fragment, null, renderList(customers, ({ id, name, location, orders, amountSpent }, index) => {
                return createVNode(_component_IndexTableRow, {
                  id,
                  key: id,
                  selected: unref(selectedResources).includes(id),
                  position: index
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
                        createVNode(_component_Text, {
                          as: "span",
                          alignment: "end",
                          numeric: ""
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(orders), 1)
                          ]),
                          _: 2
                        }, 1024)
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
                    }, 1024)
                  ]),
                  _: 2
                }, 1032, ["id", "selected", "position"]);
              }), 64))
            ]),
            _: 1
          }, 8, ["condensed", "itemCount", "selectedItemsCount", "onSelectionChange"])
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
