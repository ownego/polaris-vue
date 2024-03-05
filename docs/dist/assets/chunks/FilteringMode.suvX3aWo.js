import "./Preview.vue_vue_type_style_index_0_lang.vIfP4F2u.js";
import { u as useIndexResourceState } from "./useIndexResourceState.STrm8l_N.js";
import { d as defineComponent, h as ref, k as computed, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode, p as unref, F as Fragment, t as toDisplayString, a as createTextVNode, K as resolveDynamicComponent, E as renderList, c as createElementBlock, a3 as h } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FilteringMode",
  setup(__props) {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const itemStrings = ref([
      "All",
      "Unpaid",
      "Open",
      "Closed",
      "Local delivery",
      "Local pickup"
    ]);
    const selected = ref(0);
    const sortSelected = ref(["order asc"]);
    const accountStatus = ref();
    const moneySpent = ref();
    const taggedWith = ref("");
    const queryValue = ref("");
    const mode = ref("FILTERING");
    const setMode = (newMode) => {
      mode.value = newMode;
    };
    const onHandleCancel = () => {
    };
    const onHandleSave = async () => {
      await sleep(1);
      return true;
    };
    const tabs = computed(() => {
      return itemStrings.value.map((item, index) => ({
        content: item,
        index,
        onAction: () => {
        },
        id: `${item}-${index}`,
        isLocked: index === 0,
        actions: index === 0 ? [] : [
          {
            type: "rename",
            onAction: () => {
            },
            onPrimaryAction: async (value) => {
              const newItemsStrings = tabs.value.map((item2, idx) => {
                if (idx === index) {
                  return value;
                }
                return item2.content;
              });
              await sleep(1);
              itemStrings.value = newItemsStrings;
              return true;
            }
          },
          {
            type: "duplicate",
            onPrimaryAction: async (value) => {
              await sleep(1);
              duplicateView(value);
              return true;
            }
          },
          {
            type: "edit"
          },
          {
            type: "delete",
            onPrimaryAction: async () => {
              await sleep(1);
              deleteView(index);
              return true;
            }
          }
        ]
      }));
    });
    const sortOptions = [
      { label: "Order", value: "order asc", directionLabel: "Ascending" },
      { label: "Order", value: "order desc", directionLabel: "Descending" },
      { label: "Customer", value: "customer asc", directionLabel: "A-Z" },
      { label: "Customer", value: "customer desc", directionLabel: "Z-A" },
      { label: "Date", value: "date asc", directionLabel: "A-Z" },
      { label: "Date", value: "date desc", directionLabel: "Z-A" },
      { label: "Total", value: "total asc", directionLabel: "Ascending" },
      { label: "Total", value: "total desc", directionLabel: "Descending" }
    ];
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
    const primaryAction = computed(() => selected.value === 0 ? {
      type: "save-as",
      onAction: onCreateNewView,
      disabled: false,
      loading: false
    } : {
      type: "save",
      onAction: onHandleSave,
      disabled: false,
      loading: false
    });
    const appliedFilters = computed(() => {
      const results = [];
      if (accountStatus.value && !isEmpty(accountStatus.value)) {
        const name = "accountStatus";
        results.push({
          name,
          label: disambiguateLabel(name, accountStatus.value),
          onRemove: handleAccountStatusRemove
        });
      }
      if (moneySpent.value) {
        const name = "moneySpent";
        results.push({
          name,
          label: disambiguateLabel(name, moneySpent.value),
          onRemove: handleMoneySpentRemove
        });
      }
      if (!isEmpty(taggedWith.value)) {
        const name = "taggedWith";
        results.push({
          name,
          label: disambiguateLabel(name, taggedWith.value),
          onRemove: handleTaggedWithRemove
        });
      }
      return results;
    });
    const orders = [
      {
        id: "1020",
        order: "#1020",
        date: "Jul 20 at 4:34pm",
        customer: "Jaydon Stanton",
        total: "$969.44",
        paymentStatus: () => h(resolveComponent("Badge"), { progress: "complete" }, () => "Paid"),
        fulfillmentStatus: () => h(resolveComponent("Badge"), { progress: "incomplete" }, () => "Unfulfilled")
      },
      {
        id: "1019",
        order: "#1019",
        date: "Jul 20 at 3:46pm",
        customer: "Ruben Westerfelt",
        total: "$701.19",
        paymentStatus: () => h(resolveComponent("Badge"), { progress: "partiallyComplete" }, () => "Partially paid"),
        fulfillmentStatus: () => h(resolveComponent("Badge"), { progress: "incomplete" }, () => "Unfulfilled")
      },
      {
        id: "1018",
        order: "#1018",
        date: "Jul 20 at 3.44pm",
        customer: "Leo Carder",
        total: "$798.24",
        paymentStatus: () => h(resolveComponent("Badge"), { progress: "complete" }, () => "Paid"),
        fulfillmentStatus: () => h(resolveComponent("Badge"), { progress: "incomplete" }, () => "Unfulfilled")
      }
    ];
    const resourceName = {
      singular: "order",
      plural: "orders"
    };
    const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(orders);
    const deleteView = (index) => {
      const newItemStrings = [...itemStrings.value];
      newItemStrings.splice(index, 1);
      itemStrings.value = newItemStrings;
      selected.value = 0;
    };
    const duplicateView = async (name) => {
      itemStrings.value = [...itemStrings.value, name];
      selected.value = itemStrings.value.length;
      await sleep(1);
      return true;
    };
    const onCreateNewView = async (value) => {
      await sleep(500);
      if (!value) {
        return true;
      }
      itemStrings.value = [...itemStrings.value, value];
      selected.value = itemStrings.value.length;
      return true;
    };
    const handleFiltersSort = (value) => {
      sortSelected.value = value;
    };
    const handleFiltersSelect = (index) => {
      selected.value = index;
    };
    const handleAccountStatusChange = (value) => {
      accountStatus.value = value;
    };
    const handleMoneySpentChange = (value) => {
      moneySpent.value = value;
    };
    const handleTaggedWithChange = (_e, value) => {
      taggedWith.value = value;
    };
    const handleFiltersQueryChange = (value) => {
      queryValue.value = value;
    };
    const handleAccountStatusRemove = () => {
      accountStatus.value = void 0;
    };
    const handleMoneySpentRemove = () => {
      moneySpent.value = void 0;
    };
    const handleTaggedWithRemove = () => {
      taggedWith.value = "";
    };
    const handleQueryValueRemove = () => {
      queryValue.value = "";
    };
    const handleFiltersClearAll = () => {
      handleAccountStatusRemove();
      handleMoneySpentRemove();
      handleTaggedWithRemove();
      handleQueryValueRemove();
    };
    function disambiguateLabel(name, value) {
      switch (name) {
        case "moneySpent":
          return `Money spent is between $${value[0]} and $${value[1]}`;
        case "taggedWith":
          return `Tagged with ${value}`;
        case "accountStatus":
          return value.map((val) => `Customer ${val}`).join(", ");
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
      const _component_IndexFilters = resolveComponent("IndexFilters");
      const _component_Text = resolveComponent("Text");
      const _component_IndexTableCell = resolveComponent("IndexTableCell");
      const _component_IndexTableRow = resolveComponent("IndexTableRow");
      const _component_IndexTable = resolveComponent("IndexTable");
      const _component_LegacyCard = resolveComponent("LegacyCard");
      return openBlock(), createBlock(_component_LegacyCard, null, {
        default: withCtx(() => [
          createVNode(_component_IndexFilters, {
            sortOptions,
            sortSelected: sortSelected.value,
            queryValue: queryValue.value,
            queryPlaceholder: "Searching in all",
            primaryAction: primaryAction.value,
            cancelAction: {
              onAction: onHandleCancel,
              disabled: false,
              loading: false
            },
            tabs: tabs.value,
            selected: selected.value,
            canCreateNewView: "",
            filters,
            appliedFilters: appliedFilters.value,
            mode: mode.value,
            onSetMode: setMode,
            onQueryChange: handleFiltersQueryChange,
            onQueryClear: handleQueryValueRemove,
            onSort: handleFiltersSort,
            onSelect: handleFiltersSelect,
            onCreateNewView,
            onClearAll: handleFiltersClearAll
          }, null, 8, ["sortSelected", "queryValue", "primaryAction", "cancelAction", "tabs", "selected", "appliedFilters", "mode"]),
          createVNode(_component_IndexTable, {
            condensed: false,
            resourceName,
            itemCount: orders.length,
            selectedItemsCount: unref(allResourcesSelected) ? "All" : unref(selectedResources).length,
            onSelectionChange: unref(handleSelectionChange),
            headings: [
              { title: "Order" },
              { title: "Date" },
              { title: "Customer" },
              { title: "Total", alignment: "end" },
              { title: "Payment status" },
              { title: "Fulfillment status" }
            ]
          }, {
            default: withCtx(() => [
              (openBlock(), createElementBlock(Fragment, null, renderList(orders, ({ id, order, date, customer, total, paymentStatus, fulfillmentStatus }, index) => {
                return createVNode(_component_IndexTableRow, {
                  id,
                  key: id,
                  position: index,
                  selected: unref(selectedResources).includes(id)
                }, {
                  default: withCtx(() => [
                    createVNode(_component_IndexTableCell, null, {
                      default: withCtx(() => [
                        createVNode(_component_Text, {
                          variant: "bodyMd",
                          fontWeight: "bold",
                          as: "span"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(order), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(_component_IndexTableCell, null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(date), 1)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(_component_IndexTableCell, null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(customer), 1)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(_component_IndexTableCell, null, {
                      default: withCtx(() => [
                        createVNode(_component_Text, {
                          as: "span",
                          alignment: "end",
                          numeric: ""
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(total), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(_component_IndexTableCell, null, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent(paymentStatus)))
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(_component_IndexTableCell, null, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent(fulfillmentStatus)))
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1032, ["id", "position", "selected"]);
              }), 64))
            ]),
            _: 1
          }, 8, ["itemCount", "selectedItemsCount", "onSelectionChange"])
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
