import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_ListItem = resolveComponent("ListItem");
  const _component_List = resolveComponent("List");
  const _component_Banner = resolveComponent("Banner");
  return openBlock(), createBlock(_component_Banner, {
    title: "Before you can purchase a shipping label, this change needs to be made:",
    tone: "warning",
    action: { content: "Edit address", url: "" }
  }, {
    default: withCtx(() => [
      createVNode(_component_List, null, {
        default: withCtx(() => [
          createVNode(_component_ListItem, null, {
            default: withCtx(() => [
              createTextVNode(" The name of the city you're shipping to has characters that aren't allowed. City name can only include spaces and hyphens. ")
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const BannerWarning = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  BannerWarning as default
};
