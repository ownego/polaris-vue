import { D as DeleteIcon } from "./Preview.vue_vue_type_style_index_0_lang.a_K4ko6J.js";
import { d as defineComponent, h as ref, k as computed, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode, m as createBaseVNode, p as unref } from "./framework.1qnja6qJ.js";
const _hoisted_1 = { style: { marginTop: "4px" } };
const textFieldID = "ruleContent";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SeparateValidationError",
  setup(__props) {
    const textFieldValue = ref("");
    const selectTypeValue = ref("Product type");
    const selectConditionValue = ref("is equal to");
    const isInvalid = computed(() => {
      return textFieldValue.value ? textFieldValue.value.length < 3 : true;
    });
    const errorMessage = computed(
      () => isInvalid.value ? "Enter 3 or more characters for product type is equal to" : ""
    );
    return (_ctx, _cache) => {
      const _component_Select = resolveComponent("Select");
      const _component_TextField = resolveComponent("TextField");
      const _component_FormLayoutGroup = resolveComponent("FormLayoutGroup");
      const _component_FormLayout = resolveComponent("FormLayout");
      const _component_InlineError = resolveComponent("InlineError");
      const _component_LegacyStackItem = resolveComponent("LegacyStackItem");
      const _component_Button = resolveComponent("Button");
      const _component_LegacyStack = resolveComponent("LegacyStack");
      const _component_LegacyCard = resolveComponent("LegacyCard");
      return openBlock(), createBlock(_component_LegacyCard, { sectioned: "" }, {
        default: withCtx(() => [
          createVNode(_component_FormLayout, null, {
            default: withCtx(() => [
              createVNode(_component_LegacyStack, {
                wrap: false,
                alignment: "leading",
                spacing: "loose"
              }, {
                default: withCtx(() => [
                  createVNode(_component_LegacyStackItem, { fill: "" }, {
                    default: withCtx(() => [
                      createVNode(_component_FormLayout, null, {
                        default: withCtx(() => [
                          createVNode(_component_FormLayoutGroup, { condensed: "" }, {
                            default: withCtx(() => [
                              createVNode(_component_Select, {
                                "label-hidden": "",
                                label: "Collection rule type",
                                options: ["Product type"],
                                modelValue: selectTypeValue.value,
                                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectTypeValue.value = $event)
                              }, null, 8, ["modelValue"]),
                              createVNode(_component_Select, {
                                "label-hidden": "",
                                label: "Collection rule condition",
                                options: ["is equal to"],
                                modelValue: selectConditionValue.value,
                                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => selectConditionValue.value = $event)
                              }, null, 8, ["modelValue"]),
                              createVNode(_component_TextField, {
                                "label-hidden": "",
                                label: "Collection rule content",
                                error: isInvalid.value,
                                id: textFieldID,
                                modelValue: textFieldValue.value,
                                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => textFieldValue.value = $event),
                                autoComplete: "off"
                              }, null, 8, ["error", "modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createBaseVNode("div", _hoisted_1, [
                        createVNode(_component_InlineError, {
                          message: errorMessage.value,
                          "field-id": textFieldID
                        }, null, 8, ["message"])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Button, {
                    icon: unref(DeleteIcon),
                    accessibilityLabel: "Remove item"
                  }, null, 8, ["icon"])
                ]),
                _: 1
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
