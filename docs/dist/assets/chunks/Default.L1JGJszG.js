import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, m as createBaseVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("img", {
  alt: "",
  width: "100%",
  height: "100%",
  src: "https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850",
  style: { objectFit: "cover", objectPosition: "center" }
}, null, -1);
function _sfc_render(_ctx, _cache) {
  const _component_MediaCard = resolveComponent("MediaCard");
  return openBlock(), createBlock(_component_MediaCard, {
    title: "Getting Started",
    description: "Discover how Shopify can power up your entrepreneurial journey.",
    primaryAction: { content: "Learn about getting started", onAction: () => {
    } },
    popoverActions: [{ content: "Dismiss", onAction: () => {
    } }]
  }, {
    default: withCtx(() => [
      _hoisted_1
    ]),
    _: 1
  });
}
const Default = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Default as default
};
