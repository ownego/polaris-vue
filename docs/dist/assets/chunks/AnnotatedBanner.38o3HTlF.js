import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode, m as createBaseVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("p", null, "This order was archived on March 7, 2017 at 3:12pm EDT.", -1);
function _sfc_render(_ctx, _cache) {
  const _component_Banner = resolveComponent("Banner");
  const _component_LayoutSection = resolveComponent("LayoutSection");
  const _component_TextField = resolveComponent("TextField");
  const _component_FormLayout = resolveComponent("FormLayout");
  const _component_LegacyCard = resolveComponent("LegacyCard");
  const _component_LayoutAnnotatedSection = resolveComponent("LayoutAnnotatedSection");
  const _component_Layout = resolveComponent("Layout");
  const _component_Page = resolveComponent("Page");
  return openBlock(), createBlock(_component_Page, { fullWidth: "" }, {
    default: withCtx(() => [
      createVNode(_component_Layout, null, {
        default: withCtx(() => [
          createVNode(_component_LayoutSection, null, {
            default: withCtx(() => [
              createVNode(_component_Banner, {
                title: "Order archived",
                onDismiss: () => {
                }
              }, {
                default: withCtx(() => [
                  _hoisted_1
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_LayoutAnnotatedSection, {
            id: "storeDetails",
            title: "Store details",
            description: "Shopify and your customers will use this information to contact you."
          }, {
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
const AnnotatedBanner = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  AnnotatedBanner as default
};
