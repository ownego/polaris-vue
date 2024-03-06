import { P as PlusCircleIcon } from "./PlusCircleIcon.jYOInr0f.js";
import { S as SearchIcon } from "./Preview.vue_vue_type_style_index_0_lang.a_K4ko6J.js";
import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode, w as withCtx, p as unref } from "./framework.1qnja6qJ.js";
const _hoisted_1 = { style: { height: "225px" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithAction",
  setup(__props) {
    const deselectedOptions = [
      { value: "rustic", label: "Rustic" },
      { value: "antique", label: "Antique" },
      { value: "vinyl", label: "Vinyl" },
      { value: "vintage", label: "Vintage" },
      { value: "refurbished", label: "Refurbished" }
    ];
    const actionBefore = {
      accessibilityLabel: "Action label",
      badge: {
        tone: "new",
        content: "New!"
      },
      content: "Action with long name",
      ellipsis: true,
      helpText: "Help text",
      icon: PlusCircleIcon,
      onAction: () => {
        console.log("actionBefore clicked!");
      }
    };
    const selectedOptions = ref([]);
    const inputValue = ref("");
    const options = ref(deselectedOptions);
    const loading = ref(false);
    const updateText = (_e, value) => {
      inputValue.value = value;
      if (!loading.value) {
        loading.value = true;
      }
      setTimeout(() => {
        if (value === "") {
          options.value = deselectedOptions;
          loading.value = false;
          return;
        }
        const filterRegex = new RegExp(value, "i");
        const resultOptions = options.value.filter(
          (option) => option.label.match(filterRegex)
        );
        options.value = resultOptions;
        loading.value = false;
      }, 300);
    };
    const updateSelection = (selected) => {
      const selectedText = selected.map((selectedItem) => {
        const matchedOption = options.value.find((option) => {
          return option.value.match(selectedItem);
        });
        return matchedOption && matchedOption.label;
      });
      selectedOptions.value = selected;
      inputValue.value = selectedText[0] || "";
    };
    return (_ctx, _cache) => {
      const _component_Icon = resolveComponent("Icon");
      const _component_AutocompleteTextField = resolveComponent("AutocompleteTextField");
      const _component_Autocomplete = resolveComponent("Autocomplete");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_Autocomplete, {
          actionBefore,
          options: options.value,
          selected: selectedOptions.value,
          listTitle: "Suggested tags",
          loading: loading.value,
          onSelect: updateSelection
        }, {
          textField: withCtx(() => [
            createVNode(_component_AutocompleteTextField, {
              label: "Tags",
              modelValue: inputValue.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => inputValue.value = $event),
              placeholder: "Search",
              autoComplete: "off",
              onInput: updateText
            }, {
              prefix: withCtx(() => [
                createVNode(_component_Icon, { source: unref(SearchIcon) }, null, 8, ["source"])
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]),
          _: 1
        }, 8, ["options", "selected", "loading"])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
