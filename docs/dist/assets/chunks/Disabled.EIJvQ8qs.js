import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode, m as createBaseVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
const _hoisted_1 = { style: { "color": "#bf0711" } };
function _sfc_render(_ctx, _cache) {
  const _component_Button = resolveComponent("Button");
  const _component_ButtonGroup = resolveComponent("ButtonGroup");
  return openBlock(), createBlock(_component_ButtonGroup, null, {
    default: withCtx(() => [
      createVNode(_component_Button, { disabled: "" }, {
        default: withCtx(() => [
          createTextVNode("Buy shipping label")
        ]),
        _: 1
      }),
      createVNode(_component_Button, {
        variant: "primary",
        disabled: ""
      }, {
        default: withCtx(() => [
          createTextVNode(" Buy shipping label ")
        ]),
        _: 1
      }),
      createVNode(_component_Button, {
        tone: "critical",
        disabled: ""
      }, {
        default: withCtx(() => [
          createTextVNode(" Buy shipping label ")
        ]),
        _: 1
      }),
      createBaseVNode("span", _hoisted_1, [
        createVNode(_component_Button, {
          variant: "monochromePlain",
          disabled: ""
        }, {
          default: withCtx(() => [
            createTextVNode(" Buy shipping label ")
          ]),
          _: 1
        })
      ]),
      createVNode(_component_Button, {
        variant: "plain",
        disabled: ""
      }, {
        default: withCtx(() => [
          createTextVNode(" Buy shipping label ")
        ]),
        _: 1
      }),
      createVNode(_component_Button, {
        variant: "plain",
        tone: "critical",
        disabled: ""
      }, {
        default: withCtx(() => [
          createTextVNode(" Buy shipping label ")
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const Disabled = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Disabled as default
};
