import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
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
                        onChange: () => {
                        },
                        autoComplete: "off"
                      }),
                      createVNode(_component_TextField, {
                        type: "email",
                        label: "Account email",
                        onChange: () => {
                        },
                        autoComplete: "email"
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
const Annotated = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Annotated as default
};
