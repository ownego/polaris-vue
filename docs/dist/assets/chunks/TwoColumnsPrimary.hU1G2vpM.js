import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Text = resolveComponent("Text");
  const _component_Box = resolveComponent("Box");
  const _component_Card = resolveComponent("Card");
  const _component_LayoutSection = resolveComponent("LayoutSection");
  const _component_Layout = resolveComponent("Layout");
  const _component_Page = resolveComponent("Page");
  return openBlock(), createBlock(_component_Page, { fullWidth: "" }, {
    default: withCtx(() => [
      createVNode(_component_Layout, null, {
        default: withCtx(() => [
          createVNode(_component_LayoutSection, null, {
            default: withCtx(() => [
              createVNode(_component_Card, { roundedAbove: "sm" }, {
                default: withCtx(() => [
                  createVNode(_component_Text, {
                    as: "h2",
                    variant: "headingSm"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Order details ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Box, { paddingBlockStart: "200" }, {
                    default: withCtx(() => [
                      createVNode(_component_Text, {
                        as: "p",
                        variant: "bodyMd"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Use to follow a normal section with a secondary section to create a 2/3 + 1/3 layout on detail pages (such as individual product or order pages). Can also be used on any page that needs to structure a lot of content. This layout stacks the columns on small screens. ")
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
          createVNode(_component_LayoutSection, { variant: "oneThird" }, {
            default: withCtx(() => [
              createVNode(_component_Card, { roundedAbove: "sm" }, {
                default: withCtx(() => [
                  createVNode(_component_Text, {
                    as: "h2",
                    variant: "headingSm"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Tags")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Box, { paddingBlockStart: "200" }, {
                    default: withCtx(() => [
                      createVNode(_component_Text, {
                        as: "p",
                        variant: "bodyMd"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Add tags to your order.")
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
const TwoColumnsPrimary = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  TwoColumnsPrimary as default
};
