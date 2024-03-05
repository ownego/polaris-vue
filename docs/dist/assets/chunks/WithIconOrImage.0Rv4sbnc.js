import { a as DuplicateIcon } from "./Preview.vue_vue_type_style_index_0_lang.w_jMciSf.js";
import { o as openBlock, c as createElementBlock, m as createBaseVNode, d as defineComponent, h as ref, D as resolveComponent, I as createVNode, w as withCtx, a as createTextVNode } from "./framework.2IsXxFXf.js";
const _hoisted_1$1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20"
};
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("path", { d: "M8.25 10.75A.75.75 0 0 1 9 10h2a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("path", {
  "fill-rule": "evenodd",
  d: "M5.25 3.5A1.75 1.75 0 0 0 3.5 5.25v2c0 .595.297 1.12.75 1.436v5.064A2.75 2.75 0 0 0 7 16.5h6a2.75 2.75 0 0 0 2.75-2.75V8.686c.453-.316.75-.841.75-1.436v-2a1.75 1.75 0 0 0-1.75-1.75zm9 5.5h-8.5v4.75c0 .69.56 1.25 1.25 1.25h6c.69 0 1.25-.56 1.25-1.25zM5 5.25A.25.25 0 0 1 5.25 5h9.5a.25.25 0 0 1 .25.25v2a.25.25 0 0 1-.25.25h-9.5A.25.25 0 0 1 5 7.25z"
}, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$1, [..._hoisted_4]);
}
const ArchiveIcon = { render };
const _hoisted_1 = { style: { "height": "250px" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithIconOrImage",
  setup(__props) {
    const active = ref(true);
    const toggleActive = () => {
      active.value = !active.value;
    };
    const actionItems = [
      {
        content: "Duplicate",
        icon: DuplicateIcon
      },
      {
        content: "Archive",
        icon: ArchiveIcon
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
