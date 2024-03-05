import { _ as _export_sfc, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode, w as withCtx } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
const _hoisted_1 = { style: { width: "40px", height: "40px" } };
function _sfc_render(_ctx, _cache) {
  const _component_DropZoneFileUpload = resolveComponent("DropZoneFileUpload");
  const _component_DropZone = resolveComponent("DropZone");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_DropZone, null, {
      default: withCtx(() => [
        createVNode(_component_DropZoneFileUpload)
      ]),
      _: 1
    })
  ]);
}
const SmallSized = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  SmallSized as default
};
