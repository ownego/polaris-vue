import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, F as Fragment, t as toDisplayString, a as createTextVNode, I as createVNode, c as createElementBlock, E as renderList } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RemovableWithLink",
  setup(__props) {
    const selectedTags = ref([
      "Rustic",
      "Antique",
      "Vinyl",
      "Refurbished"
    ]);
    const handleRemove = (tag) => {
      selectedTags.value = selectedTags.value.filter((item) => item !== tag);
    };
    return (_ctx, _cache) => {
      const _component_Tag = resolveComponent("Tag");
      const _component_Card = resolveComponent("Card");
      const _component_LegacyStack = resolveComponent("LegacyStack");
      return openBlock(), createBlock(_component_LegacyStack, { spacing: "tight" }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(selectedTags.value, (option) => {
            return openBlock(), createElementBlock("div", null, [
              (openBlock(), createBlock(_component_Card, { key: option }, {
                default: withCtx(() => [
                  createVNode(_component_Tag, {
                    onRemove: ($event) => handleRemove(option),
                    url: "#"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(option), 1)
                    ]),
                    _: 2
                  }, 1032, ["onRemove"])
                ]),
                _: 2
              }, 1024))
            ]);
          }), 256))
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
