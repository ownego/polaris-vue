import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Link = resolveComponent("Link");
  const _component_Text = resolveComponent("Text");
  const _component_Banner = resolveComponent("Banner");
  return openBlock(), createBlock(_component_Banner, {
    title: "High risk of fraud detected",
    tone: "critical",
    action: { content: "Review risk analysis", url: "" }
  }, {
    default: withCtx(() => [
      createVNode(_component_Text, { as: "p" }, {
        default: withCtx(() => [
          createTextVNode(" Before fulfilling this order or capturing payment, please "),
          createVNode(_component_Link, { url: "" }, {
            default: withCtx(() => [
              createTextVNode("review the Risk Analysis")
            ]),
            _: 1
          }),
          createTextVNode(" and determine if this order is fraudulent. ")
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const BannerCritical = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  BannerCritical as default
};
