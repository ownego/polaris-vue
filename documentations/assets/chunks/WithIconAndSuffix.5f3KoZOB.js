import { I as ImportIcon, E as ExportIcon } from "./ImportIcon.mTRnASI-.js";
import { o as openBlock, c as createElementBlock, m as createBaseVNode, d as defineComponent, h as ref, a3 as h, D as resolveComponent, I as createVNode, w as withCtx, a as createTextVNode } from "./framework.2IsXxFXf.js";
const _hoisted_1$1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20"
};
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("path", {
  "fill-rule": "evenodd",
  d: "M14.03 7.22a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 1 1 1.06-1.06L9 11.19l3.97-3.97a.75.75 0 0 1 1.06 0"
}, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$1, [..._hoisted_3]);
}
const CheckSmallIcon = { render };
const _hoisted_1 = { style: { "height": "250px" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithIconAndSuffix",
  setup(__props) {
    const active = ref(true);
    const toggleActive = () => {
      active.value = !active.value;
    };
    const suffixImport = h(resolveComponent("Icon"), { source: CheckSmallIcon });
    const actionItems = [
      {
        active: true,
        content: "Import file",
        icon: ImportIcon,
        suffix: suffixImport
      },
      {
        content: "Export file",
        icon: ExportIcon
      }
    ];
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_ActionList = resolveComponent("ActionList");
      const _component_Popover = resolveComponent("Popover");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_Popover, {
          active: active.value,
          autofocusTarget: "first-node",
          onClose: toggleActive
        }, {
          activator: withCtx(() => [
            createVNode(_component_Button, {
              onClick: toggleActive,
              disclosure: ""
            }, {
              default: withCtx(() => [
                createTextVNode(" More actions ")
              ]),
              _: 1
            })
          ]),
          default: withCtx(() => [
            createVNode(_component_ActionList, {
              actionRole: "menuitem",
              items: actionItems
            })
          ]),
          _: 1
        }, 8, ["active"])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
