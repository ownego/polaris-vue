import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode, a as createTextVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Image = resolveComponent("Image");
  const _component_Text = resolveComponent("Text");
  const _component_Box = resolveComponent("Box");
  const _component_Bleed = resolveComponent("Bleed");
  const _component_Card = resolveComponent("Card");
  return openBlock(), createBlock(_component_Card, { roundedAbove: "sm" }, {
    default: withCtx(() => [
      createVNode(_component_Bleed, {
        marginInline: "400",
        marginBlock: "400"
      }, {
        default: withCtx(() => [
          createVNode(_component_Image, {
            source: "https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg",
            alt: "a sheet with purple and orange stripes"
          }),
          createVNode(_component_Box, {
            background: "bg-surface-secondary",
            padding: "400"
          }, {
            default: withCtx(() => [
              createVNode(_component_Text, {
                as: "p",
                variant: "bodyMd"
              }, {
                default: withCtx(() => [
                  createTextVNode(" You can use sales reports to see information about your customers' orders based on criteria such as sales over time, by channel, or by staff. ")
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
const FlushedSection = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  FlushedSection as default
};
