import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Default",
  setup(__props) {
    const rangeValue = ref(32);
    return (_ctx, _cache) => {
      const _component_RangeSlider = resolveComponent("RangeSlider");
      const _component_LegacyCard = resolveComponent("LegacyCard");
      return openBlock(), createBlock(_component_LegacyCard, {
        sectioned: "",
        title: "Background color"
      }, {
        default: withCtx(() => [
          createVNode(_component_RangeSlider, {
            label: "Opacity percentage",
            modelValue: rangeValue.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => rangeValue.value = $event),
            output: ""
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
