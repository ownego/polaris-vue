import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Badge = resolveComponent("Badge");
  const _component_Text = resolveComponent("Text");
  const _component_LegacyCard = resolveComponent("LegacyCard");
  const _component_Page = resolveComponent("Page");
  return openBlock(), createBlock(_component_Page, {
    title: "3/4 inch Leather pet collar",
    subtitle: "Perfect for any pet",
    compactTitle: "",
    backAction: { content: "Products", url: "#" },
    primaryAction: { content: "Save", disabled: true },
    secondaryActions: [
      {
        content: "Duplicate",
        accessibilityLabel: "Secondary action label",
        onAction: () => console.log("Duplicate action")
      },
      {
        content: "View on your store",
        onAction: () => console.log("View on your store action")
      }
    ],
    actionGroups: [
      {
        title: "Promote",
        actions: [
          {
            content: "Share on Facebook",
            accessibilityLabel: "Individual action label",
            onAction: () => console.log("Share on Facebook action")
          }
        ]
      }
    ],
    pagination: {
      hasPrevious: true,
      hasNext: true
    }
  }, {
    pageTitle: withCtx(() => [
      createVNode(_component_Badge, { tone: "success" }, {
        default: withCtx(() => [
          createTextVNode("Paid")
        ]),
        _: 1
      })
    ]),
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
  }, 8, ["secondaryActions", "actionGroups"]);
}
const Default = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Default as default
};
