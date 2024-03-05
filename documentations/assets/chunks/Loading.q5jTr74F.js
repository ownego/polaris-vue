import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, F as Fragment, I as createVNode, t as toDisplayString, a as createTextVNode, m as createBaseVNode, E as renderList, c as createElementBlock } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Loading",
  setup(__props) {
    const resourceName = {
      singular: "customer",
      plural: "customers"
    };
    const items = [
      {
        id: "103",
        url: "#",
        name: "Mae Jemison",
        location: "Decatur, USA"
      },
      {
        id: "203",
        url: "#",
        name: "Ellen Ochoa",
        location: "Los Angeles, USA"
      }
    ];
    const promotedBulkActions = [
      {
        content: "Edit customers",
        onAction: () => console.log("Todo: implement bulk edit")
      }
    ];
    const bulkActions = [
      {
        content: "Add tags",
        onAction: () => console.log("Todo: implement bulk add tags")
      },
      {
        content: "Remove tags",
        onAction: () => console.log("Todo: implement bulk remove tags")
      },
      {
        content: "Delete customers",
        onAction: () => console.log("Todo: implement bulk delete")
      }
    ];
    const selectedItems = ref([]);
    const setSelectedItems = (selected) => {
      selectedItems.value = selected;
    };
    return (_ctx, _cache) => {
      const _component_Avatar = resolveComponent("Avatar");
      const _component_Text = resolveComponent("Text");
      const _component_ResourceItem = resolveComponent("ResourceItem");
      const _component_ResourceList = resolveComponent("ResourceList");
      const _component_LegacyCard = resolveComponent("LegacyCard");
      return openBlock(), createBlock(_component_LegacyCard, null, {
        default: withCtx(() => [
          createVNode(_component_ResourceList, {
            loading: "",
            resourceName,
            items,
            selectedItems: selectedItems.value,
            promotedBulkActions,
            bulkActions,
            onSelectionChange: setSelectedItems
          }, {
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
          }, 8, ["selectedItems"])
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
