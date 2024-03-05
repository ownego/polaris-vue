import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, Q as normalizeStyle, a as createTextVNode, I as createVNode, m as createBaseVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Text = resolveComponent("Text");
  const _component_Box = resolveComponent("Box");
  return openBlock(), createBlock(_component_Box, { shadow: "300" }, {
    default: withCtx(() => [
      createBaseVNode("div", {
        style: normalizeStyle({ background: "var(--p-color-text-info)" })
      }, [
        createVNode(_component_Text, {
          as: "p",
          variant: "bodyMd",
          tone: "text-inverse"
        }, {
          default: withCtx(() => [
            createTextVNode(" Content inside a box ")
          ]),
          _: 1
        })
      ], 4)
    ]),
    _: 1
  });
}
const Shadow = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Shadow as default
};
