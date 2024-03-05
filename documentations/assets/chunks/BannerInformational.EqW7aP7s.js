import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Text = resolveComponent("Text");
  const _component_Banner = resolveComponent("Banner");
  return openBlock(), createBlock(_component_Banner, {
    title: "USPS has updated their rates",
    action: { content: "Update rates", url: "" },
    secondaryAction: { content: "Learn more" },
    onDismiss: () => {
    }
  }, {
    default: withCtx(() => [
      createVNode(_component_Text, { as: "p" }, {
        default: withCtx(() => [
          createTextVNode(" Make sure you know how these changes affect your store. ")
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const BannerInformational = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  BannerInformational as default
};
