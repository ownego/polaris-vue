import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode, m as createBaseVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("br", null, null, -1);
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("br", null, null, -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("br", null, null, -1);
const _hoisted_4 = /* @__PURE__ */ createBaseVNode("br", null, null, -1);
function _sfc_render(_ctx, _cache) {
  const _component_Text = resolveComponent("Text");
  const _component_LegacyCardSection = resolveComponent("LegacyCardSection");
  const _component_LegacyCardSubsection = resolveComponent("LegacyCardSubsection");
  const _component_LegacyCard = resolveComponent("LegacyCard");
  return openBlock(), createBlock(_component_LegacyCard, { title: "Customer" }, {
    default: withCtx(() => [
      createVNode(_component_LegacyCardSection, { title: "Reports" }, {
        default: withCtx(() => [
          createVNode(_component_Text, { as: "p" }, {
            default: withCtx(() => [
              createTextVNode("John Smith")
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_LegacyCardSection, { title: "Addresses" }, {
        default: withCtx(() => [
          createVNode(_component_LegacyCardSubsection, null, {
            default: withCtx(() => [
              createTextVNode(" 123 First St "),
              _hoisted_1,
              createTextVNode(" Somewhere "),
              _hoisted_2,
              createTextVNode(" The Universe ")
            ]),
            _: 1
          }),
          createVNode(_component_LegacyCardSubsection, null, {
            default: withCtx(() => [
              createTextVNode(" 123 Second St "),
              _hoisted_3,
              createTextVNode(" Somewhere "),
              _hoisted_4,
              createTextVNode(" The Universe ")
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_LegacyCardSection, null, {
        default: withCtx(() => [
          createVNode(_component_LegacyCardSubsection, null, {
            default: withCtx(() => [
              createTextVNode(" A single subsection without a sibling has no visual appearance ")
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const LegacyCardWithSubsection = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  LegacyCardWithSubsection as default
};
