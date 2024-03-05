import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "InlineSuggestion",
  setup(__props) {
    const value = ref("");
    const suggestion = ref("");
    const handleInput = () => {
      const output = value.value && suggestions.find(
        (s) => s.toLowerCase().startsWith(value.value.toLowerCase())
      );
      suggestion.value = output || "";
    };
    const handleKeyDown = (event) => {
      if (event.key === "Enter" || event.key === "Tab") {
        value.value = suggestion.value || value.value;
        suggestion.value = "";
      } else if (event.key === "Backspace") {
        value.value = value.value;
        suggestion.value = "";
      }
    };
    const suggestions = [
      "Alabama",
      "Alaska",
      "American Samoa",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "District of Columbia",
      "Florida",
      "Georgia",
      "Guam",
      "Hawaii",
      "Idaho",
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Maine",
      "Maryland",
      "Massachusetts",
      "Michigan",
      "Minnesota",
      "Minor Outlying Islands",
      "Mississippi",
      "Missouri",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "New York",
      "North Carolina",
      "North Dakota",
      "Northern Mariana Islands",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Pennsylvania",
      "Puerto Rico",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "U.S. Virgin Islands",
      "Utah",
      "Vermont",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming"
    ];
    return (_ctx, _cache) => {
      const _component_TextField = resolveComponent("TextField");
      return openBlock(), createElementBlock("div", { onKeydown: handleKeyDown }, [
        createVNode(_component_TextField, {
          type: "text",
          label: "State",
          modelValue: value.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => value.value = $event),
          suggestion: suggestion.value,
          autoComplete: "off",
          onInput: handleInput
        }, null, 8, ["modelValue", "suggestion"])
      ], 32);
    };
  }
});
export {
  _sfc_main as default
};
