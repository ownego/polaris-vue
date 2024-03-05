import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Text = resolveComponent("Text");
  const _component_TextContainer = resolveComponent("TextContainer");
  return openBlock(), createBlock(_component_TextContainer, { spacing: "tight" }, {
    default: withCtx(() => [
      createVNode(_component_Text, {
        variant: "headingMd",
        as: "h2"
      }, {
        default: withCtx(() => [
          createTextVNode(" Install the Shopify POS App ")
        ]),
        _: 1
      }),
      createVNode(_component_Text, { as: "p" }, {
        default: withCtx(() => [
          createTextVNode(" Shopify POS is the easiest way to sell your products in person. Available for iPad, iPhone, and Android. ")
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const TextContainerTight = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  TextContainerTight as default
};
