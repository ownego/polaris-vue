import { _ as _export_sfc, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode, w as withCtx, a as createTextVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
const _hoisted_1 = { style: { "padding": "75px 0" } };
function _sfc_render(_ctx, _cache) {
  const _component_Text = resolveComponent("Text");
  const _component_InlineStack = resolveComponent("InlineStack");
  const _component_Button = resolveComponent("Button");
  const _component_Tooltip = resolveComponent("Tooltip");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_Tooltip, null, {
      content: withCtx(() => [
        createVNode(_component_InlineStack, { gap: "200" }, {
          default: withCtx(() => [
            createTextVNode(" Bold "),
            createVNode(_component_Text, {
              as: "span",
              variant: "bodyMd",
              tone: "subdued"
            }, {
              default: withCtx(() => [
                createTextVNode(" ⌘B ")
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      default: withCtx(() => [
        createVNode(_component_Button, null, {
          default: withCtx(() => [
            createTextVNode("B")
          ]),
          _: 1
        })
      ]),
      _: 1
    })
  ]);
}
const Suffix = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Suffix as default
};
