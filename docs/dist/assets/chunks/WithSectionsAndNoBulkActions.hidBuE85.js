import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, F as Fragment, I as createVNode, t as toDisplayString, a as createTextVNode, m as createBaseVNode, E as renderList, c as createElementBlock } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithSectionsAndNoBulkActions",
  setup(__props) {
    const resourceName = {
      singular: "customer",
      plural: "customers"
    };
    const items = [
      {
        id: "101",
        url: "#",
        name: "Mae Jemison",
        location: "Decatur, USA"
      },
      {
        id: "201",
        url: "#",
        name: "Ellen Ochoa",
        location: "Los Angeles, USA"
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
            resourceName,
            items,
            selectedItems: selectedItems.value,
            onSelectionChange: setSelectedItems,
            selectable: ""
          }, {
            default: withCtx(() => [
              (openBlock(), createElementBlock(Fragment, null, renderList(items, (item) => {
                return createVNode(_component_ResourceItem, {
                  key: item.id,
                  id: item.id,
                  url: item.url
                }, {
                  media: withCtx(() => [
                    createVNode(_component_Avatar, {
                      customer: "",
                      size: "md",
                      name: item.name
                    }, null, 8, ["name"])
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
                }, 1032, ["id", "url"]);
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
