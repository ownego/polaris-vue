import { d as defineComponent, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithLabel",
  setup(__props) {
    const nextAction = () => {
      console.log("Next");
    };
    const previousAction = () => {
      console.log("Previous");
    };
    return (_ctx, _cache) => {
      const _component_Pagination = resolveComponent("Pagination");
      return openBlock(), createBlock(_component_Pagination, {
        hasPrevious: "",
        hasNext: "",
        onNext: nextAction,
        onPrevious: previousAction
      }, {
        default: withCtx(() => [
          createTextVNode(" Results ")
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
