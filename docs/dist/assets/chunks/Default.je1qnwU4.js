import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Text = resolveComponent("Text");
  const _component_LegacyCard = resolveComponent("LegacyCard");
  return openBlock(), createBlock(_component_LegacyCard, {
    title: "Online store dashboard",
    sectioned: true
  }, {
    default: withCtx(() => [
      createVNode(_component_Text, { as: "p" }, {
        default: withCtx(() => [
          createTextVNode(" View a summary of your online store’s performance. ")
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const Default = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Default as default
};
