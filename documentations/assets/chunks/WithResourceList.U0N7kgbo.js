import { d as defineComponent, h as ref, k as computed, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode, w as withCtx, F as Fragment, t as toDisplayString, a as createTextVNode, m as createBaseVNode, E as renderList, a3 as h } from "./framework.2IsXxFXf.js";
const _hoisted_1 = { style: { "height": "568px" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithResourceList",
  setup(__props) {
    const taggedWith = ref("");
    const accountStatus = ref();
    const moneySpent = ref();
    const queryValue = ref("");
    const appliedFilters = computed(() => {
      const tmpFilters = [];
      if (!isEmpty(accountStatus.value)) {
        const name = "accountStatus";
        tmpFilters.push({
          name,
          label: disambiguateLabel(name, accountStatus.value),
          onRemove: handleAccountStatusRemove
        });
      }
      if (!isEmpty(moneySpent.value)) {
        const name = "moneySpent";
        tmpFilters.push({
          name,
          label: disambiguateLabel(name, moneySpent.value),
          onRemove: handleMoneySpentRemove
        });
      }
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
    const handleTaggedWithRemove = () => {
      taggedWith.value = "";
    };
    const handleQueryValueRemove = () => {
      queryValue.value = "";
    };
    const handleAccountStatusRemove = () => {
      accountStatus.value = [];
    };
    const handleMoneySpentRemove = () => {
      moneySpent.value = void 0;
    };
    const handleAccountStatusChange = (value) => {
      accountStatus.value = value;
    };
    const handleFiltersQueryChange = (value) => {
      queryValue.value = value;
    };
    const handleMoneySpentChange = (value) => {
      moneySpent.value = value;
    };
    const handleTaggedWithChange = (_e, value) => {
      taggedWith.value = value;
    };
    const handleFiltersClearAll = () => {
      handleAccountStatusRemove();
      handleMoneySpentRemove();
      handleTaggedWithRemove();
      handleQueryValueRemove();
    };
    const filters = [
      {
        name: "accountStatus",
        label: "Account status",
        filter: () => h(resolveComponent("ChoiceList"), {
          title: "Account status",
          titleHidden: true,
          choices: [
            { label: "Enabled", value: "enabled" },
            { label: "Not invited", value: "not invited" },
            { label: "Invited", value: "invited" },
            { label: "Declined", value: "declined" }
          ],
          modelValue: accountStatus.value,
          allowMultiple: true,
          onChange: handleAccountStatusChange
        }),
        shortcut: true
      },
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
        name: "moneySpent",
        label: "Money spent",
        filter: () => h(resolveComponent("RangeSlider"), {
          label: "Money spent is between",
          labelHidden: true,
          modelValue: moneySpent.value || [0, 500],
          prefix: "$",
          output: true,
          min: 0,
          max: 2e3,
          step: 1,
          onChange: handleMoneySpentChange
        })
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
                  "query-value": queryValue.value,
                  filters,
                  appliedFilters: appliedFilters.value,
                  onQueryChange: handleFiltersQueryChange,
                  onQueryClear: handleQueryValueRemove,
                  onClearAll: handleFiltersClearAll
                }, null, 8, ["query-value", "appliedFilters"])
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
