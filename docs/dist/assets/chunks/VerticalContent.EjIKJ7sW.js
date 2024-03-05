import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, F as Fragment, t as toDisplayString, a as createTextVNode, I as createVNode, E as renderList, c as createElementBlock } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "VerticalContent",
  setup(__props) {
    const tags = ["Rustic", "Antique", "Vinyl", "Refurbished"];
    const textFieldValue = ref("");
    return (_ctx, _cache) => {
      const _component_Tag = resolveComponent("Tag");
      const _component_LegacyStack = resolveComponent("LegacyStack");
      const _component_TextField = resolveComponent("TextField");
      return openBlock(), createBlock(_component_TextField, {
        label: "Tags",
        modelValue: textFieldValue.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => textFieldValue.value = $event),
        placeholder: "Search tags",
        autoComplete: "off"
      }, {
        verticalContent: withCtx(() => [
          createVNode(_component_LegacyStack, {
            spacing: "extraTight",
            alignment: "center"
          }, {
            default: withCtx(() => [
              (openBlock(), createElementBlock(Fragment, null, renderList(tags, (tag) => {
                return createVNode(_component_Tag, { key: tag }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(tag), 1)
                  ]),
                  _: 2
                }, 1024);
              }), 64))
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"]);
    };
  }
});
export {
  _sfc_main as default
};
