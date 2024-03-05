import { o as openBlock, c as createElementBlock, m as createBaseVNode, d as defineComponent, D as resolveComponent, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode, p as unref } from "./framework.1qnja6qJ.js";
const _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20"
};
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("path", { d: "M11.75 3.5a.75.75 0 0 0 0 1.5h2.19L8.97 9.97a.75.75 0 1 0 1.06 1.06L15 6.06v2.19a.75.75 0 0 0 1.5 0v-4a.75.75 0 0 0-.75-.75z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("path", { d: "M15 10.967a.75.75 0 0 0-1.5 0v2.783c0 .69-.56 1.25-1.25 1.25h-6C5.56 15 5 14.44 5 13.75v-6c0-.69.56-1.25 1.25-1.25h2.783a.75.75 0 0 0 0-1.5H6.25A2.75 2.75 0 0 0 3.5 7.75v6a2.75 2.75 0 0 0 2.75 2.75h6A2.75 2.75 0 0 0 15 13.75z" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, [..._hoisted_4]);
}
const ExternalIcon = { render };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PageWithExternalLink",
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_Text = resolveComponent("Text");
      const _component_LegacyCard = resolveComponent("LegacyCard");
      const _component_Page = resolveComponent("Page");
      return openBlock(), createBlock(_component_Page, {
        title: "Jar With Lock-Lid",
        primaryAction: { content: "Save", disabled: true },
        secondaryActions: [
          {
            content: "Promote",
            external: true,
            icon: unref(ExternalIcon),
            url: "https://www.facebook.com/business/learn/facebook-page-build-audience"
          }
        ]
      }, {
        default: withCtx(() => [
          createVNode(_component_LegacyCard, {
            title: "Credit card",
            sectioned: ""
          }, {
            default: withCtx(() => [
              createVNode(_component_Text, { as: "p" }, {
                default: withCtx(() => [
                  createTextVNode("Credit card information")
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["secondaryActions"]);
    };
  }
});
export {
  _sfc_main as default
};
