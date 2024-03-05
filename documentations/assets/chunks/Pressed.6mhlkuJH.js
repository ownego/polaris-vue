import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Pressed",
  setup(__props) {
    const isFirstButtonActive = ref(true);
    const handleFirstButtonClick = () => {
      if (isFirstButtonActive.value)
        return;
      isFirstButtonActive.value = true;
    };
    const handleSecondButtonClick = () => {
      if (!isFirstButtonActive.value)
        return;
      isFirstButtonActive.value = false;
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_ButtonGroup = resolveComponent("ButtonGroup");
      return openBlock(), createBlock(_component_ButtonGroup, { variant: "segmented" }, {
        default: withCtx(() => [
          createVNode(_component_Button, {
            pressed: isFirstButtonActive.value,
            onClick: handleFirstButtonClick
          }, {
            default: withCtx(() => [
              createTextVNode(" First button ")
            ]),
            _: 1
          }, 8, ["pressed"]),
          createVNode(_component_Button, {
            pressed: !isFirstButtonActive.value,
            onClick: handleSecondButtonClick
          }, {
            default: withCtx(() => [
              createTextVNode(" Second button ")
            ]),
            _: 1
          }, 8, ["pressed"])
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
