import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_SkeletonTabs = resolveComponent("SkeletonTabs");
  const _component_LegacyCard = resolveComponent("LegacyCard");
  return openBlock(), createBlock(_component_LegacyCard, null, {
    default: withCtx(() => [
      createVNode(_component_SkeletonTabs, { fitted: "" })
    ]),
    _: 1
  });
}
const SkeletonTabsFitted = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  SkeletonTabsFitted as default
};
