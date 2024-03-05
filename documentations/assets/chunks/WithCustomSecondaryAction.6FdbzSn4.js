import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Button = resolveComponent("Button");
  const _component_PageActions = resolveComponent("PageActions");
  return openBlock(), createBlock(_component_PageActions, { primaryAction: { content: "Save" } }, {
    secondaryActions: withCtx(() => [
      createVNode(_component_Button, null, {
        default: withCtx(() => [
          createTextVNode("Save")
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const WithCustomSecondaryAction = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  WithCustomSecondaryAction as default
};
