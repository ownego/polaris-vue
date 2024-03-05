import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, F as Fragment, t as toDisplayString, a as createTextVNode, I as createVNode, c as createElementBlock, e as createCommentVNode, E as renderList } from "./framework.2IsXxFXf.js";
const _hoisted_1 = { key: 0 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Default",
  setup(__props) {
    const items = [
      {
        id: "6",
        url: "posts/6",
        title: "How To Get Value From Wireframes",
        author: "Jonathan Mangrove"
      }
    ];
    const selectedItems = ref([]);
    const onSelectionChange = (value) => {
      selectedItems.value = value;
    };
    return (_ctx, _cache) => {
      const _component_Text = resolveComponent("Text");
      const _component_ResourceItem = resolveComponent("ResourceItem");
      const _component_ResourceList = resolveComponent("ResourceList");
      const _component_LegacyCard = resolveComponent("LegacyCard");
      return openBlock(), createBlock(_component_LegacyCard, null, {
        default: withCtx(() => [
          createVNode(_component_ResourceList, {
            selectable: "",
            resourceName: { singular: "blog post", plural: "blog posts" },
            items,
            selectedItems: selectedItems.value,
            onSelectionChange
          }, {
            default: withCtx(() => [
              (openBlock(), createElementBlock(Fragment, null, renderList(items, (item) => {
                return createVNode(_component_ResourceItem, {
                  id: `${item.id}`,
                  url: item.url,
                  accessibilityLabel: `View details for ${item.title}`,
                  name: item.title
                }, {
                  default: withCtx(() => [
                    createVNode(_component_Text, {
                      variation: "bodyMd",
                      "font-weight": "bold",
                      as: "h3"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(item.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    item.author ? (openBlock(), createElementBlock("div", _hoisted_1, "by " + toDisplayString(item.author), 1)) : createCommentVNode("", true)
                  ]),
                  _: 2
                }, 1032, ["id", "url", "accessibilityLabel", "name"]);
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
