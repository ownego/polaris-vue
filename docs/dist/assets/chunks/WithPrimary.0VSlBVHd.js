import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode, m as createBaseVNode } from "./framework.2IsXxFXf.js";
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("p", null, " You can share this discount link with your customers via email or social media. Your discount will be automatically applied at checkout. ", -1);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithPrimary",
  setup(__props) {
    const active = ref(false);
    const primaryAction = {
      content: "Add Instagram",
      onAction: () => {
      }
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Modal = resolveComponent("Modal");
      return openBlock(), createBlock(_component_Modal, {
        sectioned: "",
        open: active.value,
        "primary-action": primaryAction,
        onClose: _cache[1] || (_cache[1] = ($event) => active.value = false)
      }, {
        activator: withCtx(() => [
          createVNode(_component_Button, {
            onClick: _cache[0] || (_cache[0] = ($event) => active.value = true)
          }, {
            default: withCtx(() => [
              createTextVNode(" Open ")
            ]),
            _: 1
          })
        ]),
        title: withCtx(() => [
          createTextVNode(" Get a shareable link ")
        ]),
        default: withCtx(() => [
          _hoisted_1
        ]),
        _: 1
      }, 8, ["open"]);
    };
  }
});
export {
  _sfc_main as default
};
