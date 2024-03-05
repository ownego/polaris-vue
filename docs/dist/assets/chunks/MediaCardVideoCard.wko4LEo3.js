import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_VideoThumbnail = resolveComponent("VideoThumbnail");
  const _component_MediaCard = resolveComponent("MediaCard");
  return openBlock(), createBlock(_component_MediaCard, {
    title: "Getting Started",
    description: "In this course, you'll learn how the Kular family turned their mom's recipe book into a global business.",
    primaryAction: { content: "Learn more", onAction: () => {
    } },
    popoverActions: [{ content: "Dismiss", onAction: () => {
    } }]
  }, {
    default: withCtx(() => [
      createVNode(_component_VideoThumbnail, {
        thumbnailUrl: "https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850",
        videoLength: 80,
        onClick: _cache[0] || (_cache[0] = () => console.log("clicked"))
      })
    ]),
    _: 1
  });
}
const MediaCardVideoCard = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  MediaCardVideoCard as default
};
