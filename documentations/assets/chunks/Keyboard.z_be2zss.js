import { d as defineComponent, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode } from "./framework.2IsXxFXf.js";
const _hoisted_1 = { style: { "height": "100px" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Keyboard",
  setup(__props) {
    const nextAction = () => {
      console.log("Next");
    };
    const previousAction = () => {
      console.log("Previous");
    };
    return (_ctx, _cache) => {
      const _component_Pagination = resolveComponent("Pagination");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_Pagination, {
          hasPrevious: "",
          previousKeys: [74],
          previousTooltip: "j",
          hasNext: "",
          nextKeys: [75],
          nextTooltip: "k",
          onNext: nextAction,
          onPrevious: previousAction
        })
      ]);
    };
  }
});
export {
  _sfc_main as default
};
