import { N as NoteIcon } from "./NoteIcon.w_L7rheI.js";
import { d as defineComponent, D as resolveComponent, o as openBlock, b as createBlock, p as unref } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ThumbnailWithComponentSource",
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_Thumbnail = resolveComponent("Thumbnail");
      return openBlock(), createBlock(_component_Thumbnail, {
        source: unref(NoteIcon),
        size: "large",
        alt: "Small document"
      }, null, 8, ["source"]);
    };
  }
});
export {
  _sfc_main as default
};
