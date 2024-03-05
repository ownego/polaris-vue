import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode, m as createBaseVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("p", null, " You can use the Files section to upload images, videos, and other documents. This example shows the content with a centered layout and full width. ", -1);
function _sfc_render(_ctx, _cache) {
  const _component_EmptyState = resolveComponent("EmptyState");
  const _component_LegacyCard = resolveComponent("LegacyCard");
  return openBlock(), createBlock(_component_LegacyCard, { sectioned: "" }, {
    default: withCtx(() => [
      createVNode(_component_EmptyState, {
        fullWidth: "",
        heading: "Upload a file to get started",
        image: "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png",
        action: { content: "Upload files" }
      }, {
        default: withCtx(() => [
          _hoisted_1
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const FullWidthLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  FullWidthLayout as default
};
