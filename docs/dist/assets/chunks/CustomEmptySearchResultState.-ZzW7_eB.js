import { d as defineComponent, h as ref, k as computed, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode, m as createBaseVNode, F as Fragment, t as toDisplayString, E as renderList, c as createElementBlock, a3 as h } from "./framework.1qnja6qJ.js";
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("div", null, "This is a custom empty state", -1);
const _hoisted_2 = { style: { "paddingLeft": "8px" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CustomEmptySearchResultState",
  setup(__props) {
    const taggedWith = ref("");
    const queryValue = ref("");
    const appliedFilters = computed(() => {
      const tmpFilters = [];
      if (!isEmpty(taggedWith.value)) {
        const name = "taggedWith";
        tmpFilters.push({
          name,
          label: disambiguateLabel(name, taggedWith.value),
          onRemove: handleTaggedWithRemove
        });
      }
      return tmpFilters;
    });
    const setTaggedWith = (value) => {
      taggedWith.value = value;
    };
    const setQueryValue = (value) => {
      queryValue.value = value;
    };
    const handleTaggedWithChange = (_e, value) => {
      taggedWith.value = value;
    };
    const handleTaggedWithRemove = () => setTaggedWith(void 0);
    const handleQueryValueRemove = () => setQueryValue(void 0);
    const handleClearAll = () => {
      handleTaggedWithRemove();
      handleQueryValueRemove();
    };
    const filters = [
      {
        name: "taggedWith",
        label: "Tagged with",
        filter: () => h(resolveComponent("TextField"), {
          label: "Tagged with",
          modelValue: taggedWith.value,
          autoComplete: "off",
          labelHidden: true,
          onInput: handleTaggedWithChange
        }),
        shortcut: true
      }
    ];
    const resourceName = {
      singular: "customer",
      plural: "customers"
    };
    const items = [];
    function disambiguateLabel(key, value) {
      switch (key) {
        case "taggedWith":
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
      const _component_Filters = resolveComponent("Filters");
      const _component_Avatar = resolveComponent("Avatar");
      const _component_Text = resolveComponent("Text");
      const _component_ResourceItem = resolveComponent("ResourceItem");
      const _component_ResourceList = resolveComponent("ResourceList");
      const _component_LegacyCard = resolveComponent("LegacyCard");
      return openBlock(), createBlock(_component_LegacyCard, null, {
        default: withCtx(() => [
          createVNode(_component_ResourceList, {
            resourceName,
            items
          }, {
            emptySearchState: withCtx(() => [
              _hoisted_1
            ]),
            filterControl: withCtx(() => [
              createVNode(_component_Filters, {
                "query-value": queryValue.value,
                filters,
                appliedFilters: appliedFilters.value,
                onQueryChange: setQueryValue,
                onQueryClear: handleQueryValueRemove,
                onClearAll: handleClearAll
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_2, [
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
              }, 8, ["query-value", "appliedFilters"])
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
