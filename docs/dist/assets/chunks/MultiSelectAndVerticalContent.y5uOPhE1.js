import { d as defineComponent, h as ref, k as computed, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode, w as withCtx, F as Fragment, t as toDisplayString, a as createTextVNode, b as createBlock, E as renderList, e as createCommentVNode, K as resolveDynamicComponent, a3 as h } from "./framework.1qnja6qJ.js";
const _hoisted_1 = { style: { height: "225px" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MultiSelectAndVerticalContent",
  setup(__props) {
    const selectedTags = ref(["Rustic"]);
    const inputValue = ref("");
    const suggestion = ref("");
    const allTags = computed(() => {
      const savedTags = ["Rustic", "Antique", "Vinyl", "Vintage", "Refurbished"];
      return [...new Set([...savedTags, ...selectedTags.value].sort())];
    });
    const noResults = computed(() => {
      return inputValue.value && !allTags.value.includes(inputValue.value);
    });
    const options = computed(() => {
      let list;
      const filterRegex = new RegExp(escapeSpecialRegExCharacters(inputValue.value), "i");
      if (inputValue.value) {
        list = allTags.value.filter((tag) => tag.match(filterRegex));
      } else {
        list = allTags.value;
      }
      return [...list];
    });
    const formatOptionText = (option) => {
      const trimValue = inputValue.value.trim().toLocaleLowerCase();
      const matchIndex = option.toLocaleLowerCase().indexOf(trimValue);
      if (!inputValue.value || matchIndex === -1)
        return option;
      const start = option.slice(0, matchIndex);
      const highlight = option.slice(matchIndex, matchIndex + trimValue.length);
      const end = option.slice(matchIndex + trimValue.length, option.length);
      return h("p", [
        start,
        h(resolveComponent("Text"), { fontWeight: "bold", as: "span" }, {
          default: () => highlight
        }),
        end
      ]);
    };
    const handleActiveOptionChange = (activeOption) => {
      const activeOptionIsAction = activeOption === inputValue.value;
      if (!activeOptionIsAction && !selectedTags.value.includes(activeOption)) {
        suggestion.value = activeOption;
      } else {
        suggestion.value = "";
      }
    };
    const updateSelection = (selected) => {
      console.log(selected);
      const nextSelectedTags = /* @__PURE__ */ new Set([...selectedTags.value]);
      if (nextSelectedTags.has(selected)) {
        nextSelectedTags.delete(selected);
      } else {
        nextSelectedTags.add(selected);
      }
      selectedTags.value = [...nextSelectedTags];
      inputValue.value = "";
      suggestion.value = "";
    };
    const removeTag = (tag) => {
      updateSelection(tag);
    };
    function escapeSpecialRegExCharacters(value) {
      return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    return (_ctx, _cache) => {
      const _component_Tag = resolveComponent("Tag");
      const _component_LegacyStack = resolveComponent("LegacyStack");
      const _component_ComboboxTextField = resolveComponent("ComboboxTextField");
      const _component_ListboxAction = resolveComponent("ListboxAction");
      const _component_ListboxTextOption = resolveComponent("ListboxTextOption");
      const _component_ListboxOption = resolveComponent("ListboxOption");
      const _component_Listbox = resolveComponent("Listbox");
      const _component_Combobox = resolveComponent("Combobox");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_Combobox, { allowMultiple: "" }, {
          activator: withCtx(() => [
            createVNode(_component_ComboboxTextField, {
              label: "Search tags",
              "label-hidden": "",
              modelValue: inputValue.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => inputValue.value = $event),
              placeholder: "Search tags",
              autoComplete: "off"
            }, {
              verticalContent: withCtx(() => [
                selectedTags.value.length > 0 ? (openBlock(), createBlock(_component_LegacyStack, {
                  key: 0,
                  spacing: "extraTight",
                  alignment: "center"
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(selectedTags.value, (tag) => {
                      return openBlock(), createBlock(_component_Tag, {
                        key: `option-${tag}`,
                        onRemove: ($event) => removeTag(tag)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(tag), 1)
                        ]),
                        _: 2
                      }, 1032, ["onRemove"]);
                    }), 128))
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]),
          default: withCtx(() => [
            noResults.value ? (openBlock(), createBlock(_component_Listbox, {
              key: 0,
              "auto-selection": "NONE",
              onSelect: updateSelection,
              onActiveOptionChange: handleActiveOptionChange
            }, {
              default: withCtx(() => [
                noResults.value ? (openBlock(), createBlock(_component_ListboxAction, {
                  key: 0,
                  value: inputValue.value
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(`Add "${inputValue.value}"`), 1)
                  ]),
                  _: 1
                }, 8, ["value"])) : createCommentVNode("", true),
                options.value.length > 0 ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(options.value, (option) => {
                  return openBlock(), createBlock(_component_ListboxOption, {
                    key: option,
                    value: option,
                    selected: selectedTags.value.includes(option),
                    accessibilityLabel: option
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ListboxTextOption, {
                        selected: selectedTags.value.includes(option)
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(resolveDynamicComponent(formatOptionText(option))))
                        ]),
                        _: 2
                      }, 1032, ["selected"])
                    ]),
                    _: 2
                  }, 1032, ["value", "selected", "accessibilityLabel"]);
                }), 128)) : createCommentVNode("", true)
              ]),
              _: 1
            })) : createCommentVNode("", true)
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
