import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Button = resolveComponent("Button");
  const _component_ButtonGroup = resolveComponent("ButtonGroup");
  return openBlock(), createBlock(_component_ButtonGroup, null, {
    default: withCtx(() => [
      createVNode(_component_Button, null, {
        default: withCtx(() => [
          createTextVNode("Cancel")
        ]),
        _: 1
      }),
      createVNode(_component_Button, { variant: "primary" }, {
        default: withCtx(() => [
          createTextVNode("Save")
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
