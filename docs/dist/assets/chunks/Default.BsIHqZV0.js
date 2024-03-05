import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Default",
  setup(__props) {
    const isCollapse = ref(false);
    const handleClick = () => {
      isCollapse.value = !isCollapse.value;
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Text = resolveComponent("Text");
      const _component_Box = resolveComponent("Box");
      const _component_Collapsible = resolveComponent("Collapsible");
      return openBlock(), createBlock(_component_Box, {
        padding: "400",
        background: "bg-surface",
        borderRadius: "200"
      }, {
        default: withCtx(() => [
          createVNode(_component_Button, {
            "aria-controls": "basic-collapsible",
            "aria-expanded": isCollapse.value,
            onClick: handleClick
          }, {
            default: withCtx(() => [
              createTextVNode(" Toggle ")
            ]),
            _: 1
          }, 8, ["aria-expanded"]),
          createVNode(_component_Collapsible, {
            id: "collapsible",
            expandOnPrint: true,
            open: isCollapse.value
          }, {
            default: withCtx(() => [
              createVNode(_component_Box, { paddingBlockStart: "400" }, {
                default: withCtx(() => [
                  createVNode(_component_Text, { as: "p" }, {
                    default: withCtx(() => [
                      createTextVNode(" Your mailing list lets you contact customers or visitors who have shown an interest in your store. Reach out to them with exclusive offers or updates about your products. ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["open"])
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
