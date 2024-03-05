import { _ as _sfc_main$1 } from "./Placeholder.vue_vue_type_script_setup_true_lang.HIYQJAtJ.js";
import { d as defineComponent, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode, m as createBaseVNode } from "./framework.1qnja6qJ.js";
const _hoisted_1 = { style: { width: "586px" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Padding",
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_Box = resolveComponent("Box");
      const _component_InlineStack = resolveComponent("InlineStack");
      const _component_BlockStack = resolveComponent("BlockStack");
      return openBlock(), createBlock(_component_BlockStack, { gap: "400" }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1, [
            createVNode(_component_Box, {
              padding: "400",
              width: "586px",
              background: "bg-fill-info"
            }, {
              default: withCtx(() => [
                createVNode(_sfc_main$1, {
                  label: "padding",
                  childAlign: "center"
                })
              ]),
              _: 1
            })
          ]),
          createVNode(_component_InlineStack, { gap: "400" }, {
            default: withCtx(() => [
              createVNode(_component_Box, {
                paddingInline: "400",
                width: "586px",
                background: "bg-fill-info"
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$1, {
                    label: "paddingInline",
                    childAlign: "center"
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Box, {
                paddingInlineStart: "400",
                width: "284px",
                background: "bg-fill-info"
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$1, {
                    label: "paddingInlineStart",
                    childAlign: "start"
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Box, {
                paddingInlineEnd: "400",
                width: "284px",
                background: "bg-fill-info"
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$1, {
                    label: "paddingInlineEnd",
                    childAlign: "end"
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_InlineStack, { gap: "400" }, {
            default: withCtx(() => [
              createVNode(_component_Box, {
                paddingBlock: "400",
                width: "586px",
                background: "bg-fill-info"
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$1, {
                    label: "paddingBlock",
                    childAlign: "center"
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Box, {
                paddingBlockStart: "400",
                width: "284px",
                background: "bg-fill-info"
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$1, {
                    label: "paddingBlockStart",
                    childAlign: "center"
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Box, {
                paddingBlockEnd: "400",
                width: "284px",
                background: "bg-fill-info"
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$1, {
                    label: "paddingBlockEnd",
                    childAlign: "center"
                  })
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
