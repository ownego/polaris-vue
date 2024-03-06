import { S as SearchIcon } from "./Preview.vue_vue_type_style_index_0_lang.a_K4ko6J.js";
import { d as defineComponent, h as ref, k as computed, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, p as unref, I as createVNode, m as createBaseVNode, F as Fragment, t as toDisplayString, a as createTextVNode, E as renderList, c as createElementBlock, e as createCommentVNode } from "./framework.1qnja6qJ.js";
const _hoisted_1 = { style: { "padding": "12px" } };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("span", { style: { "color": "var(--p-color-text-emphasis)" } }, " Show all 111 segments ", -1);
const actionValue = "__ACTION__";
const interval = 25;
const listboxId = "SearchableListbox";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithSearch",
  setup(__props) {
    const segments = [
      {
        label: "All customers",
        id: "gid://shopify/CustomerSegment/1",
        value: "0"
      },
      {
        label: "VIP customers",
        id: "gid://shopify/CustomerSegment/2",
        value: "1"
      },
      {
        label: "New customers",
        id: "gid://shopify/CustomerSegment/3",
        value: "2"
      },
      {
        label: "Abandoned carts - last 30 days",
        id: "gid://shopify/CustomerSegment/4",
        value: "3"
      },
      {
        label: "Wholesale customers",
        id: "gid://shopify/CustomerSegment/5",
        value: "4"
      },
      {
        label: "Email subscribers",
        id: "gid://shopify/CustomerSegment/6",
        value: "5"
      },
      {
        label: "From New York",
        id: "gid://shopify/CustomerSegment/7",
        value: "6"
      },
      {
        label: "Repeat buyers",
        id: "gid://shopify/CustomerSegment/8",
        value: "7"
      },
      {
        label: "First time buyers",
        id: "gid://shopify/CustomerSegment/9",
        value: "8"
      },
      {
        label: "From Canada",
        id: "gid://shopify/CustomerSegment/10",
        value: "9"
      },
      {
        label: "Bought in last 60 days",
        id: "gid://shopify/CustomerSegment/11",
        value: "10"
      },
      {
        label: "Bought last BFCM",
        id: "gid://shopify/CustomerSegment/12",
        value: "11"
      }
    ];
    const cardStyle = {
      alignItems: "stretch",
      borderTop: "1px solid #DFE3E8",
      display: "flex",
      flexDirection: "column",
      justifyContent: "stretch",
      position: "relative",
      width: "100%",
      height: "100%",
      overflow: "hidden"
    };
    const scrollableStyle = {
      position: "relative",
      height: "292px",
      padding: "var(--p-space-200) 0",
      borderBottomLeftRadius: "var(--p-border-radius-200)",
      borderBottomRightRadius: "var(--p-border-radius-200)"
    };
    const lazyLoadSegments = Array.from(Array(100)).map((_, index) => ({
      label: `Other customers ${index + 13}`,
      id: `gid://shopify/CustomerSegment/${index + 13}`,
      value: `${index + 12}`
    }));
    segments.push(...lazyLoadSegments);
    const showFooterAction = ref(true);
    const query = ref("");
    const lazyLoading = ref(false);
    const willLoadMoreResult = ref(true);
    const visibleOptionIndex = ref(6);
    const activeOptionId = ref(segments[0].id);
    const selectedSegmentIndex = ref(0);
    const filteredSegments = ref([]);
    const segmentOptions = computed(() => query.value ? filteredSegments.value : segments);
    const segmentList = computed(() => {
      const options = segmentOptions.value;
      return options.slice(0, visibleOptionIndex.value);
    });
    const handleClickShowAll = () => {
      showFooterAction.value = false;
      visibleOptionIndex.value = segments.length;
    };
    const handleFilterSegments = (query2) => {
      const nextFilteredSegments = segments.filter((segment) => {
        return segment.label.toLocaleLowerCase().includes(query2.toLocaleLowerCase().trim());
      });
      filteredSegments.value = nextFilteredSegments;
    };
    const handleQueryChange = (value) => {
      query.value = value;
      if (query.value.length >= 2)
        handleFilterSegments(query.value);
    };
    const handleQueryClear = (_e) => {
      handleQueryChange("");
    };
    const handleSegmentSelect = (segmentIndex) => {
      if (segmentIndex === actionValue) {
        return handleClickShowAll();
      }
      selectedSegmentIndex.value = Number(segmentIndex);
    };
    const handleActiveOptionChange = (_, domId) => {
      activeOptionId.value = domId;
    };
    const handleLazyLoadSegments = () => {
      if (willLoadMoreResult.value && !showFooterAction) {
        lazyLoading.value = true;
        const options = query.value ? filteredSegments.value : segments;
        setTimeout(() => {
          const remainingOptionCount = options.length - visibleOptionIndex.value;
          const nextVisibleOptionIndex = remainingOptionCount >= interval ? visibleOptionIndex.value + interval : visibleOptionIndex.value + remainingOptionCount;
          lazyLoading.value = false;
          visibleOptionIndex.value = nextVisibleOptionIndex;
          if (remainingOptionCount <= interval) {
            willLoadMoreResult.value = false;
          }
        }, 1e3);
      }
    };
    return (_ctx, _cache) => {
      const _component_Icon = resolveComponent("Icon");
      const _component_TextField = resolveComponent("TextField");
      const _component_ListboxTextOption = resolveComponent("ListboxTextOption");
      const _component_ListboxOption = resolveComponent("ListboxOption");
      const _component_ListboxAction = resolveComponent("ListboxAction");
      const _component_EmptySearchResult = resolveComponent("EmptySearchResult");
      const _component_ListboxLoading = resolveComponent("ListboxLoading");
      const _component_Listbox = resolveComponent("Listbox");
      const _component_Scrollable = resolveComponent("Scrollable");
      const _component_LegacyCard = resolveComponent("LegacyCard");
      return openBlock(), createBlock(_component_LegacyCard, null, {
        default: withCtx(() => [
          createBaseVNode("div", { style: cardStyle }, [
            createBaseVNode("div", _hoisted_1, [
              createVNode(_component_TextField, {
                clearButton: "",
                labelHidden: "",
                label: "Customer segments",
                placeholder: "Search segments",
                autoComplete: "off",
                modelValue: query.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => query.value = $event),
                focused: showFooterAction.value,
                ariaActiveDescendant: activeOptionId.value,
                ariaControls: listboxId,
                onInput: handleQueryChange,
                onClearButtonClick: handleQueryClear
              }, {
                prefix: withCtx(() => [
                  createVNode(_component_Icon, { source: unref(SearchIcon) }, null, 8, ["source"])
                ]),
                _: 1
              }, 8, ["modelValue", "focused", "ariaActiveDescendant"])
            ]),
            createVNode(_component_Scrollable, {
              shadow: "",
              style: scrollableStyle,
              onScrolledToBottom: handleLazyLoadSegments
            }, {
              default: withCtx(() => [
                createVNode(_component_Listbox, {
                  enableKeyboardControl: "",
                  accessibilityLabel: "Search for and select a customer segment",
                  autoSelection: "FIRST_SELECTED",
                  customListId: listboxId,
                  onSelect: handleSegmentSelect,
                  onActiveOptionChange: handleActiveOptionChange
                }, {
                  default: withCtx(() => [
                    segmentOptions.value.length > 0 ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(segmentList.value, ({ label, value }) => {
                      return openBlock(), createBlock(_component_ListboxOption, {
                        key: value,
                        value,
                        selected: segments[selectedSegmentIndex.value].value === value
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_ListboxTextOption, {
                            selected: segments[selectedSegmentIndex.value].value === value
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(label), 1)
                            ]),
                            _: 2
                          }, 1032, ["selected"])
                        ]),
                        _: 2
                      }, 1032, ["value", "selected"]);
                    }), 128)) : createCommentVNode("", true),
                    showFooterAction.value ? (openBlock(), createBlock(_component_ListboxAction, {
                      key: 1,
                      value: actionValue
                    }, {
                      default: withCtx(() => [
                        _hoisted_2
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    segmentOptions.value.length === 0 ? (openBlock(), createBlock(_component_EmptySearchResult, {
                      key: 2,
                      title: "",
                      description: `No segments found matching ${query.value}`
                    }, null, 8, ["description"])) : createCommentVNode("", true),
                    lazyLoading.value ? (openBlock(), createBlock(_component_ListboxLoading, {
                      key: 3,
                      accessibilityLabel: `${query.value ? "Filtering" : "Loading"} customer segments`
                    }, null, 8, ["accessibilityLabel"])) : createCommentVNode("", true)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ])
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
