import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode, a as createTextVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithoutValidation",
  setup(__props) {
    const url = ref("");
    const handleSubmit = () => {
      url.value = "";
    };
    return (_ctx, _cache) => {
      const _component_TextField = resolveComponent("TextField");
      const _component_Button = resolveComponent("Button");
      const _component_FormLayout = resolveComponent("FormLayout");
      const _component_Form = resolveComponent("Form");
      return openBlock(), createBlock(_component_Form, {
        noValidate: "",
        onSubmit: handleSubmit
      }, {
        default: withCtx(() => [
          createVNode(_component_FormLayout, null, {
            default: withCtx(() => [
              createVNode(_component_TextField, {
                modelValue: url.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => url.value = $event),
                label: "App URL",
                type: "url",
                autoComplete: "off"
              }, null, 8, ["modelValue"]),
              createVNode(_component_Button, { type: "submit" }, {
                default: withCtx(() => [
                  createTextVNode("Submit")
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
