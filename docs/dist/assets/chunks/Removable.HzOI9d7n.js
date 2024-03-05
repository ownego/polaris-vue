import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, F as Fragment, t as toDisplayString, a as createTextVNode, I as createVNode, c as createElementBlock, E as renderList } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Removable",
  setup(__props) {
    const selectedTags = ref([
      "Rustic",
      "Antique",
      "Vinyl",
      "Refurbished",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at ipsum quam. Aliquam fermentum bibendum vestibulum. Vestibulum condimentum luctus metus, sed sagittis magna pellentesque eget. Duis dapibus pretium nisi, et venenatis tortor dignissim ut. Quisque eget lacus ac ex eleifend ultrices. Phasellus facilisis ex sit amet leo elementum condimentum. Ut vel maximus felis. Etiam eget diam eu eros blandit interdum. Sed eu metus sed justo aliquam iaculis ac sit amet ex. Curabitur justo magna, porttitor non pulvinar eu, malesuada at leo. Cras mollis consectetur eros, quis maximus lorem dignissim at. Proin in rhoncus massa. Vivamus lectus nunc, fringilla euismod risus commodo, mattis blandit nulla."
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
                    onRemove: ($event) => handleRemove(option)
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
