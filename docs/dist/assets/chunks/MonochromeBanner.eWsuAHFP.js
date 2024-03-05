import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Link = resolveComponent("Link");
  const _component_Banner = resolveComponent("Banner");
  return openBlock(), createBlock(_component_Banner, null, {
    default: withCtx(() => [
      createTextVNode(" Learn more about "),
      createVNode(_component_Link, { url: "https://help.shopify.com/manual" }, {
        default: withCtx(() => [
          createTextVNode("fulfilling orders")
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const MonochromeBanner = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  MonochromeBanner as default
};
