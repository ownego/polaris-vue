import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_SkeletonBodyText = resolveComponent("SkeletonBodyText");
  const _component_LegacyCard = resolveComponent("LegacyCard");
  const _component_SkeletonDisplayText = resolveComponent("SkeletonDisplayText");
  const _component_TextContainer = resolveComponent("TextContainer");
  const _component_LayoutSection = resolveComponent("LayoutSection");
  const _component_LegacyCardSection = resolveComponent("LegacyCardSection");
  const _component_Layout = resolveComponent("Layout");
  const _component_SkeletonPage = resolveComponent("SkeletonPage");
  return openBlock(), createBlock(_component_SkeletonPage, { primaryAction: "" }, {
    default: withCtx(() => [
      createVNode(_component_Layout, null, {
        default: withCtx(() => [
          createVNode(_component_LayoutSection, null, {
            default: withCtx(() => [
              createVNode(_component_LegacyCard, { sectioned: "" }, {
                default: withCtx(() => [
                  createVNode(_component_SkeletonBodyText)
                ]),
                _: 1
              }),
              createVNode(_component_LegacyCard, { sectioned: "" }, {
                default: withCtx(() => [
                  createVNode(_component_TextContainer, null, {
                    default: withCtx(() => [
                      createVNode(_component_SkeletonDisplayText, { size: "small" }),
                      createVNode(_component_SkeletonBodyText)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_LegacyCard, { sectioned: "" }, {
                default: withCtx(() => [
                  createVNode(_component_TextContainer, null, {
                    default: withCtx(() => [
                      createVNode(_component_SkeletonDisplayText, { size: "small" }),
                      createVNode(_component_SkeletonBodyText)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_LayoutSection, { variant: "oneThird" }, {
            default: withCtx(() => [
              createVNode(_component_LegacyCard, null, {
                default: withCtx(() => [
                  createVNode(_component_LegacyCardSection, null, {
                    default: withCtx(() => [
                      createVNode(_component_TextContainer, null, {
                        default: withCtx(() => [
                          createVNode(_component_SkeletonDisplayText, { size: "small" }),
                          createVNode(_component_SkeletonBodyText, { lines: 2 })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_LegacyCardSection, null, {
                    default: withCtx(() => [
                      createVNode(_component_SkeletonBodyText, { lines: 1 })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_LegacyCard, { subdued: "" }, {
                default: withCtx(() => [
                  createVNode(_component_LegacyCardSection, null, {
                    default: withCtx(() => [
                      createVNode(_component_TextContainer, null, {
                        default: withCtx(() => [
                          createVNode(_component_SkeletonDisplayText, { size: "small" }),
                          createVNode(_component_SkeletonBodyText, { lines: 2 })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_LegacyCardSection, null, {
                    default: withCtx(() => [
                      createVNode(_component_SkeletonBodyText, { lines: 2 })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
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
const Default = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Default as default
};
