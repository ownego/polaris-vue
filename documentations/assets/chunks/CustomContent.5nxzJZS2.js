import { o as openBlock, c as createElementBlock, m as createBaseVNode, d as defineComponent, D as resolveComponent, b as createBlock, w as withCtx, p as unref, I as createVNode } from "./framework.2IsXxFXf.js";
const _hoisted_1$1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20"
};
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("path", {
  "fill-rule": "evenodd",
  d: "M15.165 3.893a2 2 0 0 0-2.862 0l-8.238 8.438a2 2 0 0 0 0 2.795l.725.742a2 2 0 0 0 2.847.015l4.082-4.092.006-.006 4.208-4.312a1.999 1.999 0 0 0 0-2.794zM13.377 4.94c.196-.2.519-.2.715 0l.768.787a.5.5 0 0 1 0 .699l-1.048 1.073-1.484-1.484zM11.28 7.088l-6.142 6.291a.5.5 0 0 0 0 .699l.725.742a.5.5 0 0 0 .712.004l4.079-4.09 2.11-2.162z"
}, null, -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("path", { d: "M14.25 12a.75.75 0 0 1 .75.75v.75h.75a.75.75 0 0 1 0 1.5H15v.75a.75.75 0 0 1-1.5 0V15h-.75a.749.749 0 1 1 0-1.5h.75v-.75a.75.75 0 0 1 .75-.75M5.75 3.5a.75.75 0 0 1 .75.75V5h.75a.75.75 0 0 1 0 1.5H6.5v.75a.75.75 0 0 1-1.5 0V6.5h-.75a.75.75 0 1 1 0-1.5H5v-.75a.75.75 0 0 1 .75-.75" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$1, [..._hoisted_4]);
}
const WandIcon = { render };
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("span", null, "Wholesale", -1);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CustomContent",
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_Icon = resolveComponent("Icon");
      const _component_LegacyStack = resolveComponent("LegacyStack");
      const _component_Tag = resolveComponent("Tag");
      const _component_Card = resolveComponent("Card");
      return openBlock(), createBlock(_component_Card, null, {
        default: withCtx(() => [
          createVNode(_component_Tag, { url: "#" }, {
            default: withCtx(() => [
              createVNode(_component_LegacyStack, { spacing: "extraTight" }, {
                default: withCtx(() => [
                  createVNode(_component_Icon, { source: unref(WandIcon) }, null, 8, ["source"]),
                  _hoisted_1
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
