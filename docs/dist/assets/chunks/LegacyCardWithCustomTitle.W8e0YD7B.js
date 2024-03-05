import { o as openBlock, c as createElementBlock, m as createBaseVNode, d as defineComponent, D as resolveComponent, b as createBlock, w as withCtx, p as unref, I as createVNode, a as createTextVNode } from "./framework.1qnja6qJ.js";
const _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20"
};
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("path", { d: "M13 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("path", {
  "fill-rule": "evenodd",
  d: "M11.276 3.5a3.75 3.75 0 0 0-2.701 1.149L4.321 9.066a2.75 2.75 0 0 0 .036 3.852l2.898 2.898a2.5 2.5 0 0 0 3.502.033l4.747-4.571a3.25 3.25 0 0 0 .996-2.341V6.75a3.25 3.25 0 0 0-3.25-3.25zm-1.62 2.19a2.25 2.25 0 0 1 1.62-.69h1.974c.966 0 1.75.784 1.75 1.75v2.187c0 .475-.194.93-.536 1.26l-4.747 4.572a1 1 0 0 1-1.401-.014l-2.898-2.898a1.25 1.25 0 0 1-.016-1.75l4.253-4.418Z"
}, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, [..._hoisted_4]);
}
const ProductIcon = { render };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LegacyCardWithCustomTitle",
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_Icon = resolveComponent("Icon");
      const _component_Text = resolveComponent("Text");
      const _component_LegacyStack = resolveComponent("LegacyStack");
      const _component_ListItem = resolveComponent("ListItem");
      const _component_List = resolveComponent("List");
      const _component_LegacyCardSection = resolveComponent("LegacyCardSection");
      const _component_LegacyCard = resolveComponent("LegacyCard");
      return openBlock(), createBlock(_component_LegacyCard, { title: "Products" }, {
        default: withCtx(() => [
          createVNode(_component_LegacyCardSection, null, {
            title: withCtx(() => [
              createVNode(_component_LegacyStack, null, {
                default: withCtx(() => [
                  createVNode(_component_Icon, { source: unref(ProductIcon) }, null, 8, ["source"]),
                  createVNode(_component_Text, {
                    variant: "headingSm",
                    as: "h3"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" New Products ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            default: withCtx(() => [
              createVNode(_component_List, null, {
                default: withCtx(() => [
                  createVNode(_component_ListItem, null, {
                    default: withCtx(() => [
                      createTextVNode("Socks")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_ListItem, null, {
                    default: withCtx(() => [
                      createTextVNode("Super Shoes")
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
