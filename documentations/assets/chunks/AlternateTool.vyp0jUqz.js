import { d as defineComponent, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode, F as Fragment, t as toDisplayString, m as createBaseVNode, E as renderList, c as createElementBlock } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AlternateTool",
  setup(__props) {
    const items = [
      {
        id: "100",
        url: "#",
        name: "Mae Jemison",
        location: "Decatur, USA"
      },
      {
        id: "200",
        url: "#",
        name: "Ellen Ochoa",
        location: "Los Angeles, USA"
      }
    ];
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Avatar = resolveComponent("Avatar");
      const _component_Text = resolveComponent("Text");
      const _component_ResourceItem = resolveComponent("ResourceItem");
      const _component_ResourceList = resolveComponent("ResourceList");
      const _component_LegacyCard = resolveComponent("LegacyCard");
      return openBlock(), createBlock(_component_LegacyCard, null, {
        default: withCtx(() => [
          createVNode(_component_ResourceList, {
            resourceName: { singular: "customer", plural: "customers" },
            items
          }, {
            alternateTool: withCtx(() => [
              createVNode(_component_Button, null, {
                default: withCtx(() => [
                  createTextVNode("Email customers")
                ]),
                _: 1
              })
            ]),
            default: withCtx(() => [
              (openBlock(), createElementBlock(Fragment, null, renderList(items, ({ id, url, name, location }) => {
                return createVNode(_component_ResourceItem, {
                  key: id,
                  id,
                  url,
                  accessibilityLabel: `View details for ${name}`
                }, {
                  media: withCtx(() => [
                    createVNode(_component_Avatar, {
                      customer: "",
                      size: "md",
                      name
                    }, null, 8, ["name"])
                  ]),
                  default: withCtx(() => [
                    createVNode(_component_Text, {
                      variant: "bodyMd",
                      fontWeight: "bold",
                      as: "h3"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(name), 1)
                      ]),
                      _: 2
                    }, 1024),
                    createBaseVNode("div", null, toDisplayString(location), 1)
                  ]),
                  _: 2
                }, 1032, ["id", "url", "accessibilityLabel"]);
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
