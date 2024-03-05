import { _ as _export_sfc, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode, w as withCtx, a as createTextVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Text = resolveComponent("Text");
  const _component_Tooltip = resolveComponent("Tooltip");
  return openBlock(), createElementBlock("div", null, [
    createVNode(_component_Tooltip, {
      active: "",
      content: "This order has shipping labels."
    }, {
      default: withCtx(() => [
        createVNode(_component_Text, {
          fontWeight: "bold",
          as: "span"
        }, {
          default: withCtx(() => [
            createTextVNode(" Order #1001 ")
          ]),
          _: 1
        })
      ]),
      _: 1
    })
  ]);
}
const Default = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Default as default
};
