import { o as openBlock, c as createElementBlock, m as createBaseVNode, d as defineComponent, h as ref, a3 as h, D as resolveComponent, b as createBlock } from "./framework.1qnja6qJ.js";
const _hoisted_1$1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20"
};
const _hoisted_2$1 = /* @__PURE__ */ createBaseVNode("path", {
  "fill-rule": "evenodd",
  d: "M6.24 8.2a.75.75 0 0 1 1.06.04l2.7 2.908 2.7-2.908a.75.75 0 1 1 1.1 1.02l-3.25 3.5a.75.75 0 0 1-1.1 0L6.2 9.26a.75.75 0 0 1 .04-1.06"
}, null, -1);
const _hoisted_3$1 = [
  _hoisted_2$1
];
function render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$1, [..._hoisted_3$1]);
}
const CaretDownIcon = { render: render$1 };
const _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20"
};
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("path", {
  "fill-rule": "evenodd",
  d: "M6.24 11.8a.75.75 0 0 0 1.06-.04L10 8.852l2.7 2.908a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 0 0 .04 1.06"
}, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, [..._hoisted_3]);
}
const CaretUpIcon = { render };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithPrefix",
  setup(__props) {
    const selected = ref("enabled");
    const caretUp = h(resolveComponent("Icon"), { source: CaretUpIcon });
    const caretDown = h(resolveComponent("Icon"), { source: CaretDownIcon });
    const options = [
      {
        label: "Increase",
        value: "Increase",
        prefix: caretUp
      },
      {
        label: "Decrease",
        value: "Decrease",
        prefix: caretDown
      }
    ];
    return (_ctx, _cache) => {
      const _component_Select = resolveComponent("Select");
      return openBlock(), createBlock(_component_Select, {
        label: "Permission",
        options,
        modelValue: selected.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selected.value = $event)
      }, null, 8, ["modelValue"]);
    };
  }
});
export {
  _sfc_main as default
};
