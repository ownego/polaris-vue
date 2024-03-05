import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode, m as createBaseVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
const _hoisted_1 = { style: { "background": "var(--p-color-text-info)", "height": "height", "width": "width" } };
const _hoisted_2 = { style: { "color": "'var(--p-color-text-info-on-bg-fill)" } };
const _hoisted_3 = { style: { "background": "var(--p-color-text-info)", "height": "height", "width": "width" } };
const _hoisted_4 = { style: { "color": "var(--p-color-text-info-on-bg-fill)" } };
const _hoisted_5 = { style: { "background": "var(--p-color-text-info)", "height": "height", "width": "width" } };
const _hoisted_6 = { style: { "color": "var(--p-color-text-info-on-bg-fill)" } };
const _hoisted_7 = { style: { "background": "var(--p-color-text-info)", "height": "height", "width": "width" } };
const _hoisted_8 = { style: { "color": "var(--p-color-text-info-on-bg-fill)" } };
function _sfc_render(_ctx, _cache) {
  const _component_Text = resolveComponent("Text");
  const _component_Card = resolveComponent("Card");
  const _component_BlockStack = resolveComponent("BlockStack");
  return openBlock(), createBlock(_component_BlockStack, { gap: "400" }, {
    default: withCtx(() => [
      createVNode(_component_Card, null, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1, [
            createBaseVNode("div", _hoisted_2, [
              createVNode(_component_Text, {
                as: "h2",
                variant: "bodyMd",
                tone: "text-inverse"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Content inside a card ")
                ]),
                _: 1
              })
            ])
          ])
        ]),
        _: 1
      }),
      createVNode(_component_Card, { padding: "400" }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createVNode(_component_Text, {
                as: "h2",
                variant: "bodyMd",
                tone: "text-inverse"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Content inside a card ")
                ]),
                _: 1
              })
            ])
          ])
        ]),
        _: 1
      }),
      createVNode(_component_Card, { padding: "200" }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("div", _hoisted_6, [
              createVNode(_component_Text, {
                as: "h2",
                variant: "bodyMd",
                tone: "text-inverse"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Content inside a card ")
                ]),
                _: 1
              })
            ])
          ])
        ]),
        _: 1
      }),
      createVNode(_component_Card, { padding: "0" }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_7, [
            createBaseVNode("div", _hoisted_8, [
              createVNode(_component_Text, {
                as: "h2",
                variant: "bodyMd",
                tone: "text-inverse"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Content inside a card ")
                ]),
                _: 1
              })
            ])
          ])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const VaryingPadding = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  VaryingPadding as default
};
