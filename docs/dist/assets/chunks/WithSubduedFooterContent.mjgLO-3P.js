import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode, m as createBaseVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("p", null, "Track and receive your incoming inventory from suppliers.", -1);
function _sfc_render(_ctx, _cache) {
  const _component_Link = resolveComponent("Link");
  const _component_EmptyState = resolveComponent("EmptyState");
  const _component_LegacyCard = resolveComponent("LegacyCard");
  return openBlock(), createBlock(_component_LegacyCard, { sectioned: "" }, {
    default: withCtx(() => [
      createVNode(_component_EmptyState, {
        heading: "Manage your inventory transfers",
        action: { content: "Add transfer" },
        "secondary-action": { content: "Learn more", url: "https://help.shopify.com" },
        image: "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      }, {
        footerContent: withCtx(() => [
          createBaseVNode("p", null, [
            createTextVNode(" If you don’t want to add a transfer, you can import your inventory from "),
            createVNode(_component_Link, {
              monochrome: "",
              url: "/settings"
            }, {
              default: withCtx(() => [
                createTextVNode(" settings ")
              ]),
              _: 1
            }),
            createTextVNode(" . ")
          ])
        ]),
        default: withCtx(() => [
          _hoisted_1
        ]),
        _: 1
      }, 8, ["secondary-action"])
    ]),
    _: 1
  });
}
const WithSubduedFooterContent = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  WithSubduedFooterContent as default
};
