import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode, a as createTextVNode, m as createBaseVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("p", null, "Buy postage and ship remaining 2 items", -1);
function _sfc_render(_ctx, _cache) {
  const _component_LegacyStackItem = resolveComponent("LegacyStackItem");
  const _component_Button = resolveComponent("Button");
  const _component_LegacyStack = resolveComponent("LegacyStack");
  const _component_LegacyCard = resolveComponent("LegacyCard");
  const _component_Page = resolveComponent("Page");
  return openBlock(), createBlock(_component_Page, {
    backAction: { content: "Settings", url: "#" },
    title: "#1085",
    secondaryActions: [
      { content: "Print" },
      { content: "Unarchive" },
      { content: "Cancel order" }
    ],
    pagination: {
      hasPrevious: true,
      hasNext: true
    }
  }, {
    default: withCtx(() => [
      createVNode(_component_LegacyCard, {
        sectioned: "",
        title: "Fulfill order"
      }, {
        default: withCtx(() => [
          createVNode(_component_LegacyStack, { alignment: "center" }, {
            default: withCtx(() => [
              createVNode(_component_LegacyStackItem, { fill: "" }, {
                default: withCtx(() => [
                  _hoisted_1
                ]),
                _: 1
              }),
              createVNode(_component_Button, { variant: "primary" }, {
                default: withCtx(() => [
                  createTextVNode("Continue")
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
}
const PageWithoutPrimaryActionInHeader = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  PageWithoutPrimaryActionInHeader as default
};
