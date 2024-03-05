import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode, m as createBaseVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Text = resolveComponent("Text");
  const _component_BlockStack = resolveComponent("BlockStack");
  const _component_Card = resolveComponent("Card");
  return openBlock(), createBlock(_component_Card, { roundedAbove: "sm" }, {
    default: withCtx(() => [
      createVNode(_component_BlockStack, { gap: "400" }, {
        default: withCtx(() => [
          createVNode(_component_BlockStack, { gap: "200" }, {
            default: withCtx(() => [
              createVNode(_component_Text, {
                as: "h2",
                variant: "headingSm"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Customer ")
                ]),
                _: 1
              }),
              createVNode(_component_Text, {
                as: "p",
                variant: "bodyMd"
              }, {
                default: withCtx(() => [
                  createTextVNode(" John Smith ")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createBaseVNode("div", null, [
            createVNode(_component_BlockStack, { gap: "200" }, {
              default: withCtx(() => [
                createVNode(_component_Text, {
                  as: "h3",
                  variant: "headingSm",
                  fontWeight: "medium"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Addresses ")
                  ]),
                  _: 1
                }),
                createBaseVNode("div", null, [
                  createVNode(_component_Text, {
                    as: "p",
                    variant: "bodyMd"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" 123 First St ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Text, {
                    as: "p",
                    variant: "bodyMd"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Somewhere ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Text, {
                    as: "p",
                    variant: "bodyMd"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" The Universe ")
                    ]),
                    _: 1
                  })
                ]),
                createBaseVNode("div", null, [
                  createVNode(_component_Text, {
                    as: "p",
                    variant: "bodyMd"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" 123 Second St ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Text, {
                    as: "p",
                    variant: "bodyMd"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Somewhere ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Text, {
                    as: "p",
                    variant: "bodyMd"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" The Universe ")
                    ]),
                    _: 1
                  })
                ])
              ]),
              _: 1
            })
          ]),
          createBaseVNode("div", null, [
            createVNode(_component_Text, {
              as: "p",
              variant: "bodyMd"
            }, {
              default: withCtx(() => [
                createTextVNode(" A single subsection without a sibling has no visual appearance ")
              ]),
              _: 1
            })
          ])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const Subsection = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Subsection as default
};
