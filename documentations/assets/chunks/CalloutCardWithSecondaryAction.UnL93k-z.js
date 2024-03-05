import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Text = resolveComponent("Text");
  const _component_CalloutCard = resolveComponent("CalloutCard");
  return openBlock(), createBlock(_component_CalloutCard, {
    title: "Customize the style of your checkout",
    illustration: "https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg",
    primaryAction: { content: "Customize checkout", url: "#" },
    secondaryAction: { content: "Learn more about customizing checkout" }
  }, {
    default: withCtx(() => [
      createVNode(_component_Text, { as: "p" }, {
        default: withCtx(() => [
          createTextVNode("Upload your store’s logo, change colors and fonts, and more.")
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const CalloutCardWithSecondaryAction = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  CalloutCardWithSecondaryAction as default
};
