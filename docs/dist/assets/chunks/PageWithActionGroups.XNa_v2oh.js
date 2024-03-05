import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Text = resolveComponent("Text");
  const _component_LegacyCard = resolveComponent("LegacyCard");
  const _component_Page = resolveComponent("Page");
  return openBlock(), createBlock(_component_Page, {
    title: "Products",
    actionGroups: [
      {
        title: "Copy",
        onClick: () => {
          console.log("Copy action");
        },
        actions: [{ content: "Copy to clipboard" }]
      },
      {
        title: "Promote",
        disabled: true,
        actions: [{ content: "Share on Facebook" }]
      },
      {
        title: "More actions",
        actions: [
          { content: "Duplicate" },
          { content: "Print" },
          { content: "Unarchive" },
          { content: "Cancel order" }
        ]
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
  }, 8, ["actionGroups"]);
}
const PageWithActionGroups = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  PageWithActionGroups as default
};
