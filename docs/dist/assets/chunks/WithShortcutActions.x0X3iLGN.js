import { d as defineComponent, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, F as Fragment, I as createVNode, t as toDisplayString, a as createTextVNode, m as createBaseVNode, E as renderList, c as createElementBlock } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithShortcutActions",
  setup(__props) {
    const items = [
      {
        id: "145",
        url: "#",
        avatarSource: "https://burst.shopifycdn.com/photos/freelance-designer-working-on-laptop.jpg?width=746",
        name: "Yi So-Yeon",
        location: "Gwangju, South Korea",
        latestOrderUrl: "#"
      }
    ];
    return (_ctx, _cache) => {
      const _component_Avatar = resolveComponent("Avatar");
      const _component_Text = resolveComponent("Text");
      const _component_ResourceItem = resolveComponent("ResourceItem");
      const _component_ResourceList = resolveComponent("ResourceList");
      const _component_LegacyCard = resolveComponent("LegacyCard");
      return openBlock(), createBlock(_component_LegacyCard, null, {
        default: withCtx(() => [
          createVNode(_component_ResourceList, {
            resourceName: { singular: "customer", plural: "customers" },
            items,
            showHeader: false
          }, {
            default: withCtx(() => [
              (openBlock(), createElementBlock(Fragment, null, renderList(items, (item) => {
                return createVNode(_component_ResourceItem, {
                  key: item.id,
                  id: item.id,
                  url: item.url,
                  accessibilityLabel: `View details for ${item.name}`,
                  name: item.name,
                  shortcutActions: item.latestOrderUrl ? [{ content: "View latest order", url: item.latestOrderUrl }] : null
                }, {
                  media: withCtx(() => [
                    createVNode(_component_Avatar, {
                      customer: "",
                      size: "md",
                      name: item.name,
                      source: item.avatarSource
                    }, null, 8, ["name", "source"])
                  ]),
                  default: withCtx(() => [
                    createVNode(_component_Text, {
                      variant: "bodyMd",
                      fontWeight: "bold",
                      as: "h3"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(item.name), 1)
                      ]),
                      _: 2
                    }, 1024),
                    createBaseVNode("div", null, toDisplayString(item.location), 1)
                  ]),
                  _: 2
                }, 1032, ["id", "url", "accessibilityLabel", "name", "shortcutActions"]);
              }), 64))
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
