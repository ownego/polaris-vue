import { o as openBlock, c as createElementBlock, m as createBaseVNode, d as defineComponent, D as resolveComponent, b as createBlock, p as unref } from "./framework.1qnja6qJ.js";
const _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20"
};
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("circle", {
  cx: "10",
  cy: "10",
  r: "10",
  fill: "#639"
}, null, -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("circle", {
  cx: "10",
  cy: "10",
  r: "6",
  fill: "currentColor"
}, null, -1);
const _hoisted_4 = /* @__PURE__ */ createBaseVNode("circle", {
  cx: "10",
  cy: "10",
  r: "3"
}, null, -1);
const _hoisted_5 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4
];
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, [..._hoisted_5]);
}
const CustomSvg = { render };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CustomSvgColor",
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_Icon = resolveComponent("Icon");
      return openBlock(), createBlock(_component_Icon, {
        source: unref(CustomSvg),
        tone: "warning"
      }, null, 8, ["source"]);
    };
  }
});
export {
  _sfc_main as default
};
