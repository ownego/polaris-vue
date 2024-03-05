import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithSeparateHeader",
  setup(__props) {
    const actionActive = ref(false);
    const handleToggleAction = () => {
      actionActive.value = !actionActive.value;
    };
    const items = [{ content: "Member" }, { content: "Admin" }];
    return (_ctx, _cache) => {
      const _component_Text = resolveComponent("Text");
      const _component_Button = resolveComponent("Button");
      const _component_ActionList = resolveComponent("ActionList");
      const _component_Popover = resolveComponent("Popover");
      const _component_ButtonGroup = resolveComponent("ButtonGroup");
      const _component_InlineGrid = resolveComponent("InlineGrid");
      const _component_ListItem = resolveComponent("ListItem");
      const _component_List = resolveComponent("List");
      const _component_BlockStack = resolveComponent("BlockStack");
      const _component_Card = resolveComponent("Card");
      return openBlock(), createBlock(_component_Card, { roundedAbove: "sm" }, {
        default: withCtx(() => [
          createVNode(_component_BlockStack, { gap: "200" }, {
            default: withCtx(() => [
              createVNode(_component_InlineGrid, { columns: "1fr auto" }, {
                default: withCtx(() => [
                  createVNode(_component_Text, {
                    as: "h2",
                    variant: "headingSm"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Staff accounts ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_ButtonGroup, null, {
                    default: withCtx(() => [
                      createVNode(_component_Button, {
                        variant: "plain",
                        accessibilityLabel: "Preview",
                        onClick: () => {
                        }
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Preview ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Popover, {
                        active: actionActive.value,
                        onClose: handleToggleAction
                      }, {
                        activator: withCtx(() => [
                          createVNode(_component_Button, {
                            variant: "plain",
                            disclosure: "",
                            onClick: handleToggleAction
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Add account ")
                            ]),
                            _: 1
                          })
                        ]),
                        default: withCtx(() => [
                          createVNode(_component_ActionList, { items })
                        ]),
                        _: 1
                      }, 8, ["active"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
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
    };
  }
});
export {
  _sfc_main as default
};
