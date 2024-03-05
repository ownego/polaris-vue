import { u as useBreakpoints } from "./Preview.vue_vue_type_style_index_0_lang.w_jMciSf.js";
import { u as useIndexResourceState } from "./useIndexResourceState.7iLFTXn6.js";
import { d as defineComponent, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, p as unref, F as Fragment, t as toDisplayString, a as createTextVNode, I as createVNode, E as renderList, c as createElementBlock } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithSubheaders",
  setup(__props) {
    const breakpoints = useBreakpoints();
    const { smDown } = breakpoints.value;
    const rows = [
      {
        id: "3411",
        url: "#",
        name: "Mae Jemison",
        location: "Decatur, USA",
        orders: 11,
        amountSpent: "$2,400",
        lastOrderDate: "May 31, 2023"
      },
      {
        id: "2562",
        url: "#",
        name: "Ellen Ochoa",
        location: "Los Angeles, USA",
        orders: 30,
        amountSpent: "$975",
        lastOrderDate: "May 31, 2023"
      },
      {
        id: "4102",
        url: "#",
        name: "Colm Dillane",
        location: "New York, USA",
        orders: 27,
        amountSpent: "$2885",
        lastOrderDate: "May 31, 2023"
      },
      {
        id: "2564",
        url: "#",
        name: "Al Chemist",
        location: "New York, USA",
        orders: 19,
        amountSpent: "$1,209",
        lastOrderDate: "April 4, 2023",
        disabled: true
      },
      {
        id: "2563",
        url: "#",
        name: "Larry June",
        location: "San Francisco, USA",
        orders: 22,
        amountSpent: "$1,400",
        lastOrderDate: "March 19, 2023"
      }
    ];
    const columnHeadings = [
      { title: "Name", id: "name" },
      { title: "Location", id: "location" },
      {
        alignment: "end",
        id: "order-count",
        title: "Order count"
      },
      {
        alignment: "end",
        hidden: false,
        id: "amount-spent",
        title: "Amount spent"
      }
    ];
    const groupRowsByLastOrderDate = () => {
      let position = -1;
      const groups = rows.reduce(
        (groups2, customer) => {
          const { lastOrderDate } = customer;
          if (!groups2[lastOrderDate]) {
            position += 1;
            groups2[lastOrderDate] = {
              position,
              customers: [],
              id: `order-${lastOrderDate.split(" ").join("-")}`
            };
          }
          groups2[lastOrderDate].customers.push({
            ...customer,
            position: position + 1
          });
          position += 1;
          return groups2;
        },
        {}
      );
      return groups;
    };
    const resourceName = {
      singular: "customer",
      plural: "customers"
    };
    const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(rows, { resourceFilter: ({ disabled }) => !disabled });
    const orderRows = groupRowsByLastOrderDate();
    const isSelected = (order) => {
      const { customers } = order;
      let selected = false;
      const someCustomersSelected = customers.some(
        ({ id }) => selectedResources.value.includes(id)
      );
      const allCustomersSelected = customers.every(
        ({ id }) => selectedResources.value.includes(id)
      );
      if (allCustomersSelected) {
        selected = true;
      } else if (someCustomersSelected) {
        selected = "indeterminate";
      }
      return selected;
    };
    const childRowRange = (order) => {
      const { customers } = order;
      const selectableRows = rows.filter(({ disabled }) => !disabled);
      const results = [
        selectableRows.findIndex((row) => row.id === customers[0].id),
        selectableRows.findIndex(
          (row) => row.id === customers[customers.length - 1].id
        )
      ];
      return results;
    };
    return (_ctx, _cache) => {
      const _component_IndexTableCell = resolveComponent("IndexTableCell");
      const _component_IndexTableRow = resolveComponent("IndexTableRow");
      const _component_Text = resolveComponent("Text");
      const _component_IndexTable = resolveComponent("IndexTable");
      const _component_LegacyCard = resolveComponent("LegacyCard");
      return openBlock(), createBlock(_component_LegacyCard, null, {
        default: withCtx(() => [
          createVNode(_component_IndexTable, {
            condensed: unref(smDown),
            selectedItemsCount: unref(allResourcesSelected) ? "All" : unref(selectedResources).length,
            resourceName,
            itemCount: rows.length,
            headings: columnHeadings,
            onSelectionChange: unref(handleSelectionChange)
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(Object.keys(unref(orderRows)), (orderDate, index) => {
                return openBlock(), createElementBlock(Fragment, { key: index }, [
                  createVNode(_component_IndexTableRow, {
                    rowType: "subheader",
                    selectionRange: childRowRange(unref(orderRows)[orderDate]),
                    id: unref(orderRows)[orderDate].id,
                    position: unref(orderRows)[orderDate].position,
                    selected: isSelected(unref(orderRows)[orderDate]),
                    disabled: index === 1
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_IndexTableCell, {
                        colSpan: 4,
                        scope: "colgroup",
                        as: "th",
                        id: unref(orderRows)[orderDate].id
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(`Last order placed: ${orderDate}`), 1)
                        ]),
                        _: 2
                      }, 1032, ["id"])
                    ]),
                    _: 2
                  }, 1032, ["selectionRange", "id", "position", "selected", "disabled"]),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(orderRows)[orderDate].customers, ({ id, name, location, orders, amountSpent, position, disabled }, rowIndex) => {
                    return openBlock(), createBlock(_component_IndexTableRow, {
                      key: rowIndex,
                      id,
                      position,
                      selected: unref(selectedResources).includes(id),
                      disabled
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_IndexTableCell, {
                          headers: `${columnHeadings[0].id} ${id}`
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_Text, {
                              variant: "bodyMd",
                              fontWeight: "semibold",
                              as: "span"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(name), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1032, ["headers"]),
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
                    }, 1032, ["id", "position", "selected", "disabled"]);
                  }), 128))
                ], 64);
              }), 128))
            ]),
            _: 1
          }, 8, ["condensed", "selectedItemsCount", "itemCount", "onSelectionChange"])
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
