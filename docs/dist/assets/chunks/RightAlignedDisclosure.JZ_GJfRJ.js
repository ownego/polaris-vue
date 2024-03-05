import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode, w as withCtx, t as toDisplayString, a as createTextVNode } from "./framework.2IsXxFXf.js";
const _hoisted_1 = { style: { "width": "200px" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RightAlignedDisclosure",
  setup(__props) {
    const expanded = ref(false);
    const onClick = () => {
      expanded.value = !expanded.value;
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_Button, {
          fullWidth: "",
          textAlign: "left",
          disclosure: expanded.value ? "up" : "down",
          onClick
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(expanded.value ? "Show less" : "Show more"), 1)
          ]),
          _: 1
        }, 8, ["disclosure"])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
