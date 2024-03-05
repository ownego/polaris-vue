import { d as defineComponent, h as ref, k as computed, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode, w as withCtx, F as Fragment, t as toDisplayString, a as createTextVNode, b as createBlock, E as renderList, e as createCommentVNode } from "./framework.1qnja6qJ.js";
const _hoisted_1 = { style: { height: "250px" } };
const paginationInterval = 25;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithLazyLoading",
  setup(__props) {
    const deselectedOptions = Array.from(Array(100)).map((_, index) => ({
      value: `rustic ${index + 1}`,
      label: `Rustic ${index + 1}`
    }));
    const selectedOptions = ref([]);
    const inputValue = ref("");
    const options = ref(deselectedOptions);
    const isLoading = ref(false);
    const willLoadMoreResults = ref(true);
    const visibleOptionIndex = ref(paginationInterval);
    const optionList = computed(() => {
      return options.value.slice(0, visibleOptionIndex.value);
    });
    const hasSelectedOptions = computed(() => selectedOptions.value.length > 0);
    const handleLoadMoreResults = () => {
      if (willLoadMoreResults) {
        isLoading.value = true;
        setTimeout(() => {
          const remainingOptionCount = options.value.length - visibleOptionIndex.value;
          const nextVisibleOptionIndex = remainingOptionCount >= paginationInterval ? visibleOptionIndex.value + paginationInterval : visibleOptionIndex.value + remainingOptionCount;
          isLoading.value = false;
          visibleOptionIndex.value = nextVisibleOptionIndex;
          if (remainingOptionCount <= paginationInterval) {
            willLoadMoreResults.value = false;
          }
        }, 1e3);
      }
    };
    const removeTag = (tag) => () => {
      const options2 = [...selectedOptions.value];
      options2.splice(options2.indexOf(tag), 1);
      selectedOptions.value = options2;
    };
    const updateText = (_e, value) => {
      inputValue.value = value;
      if (value === "") {
        options.value = deselectedOptions;
        return;
      }
      const filterRegex = new RegExp(value, "i");
      const resultOptions = deselectedOptions.filter(
        (option) => option.label.match(filterRegex)
      );
      options.value = resultOptions;
      inputValue.value = "";
    };
    const handleSelection = (selected) => {
      selectedOptions.value = selected;
      inputValue.value = "";
    };
    function titleCase(option) {
      const string = option.replace(/_/g, " ");
      return string.toLowerCase().split(" ").map((word) => {
        return word.replace(word[0], word[0].toUpperCase());
      }).join(" ");
    }
    return (_ctx, _cache) => {
      const _component_Tag = resolveComponent("Tag");
      const _component_LegacyStack = resolveComponent("LegacyStack");
      const _component_AutocompleteTextField = resolveComponent("AutocompleteTextField");
      const _component_Autocomplete = resolveComponent("Autocomplete");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_LegacyStack, { vertical: "" }, {
          default: withCtx(() => [
            hasSelectedOptions.value ? (openBlock(), createBlock(_component_LegacyStack, {
              key: 0,
              spacing: "extraTight"
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(selectedOptions.value, (option) => {
                  return openBlock(), createBlock(_component_Tag, {
                    key: `option${option}`,
                    onRemove: ($event) => removeTag(option)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(titleCase(option)), 1)
                    ]),
                    _: 2
                  }, 1032, ["onRemove"]);
                }), 128))
              ]),
              _: 1
            })) : createCommentVNode("", true),
            createVNode(_component_Autocomplete, {
              allowMultiple: "",
              options: optionList.value,
              selected: selectedOptions.value,
              listTitle: "Suggested Tags",
              loading: isLoading.value,
              willLoadMoreResults: willLoadMoreResults.value,
              onSelect: handleSelection,
              onLoadMoreResults: handleLoadMoreResults
            }, {
              textField: withCtx(() => [
                createVNode(_component_AutocompleteTextField, {
                  label: "Tags",
                  modelValue: inputValue.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => inputValue.value = $event),
                  placeholder: "Vintage, cotton, summer",
                  autoComplete: "off",
                  onInput: updateText
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }, 8, ["options", "selected", "loading", "willLoadMoreResults"])
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
