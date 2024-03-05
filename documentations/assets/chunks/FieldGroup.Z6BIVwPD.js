import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_TextField = resolveComponent("TextField");
  const _component_FormLayoutGroup = resolveComponent("FormLayoutGroup");
  const _component_FormLayout = resolveComponent("FormLayout");
  return openBlock(), createBlock(_component_FormLayout, null, {
    default: withCtx(() => [
      createVNode(_component_FormLayoutGroup, null, {
        default: withCtx(() => [
          createVNode(_component_TextField, {
            type: "number",
            label: "Minimum order",
            autoComplete: "off"
          }),
          createVNode(_component_TextField, {
            type: "number",
            label: "Maximum order",
            autoComplete: "off"
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const FieldGroup = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  FieldGroup as default
};
