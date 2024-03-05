import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Button = resolveComponent("Button");
  const _component_ActionList = resolveComponent("ActionList");
  const _component_Popover = resolveComponent("Popover");
  const _component_LegacyCardHeader = resolveComponent("LegacyCardHeader");
  const _component_ListItem = resolveComponent("ListItem");
  const _component_List = resolveComponent("List");
  const _component_LegacyCardSection = resolveComponent("LegacyCardSection");
  const _component_LegacyCard = resolveComponent("LegacyCard");
  return openBlock(), createBlock(_component_LegacyCard, null, {
    default: withCtx(() => [
      createVNode(_component_LegacyCardHeader, {
        title: "Staff accounts",
        actions: [{ content: "Preview" }]
      }, {
        default: withCtx(() => [
          createVNode(_component_Popover, {
            active: "",
            onClose: () => {
            }
          }, {
            activator: withCtx(() => [
              createVNode(_component_Button, {
                disclosure: "",
                variant: "plain"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Add account ")
                ]),
                _: 1
              })
            ]),
            default: withCtx(() => [
              createVNode(_component_ActionList, { items: [{ content: "Member" }, { content: "Admin" }] })
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_LegacyCardSection, null, {
        default: withCtx(() => [
          createVNode(_component_List, null, {
            default: withCtx(() => [
              createVNode(_component_ListItem, null, {
                default: withCtx(() => [
                  createTextVNode("Felix Crafford")
                ]),
                _: 1
              }),
              createVNode(_component_ListItem, null, {
                default: withCtx(() => [
                  createTextVNode("Ezequiel Manno")
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
const LegacyCardWithSeparateHeader = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  LegacyCardWithSeparateHeader as default
};
