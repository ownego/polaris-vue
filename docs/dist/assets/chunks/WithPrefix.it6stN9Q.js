import { C as ChevronRightIcon } from "./Preview.vue_vue_type_style_index_0_lang.vIfP4F2u.js";
import { d as defineComponent, a3 as h, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode } from "./framework.1qnja6qJ.js";
const _hoisted_1 = { style: { "height": "250px", "maxWidth": "350px" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithPrefix",
  setup(__props) {
    const prefixHere = h(resolveComponent("Thumbnail"), {
      source: "https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg",
      size: "small",
      alt: "Black leather choker necklace"
    });
    const prefixThere = h(resolveComponent("Avatar"), { customer: true, name: "Farrah", size: "sm" });
    const suffix = h(resolveComponent("Icon"), { source: ChevronRightIcon });
    const actionListItem = [
      {
        content: "Go here",
        prefix: prefixHere,
        suffix
      },
      {
        content: "Or there",
        prefix: prefixThere,
        suffix
      }
    ];
    return (_ctx, _cache) => {
      const _component_ActionList = resolveComponent("ActionList");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_ActionList, { items: actionListItem })
      ]);
    };
  }
});
export {
  _sfc_main as default
};
