import { _ as _export_sfc, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode, w as withCtx, a as createTextVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
const _hoisted_1 = { style: { "height": "100px" } };
function _sfc_render(_ctx, _cache) {
  const _component_Button = resolveComponent("Button");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_Button, {
      disclosure: "select",
      onClick: _cache[0] || (_cache[0] = () => console.log("Open Popover"))
    }, {
      default: withCtx(() => [
        createTextVNode(" Select options ")
      ]),
      _: 1
    })
  ]);
}
const SelectDisclosure = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  SelectDisclosure as default
};
