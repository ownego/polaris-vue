import { d as defineComponent, a3 as h, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithRowHeadingLinks",
  setup(__props) {
    const rows = [
      [
        h(
          resolveComponent("Link"),
          { removeUnderline: true, url: "https://www.example.com", key: "emerald-silk-gown" },
          () => "Emerald Silk Gown"
        ),
        "$875.00",
        124689,
        140,
        "$122,500.00"
      ],
      [
        h(
          resolveComponent("Link"),
          { removeUnderline: true, url: "https://www.example.com", key: "mauve-cashmere-scarf" },
          () => "Mauve Cashmere Scarf"
        ),
        "$230.00",
        124533,
        83,
        "$19,090.00"
      ],
      [
        h(
          resolveComponent("Link"),
          { removeUnderline: true, url: "https://www.example.com", key: "navy-merino-wool" },
          () => "Navy Merino Wool Blazer with khaki chinos and yellow belt"
        ),
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
                columnContentTypes: ["text", "numeric", "numeric", "numeric", "numeric"],
                headings: ["Product", "Price", "SKU Number", "Net quantity", "Net sales"],
                rows,
                totals: ["", "", "", 255, "$155,830.00"]
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
