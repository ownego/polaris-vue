import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, c as createElementBlock, b as createBlock, e as createCommentVNode, m as createBaseVNode, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.2IsXxFXf.js";
const _hoisted_1 = { style: { "height": "250px", "width": "100%" } };
const _hoisted_2 = { style: { "padding": "1rem" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "NoChildren",
  setup(__props) {
    const isFullscreen = ref(true);
    const setFullscreen = (value) => {
      isFullscreen.value = value;
    };
    const handleActionClick = () => {
      setFullscreen(false);
    };
    return (_ctx, _cache) => {
      const _component_FullscreenBar = resolveComponent("FullscreenBar");
      const _component_Button = resolveComponent("Button");
      const _component_Text = resolveComponent("Text");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        isFullscreen.value ? (openBlock(), createBlock(_component_FullscreenBar, {
          key: 0,
          onAction: handleActionClick
        })) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_2, [
          !isFullscreen.value ? (openBlock(), createBlock(_component_Button, {
            key: 0,
            onClick: _cache[0] || (_cache[0] = ($event) => setFullscreen(true))
          }, {
            default: withCtx(() => [
              createTextVNode("Go Fullscreen")
            ]),
            _: 1
          })) : createCommentVNode("", true),
          createVNode(_component_Text, {
            variant: "headingLg",
            as: "p"
          }, {
            default: withCtx(() => [
              createTextVNode(" Page content ")
            ]),
            _: 1
          })
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
