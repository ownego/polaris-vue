import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Link = resolveComponent("Link");
  const _component_Text = resolveComponent("Text");
  const _component_Banner = resolveComponent("Banner");
  return openBlock(), createBlock(_component_Banner, { onDismiss: () => {
  } }, {
    default: withCtx(() => [
      createVNode(_component_Text, { as: "p" }, {
        default: withCtx(() => [
          createTextVNode(" This order was archived on March 7, 2017 at 3:12pm EDT. "),
          createVNode(_component_Link, { url: "" }, {
            default: withCtx(() => [
              createTextVNode("Let us know what you think")
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
const BannerDismissible = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  BannerDismissible as default
};
