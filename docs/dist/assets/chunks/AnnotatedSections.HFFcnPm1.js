import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, Q as normalizeStyle, a as createTextVNode, I as createVNode, m as createBaseVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Text = resolveComponent("Text");
  const _component_TextContainer = resolveComponent("TextContainer");
  const _component_LayoutSection = resolveComponent("LayoutSection");
  const _component_TextField = resolveComponent("TextField");
  const _component_FormLayout = resolveComponent("FormLayout");
  const _component_LegacyCard = resolveComponent("LegacyCard");
  const _component_Layout = resolveComponent("Layout");
  const _component_Page = resolveComponent("Page");
  return openBlock(), createBlock(_component_Page, { fullWidth: "" }, {
    default: withCtx(() => [
      createVNode(_component_Layout, null, {
        default: withCtx(() => [
          createVNode(_component_LayoutSection, { variant: "oneThird" }, {
            default: withCtx(() => [
              createBaseVNode("div", {
                style: normalizeStyle({ marginTop: "var(--p-space-500)" })
              }, [
                createVNode(_component_TextContainer, null, {
                  default: withCtx(() => [
                    createVNode(_component_Text, {
                      id: "storeDetails",
                      variant: "headingMd",
                      as: "h2"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Store details ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Text, {
                      tone: "subdued",
                      as: "p"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Shopify and your customers will use this information to contact you. ")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ], 4)
            ]),
            _: 1
          }),
          createVNode(_component_LayoutSection, null, {
            default: withCtx(() => [
              createVNode(_component_LegacyCard, { sectioned: "" }, {
                default: withCtx(() => [
                  createVNode(_component_FormLayout, null, {
                    default: withCtx(() => [
                      createVNode(_component_TextField, {
                        label: "Store name",
                        autoComplete: "off",
                        onChange: () => {
                        }
                      }),
                      createVNode(_component_TextField, {
                        type: "email",
                        label: "Account email",
                        autoComplete: "email",
                        onChange: () => {
                        }
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
      })
    ]),
    _: 1
  });
}
const AnnotatedSections = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  AnnotatedSections as default
};
