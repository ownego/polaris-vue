import { u as useBreakpoints } from "./Preview.vue_vue_type_style_index_0_lang.w_jMciSf.js";
import { u as useIndexResourceState } from "./useIndexResourceState.7iLFTXn6.js";
import { d as defineComponent, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, p as unref, F as Fragment, t as toDisplayString, a as createTextVNode, I as createVNode, E as renderList, c as createElementBlock } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithNestedRows",
  setup(__props) {
    const breakpoints = useBreakpoints();
    const { smDown } = breakpoints.value;
    const rows = [
      {
        id: "3411",
        quantity: 11,
        price: "$2,400",
        size: "Small",
        color: "Orange"
      },
      {
        id: "2562",
        quantity: 30,
        price: "$975",
        size: "Medium",
        color: "Orange"
      },
      {
        id: "4102",
        quantity: 27,
        price: "$2885",
        size: "Large",
        color: "Orange"
      },
      {
        id: "2564",
        quantity: 19,
        price: "$1,209",
        size: "Small",
        color: "Red",
        disabled: true
      },
      {
        id: "2563",
        quantity: 22,
        price: "$1,400",
        size: "Small",
        color: "Green"
      }
    ];
    const columnHeadings = [
      { title: "Name", id: "column-header--size" },
      {
        hidden: false,
        id: "column-header--price",
        title: "Price"
      },
      {
        alignment: "end",
        id: "column-header--quantity",
        title: "Available"
      }
    ];
    const groupRowsByGroupKey = (groupKey, resolveId) => {
      let position = -1;
      const groups = rows.reduce((groups2, product) => {
        const groupVal = product[groupKey];
        if (!groups2[groupVal]) {
          position += 1;
          groups2[groupVal] = {
            position,
            products: [],
            id: resolveId(groupVal)
          };
        }
        groups2[groupVal].products.push({
          ...product,
          position: position + 1
        });
        position += 1;
        return groups2;
      }, {});
      return groups;
    };
    const resourceName = {
      singular: "product",
      plural: "products"
    };
    const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(rows, {
      resourceFilter: ({ disabled }) => !disabled
    });
    const groupedProducts = groupRowsByGroupKey(
      "color",
      (color) => `color--${color.toLowerCase()}`
    );
    const isSelected = (order) => {
      const { products } = order;
      let selected = false;
      const someProductsSelected = products.some(
        ({ id }) => selectedResources.value.includes(id)
      );
      const allProductsSelected = products.every(
        ({ id }) => selectedResources.value.includes(id)
      );
      if (allProductsSelected) {
        selected = true;
      } else if (someProductsSelected) {
        selected = "indeterminate";
      }
      return selected;
    };
    const rowRange = (groupedProduct) => {
      const { products } = groupedProduct;
      const selectableRows = rows.filter(({ disabled }) => !disabled);
      const results = [
        selectableRows.findIndex((row) => row.id === products[0].id),
        selectableRows.findIndex(
          (row) => row.id === products[products.length - 1].id
        )
      ];
      return results;
    };
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
            selectedItemsCount: unref(allResourcesSelected) ? "All" : unref(selectedResources).length,
            resourceName,
            itemCount: rows.length,
            headings: columnHeadings,
            onSelectionChange: unref(handleSelectionChange)
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(Object.keys(unref(groupedProducts)), (color, index) => {
                return openBlock(), createElementBlock(Fragment, { key: index }, [
                  createVNode(_component_IndexTableRow, {
                    rowType: "data",
                    selectionRange: rowRange(unref(groupedProducts)[color]),
                    id: `Parent-${index}`,
                    position: unref(groupedProducts)[color].position,
                    selected: isSelected(unref(groupedProducts)[color]),
                    disabled: unref(groupedProducts)[color].products.every(({ disabled }) => disabled),
                    accessibilityLabel: `Select all products which have color ${color}`
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_IndexTableCell, {
                        scope: "col",
                        id: unref(groupedProducts)[color].id
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Text, {
                            as: "span",
                            fontWeight: "semibold"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(color), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1032, ["id"]),
                      createVNode(_component_IndexTableCell),
                      createVNode(_component_IndexTableCell)
                    ]),
                    _: 2
                  }, 1032, ["selectionRange", "id", "position", "selected", "disabled", "accessibilityLabel"]),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(groupedProducts)[color].products, ({ id, size, quantity, price, position, disabled }, rowIndex) => {
                    return openBlock(), createBlock(_component_IndexTableRow, {
                      rowType: "child",
                      key: rowIndex,
                      id,
                      position,
                      selected: unref(selectedResources).includes(id),
                      disabled
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_IndexTableCell, {
                          scope: "row",
                          headers: `${columnHeadings[0].id} ${unref(groupedProducts)[color].id}`
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_Text, {
                              variant: "bodyMd",
                              as: "span"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(size), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1032, ["headers"]),
                        createVNode(_component_IndexTableCell, null, {
                          default: withCtx(() => [
                            createVNode(_component_Text, {
                              as: "span",
                              numeric: ""
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(price), 1)
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
                                createTextVNode(toDisplayString(quantity), 1)
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
