import { S as SearchIcon } from "./Preview.vue_vue_type_style_index_0_lang.w_jMciSf.js";
import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode, w as withCtx, p as unref, F as Fragment, t as toDisplayString, a as createTextVNode, b as createBlock, E as renderList, e as createCommentVNode } from "./framework.2IsXxFXf.js";
const _hoisted_1 = { style: { height: "225px" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Default",
  setup(__props) {
    const deselectedOptions = [
      { value: "rustic", label: "Rustic" },
      { value: "antique", label: "Antique" },
      { value: "vinyl", label: "Vinyl" },
      { value: "vintage", label: "Vintage" },
      { value: "refurbished", label: "Refurbished" }
    ];
    const selectedOption = ref();
    const inputValue = ref("");
    const options = ref(deselectedOptions);
    const updateText = (_e, value) => {
      inputValue.value = value;
      if (value === "") {
        options.value = deselectedOptions;
        return;
      }
      const filterRegex = new RegExp(escapeSpecialRegExCharacters(value), "i");
      const resultOptions = deselectedOptions.filter(
        (option) => option.label.match(filterRegex)
      );
      options.value = resultOptions;
    };
    const updateSelection = (selected) => {
      const matchedOption = options.value.find((option) => {
        return option.value.match(selected);
      });
      selectedOption.value = selected;
      inputValue.value = matchedOption ? matchedOption.label : "";
    };
    function escapeSpecialRegExCharacters(value) {
      return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    return (_ctx, _cache) => {
      const _component_Icon = resolveComponent("Icon");
      const _component_ComboboxTextField = resolveComponent("ComboboxTextField");
      const _component_ListboxOption = resolveComponent("ListboxOption");
      const _component_Listbox = resolveComponent("Listbox");
      const _component_Combobox = resolveComponent("Combobox");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_Combobox, null, {
          activator: withCtx(() => [
            createVNode(_component_ComboboxTextField, {
              label: "Search tags",
              "label-hidden": "",
              modelValue: inputValue.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => inputValue.value = $event),
              placeholder: "Search tags",
              autoComplete: "off",
              onInput: updateText
            }, {
              prefix: withCtx(() => [
                createVNode(_component_Icon, { source: unref(SearchIcon) }, null, 8, ["source"])
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]),
          default: withCtx(() => [
            options.value.length > 0 ? (openBlock(), createBlock(_component_Listbox, {
              key: 0,
              onSelect: updateSelection
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(options.value, (option) => {
                  return openBlock(), createBlock(_component_ListboxOption, {
                    key: option.value,
                    value: option.value,
                    selected: selectedOption.value === option.value,
                    accessibilityLabel: option.label
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(option.label), 1)
                    ]),
                    _: 2
                  }, 1032, ["value", "selected", "accessibilityLabel"]);
                }), 128))
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
