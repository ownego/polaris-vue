import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode, w as withCtx, F as Fragment, t as toDisplayString, a as createTextVNode, b as createBlock, E as renderList, ad as createSlots } from "./framework.1qnja6qJ.js";
const _hoisted_1 = { style: { height: "325px" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MultipleTags",
  setup(__props) {
    const deselectedOptions = [
      { value: "rustic", label: "Rustic" },
      { value: "antique", label: "Antique" },
      { value: "vinyl", label: "Vinyl" },
      { value: "vintage", label: "Vintage" },
      { value: "refurbished", label: "Refurbished" }
    ];
    const selectedOptions = ref(["rustic"]);
    const inputValue = ref("");
    const options = ref(deselectedOptions);
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
    };
    const updateSelection = (selected) => {
      selectedOptions.value = selected;
    };
    const removeTag = (tag) => {
      const options2 = [...selectedOptions.value];
      options2.splice(options2.indexOf(tag), 1);
      selectedOptions.value = options2;
    };
    const titleCase = (string) => {
      return string.toLowerCase().split(" ").map((word) => word.replace(word[0], word[0].toUpperCase())).join("");
    };
    return (_ctx, _cache) => {
      const _component_Tag = resolveComponent("Tag");
      const _component_LegacyStack = resolveComponent("LegacyStack");
      const _component_AutocompleteTextField = resolveComponent("AutocompleteTextField");
      const _component_Autocomplete = resolveComponent("Autocomplete");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_Autocomplete, {
          allowMultiple: "",
          options: options.value,
          selected: selectedOptions.value,
          onSelect: updateSelection,
          listTitle: "Suggested Tags"
        }, {
          textField: withCtx(() => [
            createVNode(_component_AutocompleteTextField, {
              label: "Tags",
              modelValue: inputValue.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => inputValue.value = $event),
              placeholder: "Vintage, cotton, summer",
              autoComplete: "off",
              onInput: updateText
            }, createSlots({ _: 2 }, [
              selectedOptions.value.length ? {
                name: "verticalContent",
                fn: withCtx(() => [
                  createVNode(_component_LegacyStack, {
                    spacing: "extraTight",
                    alignment: "center"
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(selectedOptions.value, (option) => {
                        return openBlock(), createBlock(_component_Tag, {
                          key: option,
                          onRemove: ($event) => removeTag(option)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(titleCase(option.replace("_", " "))), 1)
                          ]),
                          _: 2
                        }, 1032, ["onRemove"]);
                      }), 128))
                    ]),
                    _: 1
                  })
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["modelValue"])
          ]),
          _: 1
        }, 8, ["options", "selected"])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
