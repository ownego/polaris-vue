import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Text = resolveComponent("Text");
  const _component_ListItem = resolveComponent("ListItem");
  const _component_List = resolveComponent("List");
  const _component_Box = resolveComponent("Box");
  const _component_BlockStack = resolveComponent("BlockStack");
  const _component_Bleed = resolveComponent("Bleed");
  const _component_Card = resolveComponent("Card");
  return openBlock(), createBlock(_component_Card, { roundedAbove: "sm" }, {
    default: withCtx(() => [
      createVNode(_component_BlockStack, { gap: "200" }, {
        default: withCtx(() => [
          createVNode(_component_Text, {
            as: "h2",
            variant: "headingSm"
          }, {
            default: withCtx(() => [
              createTextVNode(" Staff accounts ")
            ]),
            _: 1
          }),
          createVNode(_component_Box, { paddingBlockEnd: "200" }, {
            default: withCtx(() => [
              createVNode(_component_List, null, {
                default: withCtx(() => [
                  createVNode(_component_ListItem, null, {
                    default: withCtx(() => [
                      createTextVNode("Felix Crafford")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_ListItem, null, {
                    default: withCtx(() => [
                      createTextVNode("Ezequiel Manno")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_Bleed, {
        marginBlockEnd: "400",
        marginInline: "400"
      }, {
        default: withCtx(() => [
          createVNode(_component_Box, {
            background: "bg-surface-secondary",
            padding: "400"
          }, {
            default: withCtx(() => [
              createVNode(_component_BlockStack, { gap: "200" }, {
                default: withCtx(() => [
                  createVNode(_component_Text, {
                    as: "h3",
                    variant: "headingSm",
                    fontWeight: "medium"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Deactivated staff accounts ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_List, null, {
                    default: withCtx(() => [
                      createVNode(_component_ListItem, null, {
                        default: withCtx(() => [
                          createTextVNode("Felix Crafford")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ListItem, null, {
                        default: withCtx(() => [
                          createTextVNode("Ezequiel Manno")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
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
}
const SubduedSection = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  SubduedSection as default
};
