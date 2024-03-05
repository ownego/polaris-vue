import { d as defineComponent, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Default",
  setup(__props) {
    const columnContentTypes = [
      "text",
      "numeric",
      "numeric",
      "numeric",
      "numeric"
    ];
    const headings = [
      "Product",
      "Price",
      "SKU Number",
      "Net quantity",
      "Net sales"
    ];
    const totals = ["", "", "", 255, "$155,830.00"];
    const rows = [
      ["Emerald Silk Gown", "$875.00", 124689, 140, "$122,500.00"],
      ["Mauve Cashmere Scarf", "$230.00", 124533, 83, "$19,090.00"],
      [
        "Navy Merino Wool Blazer with khaki chinos and yellow belt",
        "$445.00",
        124518,
        32,
        "$14,240.00"
      ]
    ];
    return (_ctx, _cache) => {
      const _component_DataTable = resolveComponent("DataTable");
      const _component_LegacyCard = resolveComponent("LegacyCard");
      const _component_Page = resolveComponent("Page");
      return openBlock(), createBlock(_component_Page, { title: "Sales by product" }, {
        default: withCtx(() => [
          createVNode(_component_LegacyCard, null, {
            default: withCtx(() => [
              createVNode(_component_DataTable, {
                columnContentTypes,
                headings,
                rows,
                totals
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
