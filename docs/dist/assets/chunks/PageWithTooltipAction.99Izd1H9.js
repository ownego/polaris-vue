import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Page = resolveComponent("Page");
  return openBlock(), createBlock(_component_Page, {
    title: "Product",
    primaryAction: {
      content: "Save"
    },
    secondaryActions: [{
      content: "Import",
      disabled: true,
      helpText: "You need permission to import products."
    }]
  }, null, 8, ["secondaryActions"]);
}
const PageWithTooltipAction = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  PageWithTooltipAction as default
};
