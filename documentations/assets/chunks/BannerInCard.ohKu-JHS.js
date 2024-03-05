import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Link = resolveComponent("Link");
  const _component_Text = resolveComponent("Text");
  const _component_Banner = resolveComponent("Banner");
  const _component_TextContainer = resolveComponent("TextContainer");
  const _component_LegacyCard = resolveComponent("LegacyCard");
  return openBlock(), createBlock(_component_LegacyCard, {
    title: "Online store dashboard",
    sectioned: ""
  }, {
    default: withCtx(() => [
      createVNode(_component_TextContainer, null, {
        default: withCtx(() => [
          createVNode(_component_Banner, { onDismiss: () => {
          } }, {
            default: withCtx(() => [
              createVNode(_component_Text, { as: "p" }, {
                default: withCtx(() => [
                  createTextVNode(" Use your finance report to get detailed information about your business. "),
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
          }),
          createVNode(_component_Text, { as: "p" }, {
            default: withCtx(() => [
              createTextVNode("View a summary of your online store's performance.")
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
const BannerInCard = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  BannerInCard as default
};
