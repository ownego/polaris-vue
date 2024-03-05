import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode, a3 as h } from "./framework.1qnja6qJ.js";
const unitSelectID = "unit";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SeparateValidationError",
  setup(__props) {
    const weight = ref("12");
    const unit = ref("");
    const errorMessage = () => {
      const weightError = !weight.value && unit.value ? "The numeric weight of the product " : "";
      const unitError = !unit.value && weight.value ? "The unit of measure for the product weight" : "";
      if (!weightError && !unitError) {
        return "";
      }
      return h("span", [
        h(resolveComponent("Text"), { tone: "critical", as: "span" }, () => [
          h("p", [
            `${weightError}${unitError} is required when weight based shipping rates are enabled. `,
            h(resolveComponent("Link"), () => "Manage shipping")
          ])
        ])
      ]);
    };
    return (_ctx, _cache) => {
      const _component_TextField = resolveComponent("TextField");
      const _component_Select = resolveComponent("Select");
      const _component_FormLayoutGroup = resolveComponent("FormLayoutGroup");
      const _component_FormLayout = resolveComponent("FormLayout");
      const _component_InlineError = resolveComponent("InlineError");
      const _component_LegacyStack = resolveComponent("LegacyStack");
      const _component_LegacyCard = resolveComponent("LegacyCard");
      return openBlock(), createBlock(_component_LegacyCard, { sectioned: "" }, {
        default: withCtx(() => [
          createVNode(_component_LegacyStack, {
            vertical: "",
            spacing: "extraTight"
          }, {
            default: withCtx(() => [
              createVNode(_component_FormLayout, null, {
                default: withCtx(() => [
                  createVNode(_component_FormLayoutGroup, { condensed: "" }, {
                    default: withCtx(() => [
                      createVNode(_component_TextField, {
                        label: "Product weight",
                        type: "number",
                        modelValue: weight.value,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => weight.value = $event),
                        error: Boolean(!weight.value && unit.value),
                        autoComplete: "off"
                      }, null, 8, ["modelValue", "error"]),
                      createVNode(_component_Select, {
                        id: "unitSelectID",
                        label: "Unit of measure",
                        placeholder: "Select",
                        options: ["oz", "g", "kg", "lb"],
                        modelValue: unit.value,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => unit.value = $event),
                        error: Boolean(!unit.value && weight.value)
                      }, null, 8, ["modelValue", "error"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_InlineError, {
                message: errorMessage,
                "field-id": unitSelectID
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
