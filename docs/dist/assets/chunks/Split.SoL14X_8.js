import { b as ChevronDownIcon } from "./Preview.vue_vue_type_style_index_0_lang.w_jMciSf.js";
import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode, w as withCtx, a as createTextVNode, p as unref } from "./framework.2IsXxFXf.js";
const _hoisted_1 = { style: { "height": "100px" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Split",
  setup(__props) {
    const active = ref(null);
    const toggleActive = (id) => {
      active.value = active.value !== id ? id : null;
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_ActionList = resolveComponent("ActionList");
      const _component_Popover = resolveComponent("Popover");
      const _component_ButtonGroup = resolveComponent("ButtonGroup");
      const _component_InlineStack = resolveComponent("InlineStack");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_InlineStack, { gap: "500" }, {
          default: withCtx(() => [
            createVNode(_component_ButtonGroup, { variant: "segmented" }, {
              default: withCtx(() => [
                createVNode(_component_Button, { variant: "primary" }, {
                  default: withCtx(() => [
                    createTextVNode("Save")
                  ]),
                  _: 1
                }),
                createVNode(_component_Popover, {
                  active: active.value === "popover1",
                  "preferred-alignment": "right",
                  autofocusTarget: "first-node",
                  onClose: _cache[1] || (_cache[1] = ($event) => toggleActive("popover1"))
                }, {
                  activator: withCtx(() => [
                    createVNode(_component_Button, {
                      variant: "primary",
                      icon: unref(ChevronDownIcon),
                      "accessibility-label": "Other save actions",
                      onClick: _cache[0] || (_cache[0] = ($event) => toggleActive("popover1"))
                    }, null, 8, ["icon"])
                  ]),
                  default: withCtx(() => [
                    createVNode(_component_ActionList, {
                      actionRole: "menuitem",
                      items: [{ content: "Save as draft" }]
                    })
                  ]),
                  _: 1
                }, 8, ["active"])
              ]),
              _: 1
            }),
            createVNode(_component_ButtonGroup, { variant: "segmented" }, {
              default: withCtx(() => [
                createVNode(_component_Button, null, {
                  default: withCtx(() => [
                    createTextVNode("Save")
                  ]),
                  _: 1
                }),
                createVNode(_component_Popover, {
                  active: active.value === "popover2",
                  "preferred-alignment": "right",
                  autofocusTarget: "first-node",
                  onClose: _cache[3] || (_cache[3] = ($event) => toggleActive("popover2"))
                }, {
                  activator: withCtx(() => [
                    createVNode(_component_Button, {
                      icon: unref(ChevronDownIcon),
                      "accessibility-label": "Other save actions",
                      onClick: _cache[2] || (_cache[2] = ($event) => toggleActive("popover2"))
                    }, null, 8, ["icon"])
                  ]),
                  default: withCtx(() => [
                    createVNode(_component_ActionList, {
                      actionRole: "menuitem",
                      items: [{ content: "Save as draft" }]
                    })
                  ]),
                  _: 1
                }, 8, ["active"])
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  _sfc_main as default
};
