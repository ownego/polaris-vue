import { u as useBreakpoints } from "./Preview.vue_vue_type_style_index_0_lang.a_K4ko6J.js";
import { u as useIndexResourceState } from "./useIndexResourceState.tOI1cgaY.js";
import { d as defineComponent, a3 as h, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, p as unref, F as Fragment, t as toDisplayString, a as createTextVNode, I as createVNode, E as renderList, c as createElementBlock } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithRowNavigationLink",
  setup(__props) {
    const breakpoints = useBreakpoints();
    const { smDown } = breakpoints.value;
    const headings = [
      { title: "Name" },
      { title: "Location" },
      {
        id: "order-count",
        title: h(resolveComponent("Text"), { as: "span", alignment: "end" }, () => "Order count")
      },
      {
        id: "amount-spent",
        hidden: false,
        title: h(resolveComponent("Text"), { as: "span", alignment: "end" }, () => "Amount spent")
      }
    ];
    const customers = [
      {
        id: "3411",
        url: "#",
        name: "Mae Jemison",
        location: "Decatur, USA",
        orders: 20,
        amountSpent: "$2,400"
      },
      {
        id: "2561",
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
      const _component_Link = resolveComponent("Link");
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
            headings
          }, {
            default: withCtx(() => [
              (openBlock(), createElementBlock(Fragment, null, renderList(customers, ({ id, url, name, location, orders, amountSpent }, index) => {
                return createVNode(_component_IndexTableRow, {
                  id,
                  key: id,
                  selected: unref(selectedResources).includes(id),
                  position: index
                }, {
                  default: withCtx(() => [
                    createVNode(_component_IndexTableCell, null, {
                      default: withCtx(() => [
                        createVNode(_component_Link, {
                          dataPrimaryLink: "",
                          url,
                          onClick: () => console.log(`Clicked ${name}`)
                        }, {
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
                        }, 1032, ["url", "onClick"])
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
