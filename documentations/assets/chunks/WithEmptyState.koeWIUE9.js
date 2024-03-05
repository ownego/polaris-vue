import { u as useBreakpoints } from "./Preview.vue_vue_type_style_index_0_lang.w_jMciSf.js";
import { d as defineComponent, a3 as h, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, p as unref, I as createVNode, F as Fragment, t as toDisplayString, a as createTextVNode, E as renderList, c as createElementBlock } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithEmptyState",
  setup(__props) {
    const breakpoints = useBreakpoints();
    const { smDown } = breakpoints.value;
    const resourceName = {
      singular: "customer",
      plural: "customers"
    };
    const customers = [{
      id: "1",
      name: "Mae Jemison",
      location: "Decatur, USA",
      orders: 20,
      amountSpent: "$2,400"
    }];
    const headings = [
      { title: "Name" },
      { title: "Location" },
      {
        id: "order-count",
        title: h(resolveComponent("Text"), { as: "span", alignment: "end" }, () => "Order count")
      },
      {
        id: "amount-spent",
        title: h(resolveComponent("Text"), { as: "span", alignment: "end" }, () => "Amount spent")
      }
    ];
    return (_ctx, _cache) => {
      const _component_EmptySearchResult = resolveComponent("EmptySearchResult");
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
            headings
          }, {
            emptyState: withCtx(() => [
              createVNode(_component_EmptySearchResult, {
                title: "No customers yet",
                description: "Try changing the filters or search term",
                withIllustration: ""
              })
            ]),
            default: withCtx(() => [
              (openBlock(), createElementBlock(Fragment, null, renderList(customers, ({ id, name, location, orders, amountSpent }, index) => {
                return createVNode(_component_IndexTableRow, {
                  id,
                  key: id,
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
                }, 1032, ["id", "position"]);
              }), 64))
            ]),
            _: 1
          }, 8, ["condensed", "itemCount"])
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
