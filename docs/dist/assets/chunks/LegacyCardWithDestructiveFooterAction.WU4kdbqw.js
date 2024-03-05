import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_ListItem = resolveComponent("ListItem");
  const _component_List = resolveComponent("List");
  const _component_LegacyCardSection = resolveComponent("LegacyCardSection");
  const _component_LegacyCard = resolveComponent("LegacyCard");
  return openBlock(), createBlock(_component_LegacyCard, {
    title: "Shipment 1234",
    secondaryFooterActions: [{ content: "Cancel shipment", destructive: true }],
    primaryFooterAction: { content: "Add tracking number" }
  }, {
    default: withCtx(() => [
      createVNode(_component_LegacyCardSection, { title: "Items" }, {
        default: withCtx(() => [
          createVNode(_component_List, null, {
            default: withCtx(() => [
              createVNode(_component_ListItem, null, {
                default: withCtx(() => [
                  createTextVNode("1 × Oasis Glass, 4-Pack")
                ]),
                _: 1
              }),
              createVNode(_component_ListItem, null, {
                default: withCtx(() => [
                  createTextVNode("1 × Anubis Cup, 2-Pack")
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
const LegacyCardWithDestructiveFooterAction = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  LegacyCardWithDestructiveFooterAction as default
};
