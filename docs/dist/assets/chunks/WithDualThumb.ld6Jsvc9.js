import { d as defineComponent, h as ref, k as computed, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode, m as createBaseVNode } from "./framework.2IsXxFXf.js";
const prefix = "$";
const min = 0;
const max = 2e3;
const step = 10;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithDualThumb",
  setup(__props) {
    const rangeValue = ref([900, 1e3]);
    const lowerTextFieldValue = computed({
      get: () => `${rangeValue.value[0]}`,
      set: () => {
      }
    });
    const upperTextFieldValue = computed({
      get: () => `${rangeValue.value[1]}`,
      set: () => {
      }
    });
    const handleLowerTextFieldChange = (value) => {
      rangeValue.value = [Number(value), rangeValue.value[1]];
      if (rangeValue.value[0] > rangeValue.value[1]) {
        rangeValue.value = [rangeValue.value[1], rangeValue.value[1]];
      }
    };
    const handleUpperTextFieldChange = (value) => {
      rangeValue.value = [rangeValue.value[0], Number(value)];
      if (rangeValue.value[0] > rangeValue.value[1]) {
        rangeValue.value = [rangeValue.value[0], rangeValue.value[0]];
      }
    };
    return (_ctx, _cache) => {
      const _component_RangeSlider = resolveComponent("RangeSlider");
      const _component_TextField = resolveComponent("TextField");
      const _component_LegacyStack = resolveComponent("LegacyStack");
      const _component_LegacyCard = resolveComponent("LegacyCard");
      return openBlock(), createBlock(_component_LegacyCard, {
        sectioned: "",
        title: "Minimum requirements"
      }, {
        default: withCtx(() => [
          createBaseVNode("div", null, [
            createVNode(_component_RangeSlider, {
              output: "",
              label: "Money spent is between",
              modelValue: rangeValue.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => rangeValue.value = $event),
              prefix,
              min,
              max,
              step
            }, null, 8, ["modelValue"]),
            createVNode(_component_LegacyStack, {
              distribution: "equalSpacing",
              spacing: "extraLoose"
            }, {
              default: withCtx(() => [
                createVNode(_component_TextField, {
                  label: "Min money spent",
                  type: "number",
                  modelValue: lowerTextFieldValue.value,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => lowerTextFieldValue.value = $event),
                  prefix,
                  min,
                  max,
                  step,
                  autoComplete: "off",
                  onChange: handleLowerTextFieldChange
                }, null, 8, ["modelValue"]),
                createVNode(_component_TextField, {
                  label: "Max money spent",
                  type: "number",
                  modelValue: upperTextFieldValue.value,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => upperTextFieldValue.value = $event),
                  prefix,
                  min,
                  max,
                  step,
                  autoComplete: "off",
                  onChange: handleUpperTextFieldChange
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            })
          ])
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
