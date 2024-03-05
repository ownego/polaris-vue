import { _ as _export_sfc, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode, w as withCtx, a as createTextVNode, Q as normalizeStyle } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Pagination = resolveComponent("Pagination");
  return openBlock(), createElementBlock("div", {
    style: normalizeStyle({
      maxWidth: "700px",
      margin: "auto",
      border: "1px solid var(--p-color-border)"
    })
  }, [
    createVNode(_component_Pagination, {
      type: "table",
      hasNext: "",
      onPrevious: _cache[0] || (_cache[0] = () => {
        console.log("Previous");
      }),
      onNext: _cache[1] || (_cache[1] = () => {
        console.log("Next");
      })
    }, {
      default: withCtx(() => [
        createTextVNode(" 1-50 of 8,450 orders ")
      ]),
      _: 1
    })
  ], 4);
}
const PaginationWithTableType = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  PaginationWithTableType as default
};
