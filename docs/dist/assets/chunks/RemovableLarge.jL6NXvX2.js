import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode, F as Fragment, t as toDisplayString, E as renderList, c as createElementBlock } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RemovableLarge",
  setup(__props) {
    const selectedTags = ref([
      "Rustic",
      "Antique",
      "Vinyl",
      "Refurbished"
    ]);
    const removeTag = (tag) => () => {
      selectedTags.value = selectedTags.value.filter((selectedTag) => selectedTag !== tag);
    };
    return (_ctx, _cache) => {
      const _component_Text = resolveComponent("Text");
      const _component_Tag = resolveComponent("Tag");
      const _component_LegacyStack = resolveComponent("LegacyStack");
      const _component_Card = resolveComponent("Card");
      const _component_BlockStack = resolveComponent("BlockStack");
      return openBlock(), createBlock(_component_BlockStack, { gap: "100" }, {
        default: withCtx(() => [
          createVNode(_component_Card, null, {
            default: withCtx(() => [
              createVNode(_component_Text, { as: "p" }, {
                default: withCtx(() => [
                  createTextVNode("Large")
                ]),
                _: 1
              }),
              createVNode(_component_LegacyStack, { spacing: "tight" }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(selectedTags.value, (option) => {
                    return openBlock(), createBlock(_component_Tag, {
                      key: option,
                      size: "large",
                      onRemove: ($event) => removeTag(option)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(option), 1)
                      ]),
                      _: 2
                    }, 1032, ["onRemove"]);
                  }), 128))
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_Card, null, {
            default: withCtx(() => [
              createVNode(_component_Text, { as: "p" }, {
                default: withCtx(() => [
                  createTextVNode("Large with link")
                ]),
                _: 1
              }),
              createVNode(_component_LegacyStack, { spacing: "tight" }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(selectedTags.value, (option) => {
                    return openBlock(), createBlock(_component_Tag, {
                      key: option,
                      size: "large",
                      url: "#",
                      onRemove: ($event) => removeTag(option)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(option), 1)
                      ]),
                      _: 2
                    }, 1032, ["onRemove"]);
                  }), 128))
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
