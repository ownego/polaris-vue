import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Button = resolveComponent("Button");
  return openBlock(), createBlock(_component_Button, {
    variant: "plain",
    "text-align": "left"
  }, {
    default: withCtx(() => [
      createTextVNode(" This is a really long string of text that overflows onto the next line we need to put in a lot of words now you can see the alignment. It is very long but a customer could potentially name something this long. ")
    ]),
    _: 1
  });
}
const TextAligned = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  TextAligned as default
};
