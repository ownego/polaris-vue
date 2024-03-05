import { d as defineComponent, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode, w as withCtx, a as createTextVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TableType",
  setup(__props) {
    const style = {
      maxWidth: "700px",
      margin: "auto",
      border: "1px solid var(--p-color-border)"
    };
    const nextAction = () => {
      console.log("Next");
    };
    const previousAction = () => {
      console.log("Previous");
    };
    return (_ctx, _cache) => {
      const _component_Pagination = resolveComponent("Pagination");
      return openBlock(), createElementBlock("div", { style }, [
        createVNode(_component_Pagination, {
          type: "table",
          hasNext: "",
          onNext: nextAction,
          onPrevious: previousAction
        }, {
          default: withCtx(() => [
            createTextVNode(" 1-50 of 8,450 orders ")
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  _sfc_main as default
};
