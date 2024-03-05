import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, c as createElementBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode, m as createBaseVNode, e as createCommentVNode } from "./framework.1qnja6qJ.js";
const _hoisted_1 = { style: { "height": "250px", "width": "100%" } };
const _hoisted_2 = { style: { "marginLeft": "1rem", "flexGrow": "1" } };
const _hoisted_3 = { style: { "padding": "1rem" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithChildren",
  setup(__props) {
    const style = {
      display: "flex",
      flexGrow: 1,
      justifyContent: "space-between",
      alignItems: "center",
      paddingLeft: "1rem",
      paddingRight: "1rem"
    };
    const isFullscreen = ref(true);
    const setFullscreen = (value) => {
      isFullscreen.value = value;
    };
    const handleActionClick = () => {
      setFullscreen(false);
    };
    return (_ctx, _cache) => {
      const _component_Badge = resolveComponent("Badge");
      const _component_Text = resolveComponent("Text");
      const _component_Button = resolveComponent("Button");
      const _component_ButtonGroup = resolveComponent("ButtonGroup");
      const _component_FullscreenBar = resolveComponent("FullscreenBar");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        isFullscreen.value ? (openBlock(), createBlock(_component_FullscreenBar, {
          key: 0,
          onAction: handleActionClick
        }, {
          default: withCtx(() => [
            createBaseVNode("div", { style }, [
              createVNode(_component_Badge, { tone: "info" }, {
                default: withCtx(() => [
                  createTextVNode("Draft")
                ]),
                _: 1
              }),
              createBaseVNode("div", _hoisted_2, [
                createVNode(_component_Text, {
                  variant: "headingLg",
                  as: "p"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Page title ")
                  ]),
                  _: 1
                })
              ]),
              createVNode(_component_ButtonGroup, null, {
                default: withCtx(() => [
                  createVNode(_component_Button, null, {
                    default: withCtx(() => [
                      createTextVNode("Secondary Action")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Button, { variant: "primary" }, {
                    default: withCtx(() => [
                      createTextVNode(" Primary Action ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        })) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_3, [
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
