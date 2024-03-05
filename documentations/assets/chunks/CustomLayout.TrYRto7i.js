import { d as defineComponent, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, m as createBaseVNode, I as createVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CustomLayout",
  setup(__props) {
    const areaGrid = {
      xs: ["product", "sales", "orders"],
      sm: [
        "product product product product",
        "sales sales orders orders"
      ],
      md: ["sales product product orders"],
      lg: ["product product product product sales orders"],
      xl: ["product product sales sales orders orders"]
    };
    const placeholderStyle = {
      background: "var(--p-color-text-info)",
      height: "60px",
      width: "auto"
    };
    return (_ctx, _cache) => {
      const _component_GridCell = resolveComponent("GridCell");
      const _component_Grid = resolveComponent("Grid");
      const _component_Card = resolveComponent("Card");
      const _component_Page = resolveComponent("Page");
      return openBlock(), createBlock(_component_Page, { fullWidth: "" }, {
        default: withCtx(() => [
          createVNode(_component_Card, null, {
            default: withCtx(() => [
              createVNode(_component_Grid, {
                columns: { xs: 1, sm: 4, md: 4, lg: 6, xl: 6 },
                areas: areaGrid
              }, {
                default: withCtx(() => [
                  createVNode(_component_GridCell, { area: "product" }, {
                    default: withCtx(() => [
                      createBaseVNode("div", { style: placeholderStyle })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_GridCell, { area: "sales" }, {
                    default: withCtx(() => [
                      createBaseVNode("div", { style: placeholderStyle })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_GridCell, { area: "orders" }, {
                    default: withCtx(() => [
                      createBaseVNode("div", { style: placeholderStyle })
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
    };
  }
});
export {
  _sfc_main as default
};
