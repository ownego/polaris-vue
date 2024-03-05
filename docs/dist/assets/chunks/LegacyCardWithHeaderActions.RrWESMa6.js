import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Text = resolveComponent("Text");
  const _component_LegacyCard = resolveComponent("LegacyCard");
  return openBlock(), createBlock(_component_LegacyCard, {
    title: "Variants",
    sectioned: "",
    actions: [{ content: "Add variant" }]
  }, {
    default: withCtx(() => [
      createVNode(_component_Text, { as: "p" }, {
        default: withCtx(() => [
          createTextVNode(" Add variants if this product comes in multiple versions, like different sizes or colors. ")
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const LegacyCardWithHeaderActions = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  LegacyCardWithHeaderActions as default
};
