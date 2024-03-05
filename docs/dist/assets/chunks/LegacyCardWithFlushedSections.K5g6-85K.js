import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode, a as createTextVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Image = resolveComponent("Image");
  const _component_LegacyCardSection = resolveComponent("LegacyCardSection");
  const _component_TextContainer = resolveComponent("TextContainer");
  const _component_LegacyCard = resolveComponent("LegacyCard");
  return openBlock(), createBlock(_component_LegacyCard, null, {
    default: withCtx(() => [
      createVNode(_component_LegacyCardSection, { flush: "" }, {
        default: withCtx(() => [
          createVNode(_component_Image, {
            source: "https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg",
            alt: "a sheet with purple and orange stripes"
          })
        ]),
        _: 1
      }),
      createVNode(_component_LegacyCardSection, { subdued: "" }, {
        default: withCtx(() => [
          createVNode(_component_TextContainer, null, {
            default: withCtx(() => [
              createTextVNode(" You can use sales reports to see information about your customers’ orders based on criteria such as sales over time, by channel, or by staff. ")
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
const LegacyCardWithFlushedSections = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  LegacyCardWithFlushedSections as default
};
