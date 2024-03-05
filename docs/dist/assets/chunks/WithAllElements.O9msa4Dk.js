import { d as defineComponent, h as ref, k as computed, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode, m as createBaseVNode, F as Fragment, t as toDisplayString, E as renderList, c as createElementBlock } from "./framework.1qnja6qJ.js";
const _hoisted_1 = { style: { "paddingLeft": "8px" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithAllElements",
  setup(__props) {
    const sortOptions = [
      { label: "Newest update", value: "DATE_MODIFIED_DESC" },
      { label: "Oldest update", value: "DATE_MODIFIED_ASC" }
    ];
    const onSortChange = (value) => {
      sortValue.value = value;
      console.log(`Sort option changed to ${value}.`);
    };
    const sortValue = ref("DATE_MODIFIED_DESC");
    const taggedWith = ref("");
    const queryValue = ref("");
    const appliedFilters = computed(() => {
      return taggedWith.value && !isEmpty(taggedWith.value) ? [
        {
          key: "taggedWith1",
          label: disambiguateLabel("taggedWith1", taggedWith.value),
          onRemove: handleTaggedWithRemove
        }
      ] : [];
    });
    const setTaggedWith = (value) => {
      taggedWith.value = value;
    };
    const setQueryValue = (value) => {
      queryValue.value = value;
    };
    const handleTaggedWithRemove = () => setTaggedWith(void 0);
    const handleQueryValueRemove = () => setQueryValue(void 0);
    const handleClearAll = () => {
      handleTaggedWithRemove();
      handleQueryValueRemove();
    };
    const filters = [
      {
        key: "taggedWith1",
        label: "Tagged with",
        shortcut: true
      }
    ];
    const resourceName = {
      singular: "customer",
      plural: "customers"
    };
    const items = [
      {
        id: "112",
        url: "#",
        name: "Mae Jemison",
        location: "Decatur, USA",
        latestOrderUrl: "orders/1456"
      },
      {
        id: "212",
        url: "#",
        name: "Ellen Ochoa",
        location: "Los Angeles, USA",
        latestOrderUrl: "orders/1457"
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
    function disambiguateLabel(key, value) {
      switch (key) {
        case "taggedWith1":
          return `Tagged with ${value}`;
        default:
          return value;
      }
    }
    function isEmpty(value) {
      if (Array.isArray(value)) {
        return value.length === 0;
      } else {
        return value === "" || value == null;
      }
    }
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_LegacyFilters = resolveComponent("LegacyFilters");
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
            promotedBulkActions,
            bulkActions,
            "sort-options": sortOptions,
            onSortChange
          }, {
            filterControl: withCtx(() => [
              createVNode(_component_LegacyFilters, {
                modelValue: queryValue.value,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => queryValue.value = $event),
                filters,
                appliedFilters: appliedFilters.value,
                onQueryChange: setQueryValue,
                onQueryClear: handleQueryValueRemove,
                onClearAll: handleClearAll
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_1, [
                    createVNode(_component_Button, {
                      onClick: _cache[0] || (_cache[0] = () => console.log("New filter saved"))
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Save")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }, 8, ["modelValue", "appliedFilters"])
            ]),
            default: withCtx(() => [
              (openBlock(), createElementBlock(Fragment, null, renderList(items, (item) => {
                return createVNode(_component_ResourceItem, {
                  key: item.id,
                  persistActions: "",
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
