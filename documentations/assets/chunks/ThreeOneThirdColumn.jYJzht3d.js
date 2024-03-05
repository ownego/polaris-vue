import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode, m as createBaseVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("p", null, "View a summary of your online store’s sales.", -1);
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("p", null, "View a summary of your online store’s orders.", -1);
function _sfc_render(_ctx, _cache) {
  const _component_LegacyCard = resolveComponent("LegacyCard");
  const _component_GridCell = resolveComponent("GridCell");
  const _component_Grid = resolveComponent("Grid");
  const _component_Page = resolveComponent("Page");
  return openBlock(), createBlock(_component_Page, { fullWidth: "" }, {
    default: withCtx(() => [
      createVNode(_component_Grid, { columns: { sm: 3 } }, {
        default: withCtx(() => [
          createVNode(_component_GridCell, { "column-span": { xs: 6, sm: 4, md: 4, lg: 8, xl: 8 } }, {
            default: withCtx(() => [
              createVNode(_component_LegacyCard, {
                title: "Sales",
                sectioned: ""
              }, {
                default: withCtx(() => [
                  _hoisted_1
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_GridCell, { "column-span": { xs: 6, sm: 2, md: 2, lg: 4, xl: 4 } }, {
            default: withCtx(() => [
              createVNode(_component_LegacyCard, {
                title: "Orders",
                sectioned: ""
              }, {
                default: withCtx(() => [
                  _hoisted_2
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const ThreeOneThirdColumn = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ThreeOneThirdColumn as default
};
