import { _ as _export_sfc, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode, w as withCtx, a as createTextVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
const _hoisted_1 = { style: { "width": "200px" } };
function _sfc_render(_ctx, _cache) {
  const _component_Button = resolveComponent("Button");
  const _component_Tooltip = resolveComponent("Tooltip");
  const _component_ButtonGroup = resolveComponent("ButtonGroup");
  const _component_TextField = resolveComponent("TextField");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_ButtonGroup, {
      variant: "segmented",
      fullWidth: ""
    }, {
      default: withCtx(() => [
        createVNode(_component_Tooltip, {
          content: "Bold",
          dismissOnMouseOut: ""
        }, {
          default: withCtx(() => [
            createVNode(_component_Button, null, {
              default: withCtx(() => [
                createTextVNode("B")
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(_component_Tooltip, {
          content: "Italic",
          dismissOnMouseOut: ""
        }, {
          default: withCtx(() => [
            createVNode(_component_Button, null, {
              default: withCtx(() => [
                createTextVNode("I")
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(_component_Tooltip, {
          content: "Underline",
          dismissOnMouseOut: ""
        }, {
          default: withCtx(() => [
            createVNode(_component_Button, null, {
              default: withCtx(() => [
                createTextVNode("U")
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(_component_Tooltip, {
          content: "Strikethrough",
          dismissOnMouseOut: ""
        }, {
          default: withCtx(() => [
            createVNode(_component_Button, null, {
              default: withCtx(() => [
                createTextVNode("S")
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }),
    createVNode(_component_TextField, {
      label: "Product title",
      autoComplete: "off",
      labelHidden: "",
      multiline: ""
    })
  ]);
}
const ChildInteract = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ChildInteract as default
};
