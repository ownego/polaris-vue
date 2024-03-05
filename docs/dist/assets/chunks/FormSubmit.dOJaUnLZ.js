import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode, a as createTextVNode, m as createBaseVNode } from "./framework.1qnja6qJ.js";
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("span", null, "We'll use this email address to inform you on future changes to Polaris.", -1);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FormSubmit",
  setup(__props) {
    const newsletter = ref(false);
    const email = ref("");
    const handleSubmit = () => {
      newsletter.value = false;
      email.value = "";
    };
    return (_ctx, _cache) => {
      const _component_Checkbox = resolveComponent("Checkbox");
      const _component_TextField = resolveComponent("TextField");
      const _component_Button = resolveComponent("Button");
      const _component_FormLayout = resolveComponent("FormLayout");
      const _component_Form = resolveComponent("Form");
      return openBlock(), createBlock(_component_Form, { onSubmit: handleSubmit }, {
        default: withCtx(() => [
          createVNode(_component_FormLayout, null, {
            default: withCtx(() => [
              createVNode(_component_Checkbox, {
                label: "Sign up for the Polaris newsletter",
                modelValue: newsletter.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => newsletter.value = $event)
              }, null, 8, ["modelValue"]),
              createVNode(_component_TextField, {
                modelValue: email.value,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => email.value = $event),
                label: "Email",
                type: "email",
                autoComplete: "email"
              }, {
                helpText: withCtx(() => [
                  _hoisted_1
                ]),
                _: 1
              }, 8, ["modelValue"]),
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
