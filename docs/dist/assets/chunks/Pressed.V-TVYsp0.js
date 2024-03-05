import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Pressed",
  setup(__props) {
    const activeButtonIndex = ref(0);
    const handleButtonClick = (index) => {
      if (activeButtonIndex.value === index) {
        return;
      }
      activeButtonIndex.value = index;
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_ButtonGroup = resolveComponent("ButtonGroup");
      return openBlock(), createBlock(_component_ButtonGroup, { variant: "segmented" }, {
        default: withCtx(() => [
          createVNode(_component_Button, {
            pressed: activeButtonIndex.value === 0,
            onClick: _cache[0] || (_cache[0] = () => handleButtonClick(0))
          }, {
            default: withCtx(() => [
              createTextVNode(" Bold ")
            ]),
            _: 1
          }, 8, ["pressed"]),
          createVNode(_component_Button, {
            pressed: activeButtonIndex.value === 1,
            onClick: _cache[1] || (_cache[1] = () => handleButtonClick(1))
          }, {
            default: withCtx(() => [
              createTextVNode(" Italic ")
            ]),
            _: 1
          }, 8, ["pressed"]),
          createVNode(_component_Button, {
            pressed: activeButtonIndex.value === 2,
            onClick: _cache[2] || (_cache[2] = () => handleButtonClick(2))
          }, {
            default: withCtx(() => [
              createTextVNode(" Underline ")
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
