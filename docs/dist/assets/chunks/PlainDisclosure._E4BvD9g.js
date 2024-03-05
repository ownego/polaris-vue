import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, t as toDisplayString, a as createTextVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PlainDisclosure",
  setup(__props) {
    const expanded = ref(false);
    const setExpanded = () => {
      expanded.value = !expanded.value;
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createBlock(_component_Button, {
        variant: "plain",
        disclosure: expanded.value ? "up" : "down",
        onClick: setExpanded
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(expanded.value ? "Show less" : "Show more"), 1)
        ]),
        _: 1
      }, 8, ["disclosure"]);
    };
  }
});
export {
  _sfc_main as default
};
