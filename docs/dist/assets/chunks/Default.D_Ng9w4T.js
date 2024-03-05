import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Pagination = resolveComponent("Pagination");
  return openBlock(), createBlock(_component_Pagination, {
    hasPrevious: "",
    hasNext: "",
    onPrevious: _cache[0] || (_cache[0] = () => {
      console.log("Previous");
    }),
    onNext: _cache[1] || (_cache[1] = () => {
      console.log("Next");
    })
  });
}
const Default = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Default as default
};
