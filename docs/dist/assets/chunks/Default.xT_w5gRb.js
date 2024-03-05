import { N as NoteIcon } from "./NoteIcon.0tvtJDgA.js";
import { d as defineComponent, D as resolveComponent, o as openBlock, b as createBlock, p as unref } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Default",
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_ExceptionList = resolveComponent("ExceptionList");
      return openBlock(), createBlock(_component_ExceptionList, {
        items: [{ icon: unref(NoteIcon), description: "This customer is awesome. Make sure to treat them right!" }]
      }, null, 8, ["items"]);
    };
  }
});
export {
  _sfc_main as default
};
