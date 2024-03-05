import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_TextField = resolveComponent("TextField");
  const _component_FormLayoutGroup = resolveComponent("FormLayoutGroup");
  const _component_FormLayout = resolveComponent("FormLayout");
  return openBlock(), createBlock(_component_FormLayout, null, {
    default: withCtx(() => [
      createVNode(_component_FormLayoutGroup, { condensed: "" }, {
        default: withCtx(() => [
          createVNode(_component_TextField, {
            label: "Length",
            autoComplete: "off"
          }),
          createVNode(_component_TextField, {
            label: "Width",
            autoComplete: "off"
          }),
          createVNode(_component_TextField, {
            label: "Height",
            autoComplete: "off"
          }),
          createVNode(_component_TextField, {
            label: "Unit",
            autoComplete: "off"
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const CondensedFieldGroup = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  CondensedFieldGroup as default
};
