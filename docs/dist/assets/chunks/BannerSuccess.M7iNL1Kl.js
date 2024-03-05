import { D as resolveComponent, o as openBlock, b as createBlock, _ as _export_sfc } from "./framework.1qnja6qJ.js";
function render(_ctx, _cache) {
  const _component_Banner = resolveComponent("Banner");
  return openBlock(), createBlock(_component_Banner, {
    title: "Your shipping label is ready to print.",
    tone: "success",
    action: { content: "Print label", url: "" },
    onDismiss: () => {
    }
  });
}
const _sfc_main = {};
const BannerSuccess = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render]]);
export {
  BannerSuccess as default
};
