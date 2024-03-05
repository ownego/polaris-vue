import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MinMax",
  setup(__props) {
    const rangeValue = ref(0);
    return (_ctx, _cache) => {
      const _component_RangeSlider = resolveComponent("RangeSlider");
      const _component_LegacyCard = resolveComponent("LegacyCard");
      return openBlock(), createBlock(_component_LegacyCard, {
        sectioned: "",
        title: "Navigation branding"
      }, {
        default: withCtx(() => [
          createVNode(_component_RangeSlider, {
            output: "",
            label: "Logo offset",
            min: -20,
            max: 20,
            modelValue: rangeValue.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => rangeValue.value = $event)
          }, null, 8, ["modelValue"])
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
