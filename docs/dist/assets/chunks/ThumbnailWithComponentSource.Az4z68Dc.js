import { N as NoteIcon } from "./NoteIcon.0tvtJDgA.js";
import { d as defineComponent, D as resolveComponent, o as openBlock, b as createBlock, p as unref } from "./framework.1qnja6qJ.js";
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
