import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_TextField = resolveComponent("TextField");
  const _component_FormLayout = resolveComponent("FormLayout");
  return openBlock(), createBlock(_component_FormLayout, null, {
    default: withCtx(() => [
      createVNode(_component_TextField, {
        label: "Store name",
        autoComplete: "off"
      }),
      createVNode(_component_TextField, {
        type: "email",
        label: "Account email",
        autoComplete: "email"
      })
    ]),
    _: 1
  });
}
const Default = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Default as default
};
