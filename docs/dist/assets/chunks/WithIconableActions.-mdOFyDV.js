import { o as openBlock, c as createElementBlock, m as createBaseVNode, d as defineComponent, D as resolveComponent, b as createBlock, w as withCtx, p as unref } from "./framework.2IsXxFXf.js";
const _hoisted_1$2 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20"
};
const _hoisted_2$1 = /* @__PURE__ */ createBaseVNode("path", { d: "M11.5 7a.75.75 0 0 0-.75.75v1.5a.75.75 0 0 0 1.5 0v-1.5A.75.75 0 0 0 11.5 7M7.75 7.75a.75.75 0 0 1 1.5 0v1.5a.75.75 0 0 1-1.5 0z" }, null, -1);
const _hoisted_3$1 = /* @__PURE__ */ createBaseVNode("path", { d: "M11.522 11.983a2.5 2.5 0 0 1-3.937-1.336.75.75 0 1 0-1.449.388 4 4 0 0 0 7.728 0 .75.75 0 0 0-1.45-.388 2.5 2.5 0 0 1-.892 1.336" }, null, -1);
const _hoisted_4 = /* @__PURE__ */ createBaseVNode("path", {
  "fill-rule": "evenodd",
  d: "M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0m-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
}, null, -1);
const _hoisted_5 = [
  _hoisted_2$1,
  _hoisted_3$1,
  _hoisted_4
];
function render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$2, [..._hoisted_5]);
}
const SmileyHappyIcon = { render: render$1 };
const _hoisted_1$1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20"
};
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("path", {
  "fill-rule": "evenodd",
  d: "M15.5 10a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0m1.5 0a7 7 0 1 1-14 0 7 7 0 0 1 14 0m-7.957 2.69a2.5 2.5 0 0 1 2.725.542.75.75 0 1 0 1.06-1.06 3.998 3.998 0 0 0-5.656 0 .75.75 0 1 0 1.06 1.06 2.5 2.5 0 0 1 .811-.542m1.707-4.94a.75.75 0 0 1 1.5 0v1.5a.75.75 0 0 1-1.5 0zM8.5 7a.75.75 0 0 0-.75.75v1.5a.75.75 0 0 0 1.5 0v-1.5A.75.75 0 0 0 8.5 7"
}, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$1, [..._hoisted_3]);
}
const SmileySadIcon = { render };
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("p", null, "How do you like our app?", -1);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithIconableActions",
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_CalloutCard = resolveComponent("CalloutCard");
      return openBlock(), createBlock(_component_CalloutCard, {
        title: "Tell us how we're doing",
        illustration: "https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg",
        primaryAction: {
          content: "Good",
          icon: unref(SmileyHappyIcon)
        },
        secondaryAction: {
          content: "Bad",
          icon: unref(SmileySadIcon),
          variant: "secondary"
        }
      }, {
        default: withCtx(() => [
          _hoisted_1
        ]),
        _: 1
      }, 8, ["primaryAction", "secondaryAction"]);
    };
  }
});
export {
  _sfc_main as default
};
