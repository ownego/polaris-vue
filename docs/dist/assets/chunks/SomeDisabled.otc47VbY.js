import { d as defineComponent, h as ref, k as computed, a3 as h, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode, w as withCtx, a as createTextVNode, m as createBaseVNode, F as Fragment, t as toDisplayString, E as renderList } from "./framework.2IsXxFXf.js";
const _hoisted_1 = { style: { "height": "568px" } };
const _hoisted_2 = { style: { "padding-left": "8px" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SomeDisabled",
  setup(__props) {
    const taggedWith = ref("");
    const vendor = ref("");
    const queryValue = ref("");
    const handleTaggedWithRemove = () => {
      taggedWith.value = "";
    };
    const handleQueryValueRemove = () => {
      queryValue.value = "";
    };
    const handleVendorRemove = () => {
      vendor.value = "";
    };
    const handleFiltersQueryChange = (value) => {
      queryValue.value = value;
    };
    const handleTaggedWithChange = (_e, value) => {
      taggedWith.value = value;
    };
    const handleVendorChange = (_e, value) => {
      vendor.value = value;
    };
    const handleFiltersClearAll = () => {
      handleTaggedWithRemove();
      handleQueryValueRemove();
      handleVendorRemove();
    };
    const appliedFilters = computed(() => {
      return taggedWith.value && !isEmpty(taggedWith.value) ? [
        {
          name: "taggedWith",
          label: disambiguateLabel("taggedWith", taggedWith.value),
          onRemove: handleTaggedWithRemove
        }
      ] : [];
    });
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
      },
      {
        name: "vendor",
        label: "Vendor",
        filter: h(resolveComponent("TextField"), {
          label: "Vendor",
          modelValue: vendor.value,
          labelHidden: true,
          autoComplete: "off",
          onInput: handleVendorChange
        }),
        shortcut: true,
        disabled: true
      }
    ];
    const resourceName = {
      singular: "customer",
      plural: "customers"
    };
    const items = [
      {
        id: "108",
        url: "#",
        name: "Mae Jemison",
        location: "Decatur, USA"
      },
      {
        id: "208",
        url: "#",
        name: "Ellen Ochoa",
        location: "Los Angeles, USA"
      }
    ];
    function disambiguateLabel(name, value) {
      switch (name) {
        case "moneySpent":
          return `Money spent is between $${value[0]} and $${value[1]}`;
        case "taggedWith":
          return `Tagged with ${value}`;
        case "accountStatus":
          return value == null ? void 0 : value.map((val) => `Customer ${val}`).join(", ");
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
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_LegacyCard, null, {
          default: withCtx(() => [
            createVNode(_component_ResourceList, {
              "flush-filters": "",
              resourceName,
              items
            }, {
              filterControl: withCtx(() => [
                createVNode(_component_Filters, {
                  queryPlaceholder: "Searching customers",
                  "query-value": queryValue.value,
                  filters,
                  appliedFilters: appliedFilters.value,
                  onQueryChange: handleFiltersQueryChange,
                  onQueryClear: handleQueryValueRemove,
                  onClearAll: handleFiltersClearAll
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_2, [
                      createVNode(_component_Button, {
                        disabled: "",
                        onClick: _cache[0] || (_cache[0] = () => console.log("New filter saved")),
                        variant: "tertiary"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Save ")
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
        })
      ]);
    };
  }
});
export {
  _sfc_main as default
};
