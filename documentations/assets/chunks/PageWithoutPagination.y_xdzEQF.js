import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Text = resolveComponent("Text");
  const _component_LegacyCard = resolveComponent("LegacyCard");
  const _component_Page = resolveComponent("Page");
  return openBlock(), createBlock(_component_Page, {
    title: "General",
    backAction: { content: "Settings", url: "#" },
    primaryAction: { content: "Save" }
  }, {
    default: withCtx(() => [
      createVNode(_component_LegacyCard, {
        title: "Credit card",
        sectioned: ""
      }, {
        default: withCtx(() => [
          createVNode(_component_Text, { as: "p" }, {
            default: withCtx(() => [
              createTextVNode("Credit card information")
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
const PageWithoutPagination = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  PageWithoutPagination as default
};
