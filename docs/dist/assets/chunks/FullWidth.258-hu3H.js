import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode } from "./framework.1qnja6qJ.js";
const _hoisted_1 = { style: { width: "100%" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FullWidth",
  setup(__props) {
    const color = ref({
      hue: 300,
      brightness: 1,
      saturation: 0.7,
      alpha: 0.7
    });
    return (_ctx, _cache) => {
      const _component_ColorPicker = resolveComponent("ColorPicker");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_ColorPicker, {
          modelValue: color.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => color.value = $event),
          "full-width": "",
          "allow-alpha": ""
        }, null, 8, ["modelValue"])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
