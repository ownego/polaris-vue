import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_DropZoneFileUpload = resolveComponent("DropZoneFileUpload");
  const _component_DropZone = resolveComponent("DropZone");
  return openBlock(), createBlock(_component_DropZone, { label: "Theme files" }, {
    default: withCtx(() => [
      createVNode(_component_DropZoneFileUpload)
    ]),
    _: 1
  });
}
const WithLabel = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  WithLabel as default
};
