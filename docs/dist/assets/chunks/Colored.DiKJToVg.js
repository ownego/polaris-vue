import { P as PlusCircleIcon } from "./PlusCircleIcon.lacase-5.js";
import { d as defineComponent, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode, p as unref, F as Fragment } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Colored",
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_Icon = resolveComponent("Icon");
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_component_Icon, {
          source: unref(PlusCircleIcon),
          tone: "base"
        }, null, 8, ["source"]),
        createVNode(_component_Icon, {
          source: unref(PlusCircleIcon),
          tone: "subdued"
        }, null, 8, ["source"]),
        createVNode(_component_Icon, {
          source: unref(PlusCircleIcon),
          tone: "primary"
        }, null, 8, ["source"]),
        createVNode(_component_Icon, {
          source: unref(PlusCircleIcon),
          tone: "info"
        }, null, 8, ["source"]),
        createVNode(_component_Icon, {
          source: unref(PlusCircleIcon),
          tone: "success"
        }, null, 8, ["source"]),
        createVNode(_component_Icon, {
          source: unref(PlusCircleIcon),
          tone: "caution"
        }, null, 8, ["source"]),
        createVNode(_component_Icon, {
          source: unref(PlusCircleIcon),
          tone: "warning"
        }, null, 8, ["source"]),
        createVNode(_component_Icon, {
          source: unref(PlusCircleIcon),
          tone: "critical"
        }, null, 8, ["source"])
      ], 64);
    };
  }
});
export {
  _sfc_main as default
};
