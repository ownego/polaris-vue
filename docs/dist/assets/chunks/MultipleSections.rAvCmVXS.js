import { S as SearchIcon } from "./Preview.vue_vue_type_style_index_0_lang.vIfP4F2u.js";
import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode, w as withCtx, p as unref } from "./framework.1qnja6qJ.js";
const _hoisted_1 = { style: { height: "225px" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MultipleSections",
  setup(__props) {
    const deselectedOptions = [
      {
        title: "Frequently used",
        options: [
          { value: "ups", label: "UPS" },
          { value: "usps", label: "USPS" }
        ]
      },
      {
        title: "All carriers",
        options: [
          { value: "dhl", label: "DHL Express" },
          { value: "canada_post", label: "Canada Post" }
        ]
      }
    ];
    const selectedOptions = ref([]);
    const inputValue = ref("");
    const options = ref(deselectedOptions);
    const updateText = (_e, value) => {
      inputValue.value = value;
      if (value === "") {
        options.value = deselectedOptions;
        return;
      }
      const filterRegex = new RegExp(value, "i");
      const resultOptions = [];
      deselectedOptions.forEach((opt) => {
        const options2 = opt.options.filter(
          (option) => option.label.match(filterRegex)
        );
        resultOptions.push({
          title: opt.title,
          options: options2
        });
      });
      options.value = resultOptions;
    };
    const updateSelection = (selected) => {
      let selectedValue;
      options.value.forEach(({ options: options2 }) => {
        if (selectedValue) {
          return;
        }
        const matchedOption = options2.find(
          (option) => option.value.match(selected[0])
        );
        if (matchedOption) {
          selectedValue = matchedOption.label;
        }
      });
      selectedOptions.value = selected;
      inputValue.value = selectedValue ? selectedValue : "";
    };
    return (_ctx, _cache) => {
      const _component_Icon = resolveComponent("Icon");
      const _component_AutocompleteTextField = resolveComponent("AutocompleteTextField");
      const _component_Autocomplete = resolveComponent("Autocomplete");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_Autocomplete, {
          selected: selectedOptions.value,
          options: options.value,
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
        }, 8, ["selected", "options"])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
