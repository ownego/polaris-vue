import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, t as toDisplayString, m as createBaseVNode, I as createVNode } from "./framework.2IsXxFXf.js";
const _hoisted_1 = { style: { minWidth: "24px", textAlign: "right" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PrefixSuffix",
  setup(__props) {
    const rangeValue = ref(100);
    return (_ctx, _cache) => {
      const _component_RangeSlider = resolveComponent("RangeSlider");
      const _component_LegacyCard = resolveComponent("LegacyCard");
      return openBlock(), createBlock(_component_LegacyCard, {
        sectioned: "",
        title: "Text color"
      }, {
        default: withCtx(() => [
          createVNode(_component_RangeSlider, {
            output: "",
            label: "Hue color mix",
            min: 0,
            max: 360,
            modelValue: rangeValue.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => rangeValue.value = $event),
            prefix: "Hue"
          }, {
            suffix: withCtx(() => [
              createBaseVNode("p", _hoisted_1, toDisplayString(rangeValue.value), 1)
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
