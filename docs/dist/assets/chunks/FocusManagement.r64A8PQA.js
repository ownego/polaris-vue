import { d as defineComponent, h as ref, k as computed, y as watch, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode, a as createTextVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FocusManagement",
  setup(__props) {
    const tabs = [
      {
        id: "all-customers",
        content: "All",
        accessibilityLabel: "All customers",
        panelID: "all-customers-content"
      },
      {
        id: "accepts-marketing",
        content: "Accepts marketing",
        panelID: "accepts-marketing-content"
      }
    ];
    const selected = ref(0);
    const loading = ref(false);
    const value = ref("");
    const textFieldFocused = ref(false);
    const label = computed(() => selected.value ? "Marketings" : "Customers");
    const handleTabChange = (selectedTab) => {
      loading.value = true;
      selected.value = selectedTab;
      setTimeout(() => {
        value.value = "";
        loading.value = false;
      }, 2e3);
    };
    const handleUrlChange = (url) => {
      value.value = url;
    };
    const handleSubmit = () => {
      value.value = "";
    };
    watch(
      () => loading.value,
      () => {
        textFieldFocused.value = !loading.value;
      }
    );
    return (_ctx, _cache) => {
      const _component_Spinner = resolveComponent("Spinner");
      const _component_TextField = resolveComponent("TextField");
      const _component_Button = resolveComponent("Button");
      const _component_FormLayout = resolveComponent("FormLayout");
      const _component_Form = resolveComponent("Form");
      const _component_LegacyCardSection = resolveComponent("LegacyCardSection");
      const _component_Tabs = resolveComponent("Tabs");
      const _component_LegacyCard = resolveComponent("LegacyCard");
      return openBlock(), createBlock(_component_LegacyCard, null, {
        default: withCtx(() => [
          createVNode(_component_Tabs, {
            tabs,
            selected: selected.value,
            onSelect: handleTabChange
          }, {
            default: withCtx(() => [
              createVNode(_component_LegacyCardSection, {
                title: tabs[selected.value].content
              }, {
                default: withCtx(() => [
                  loading.value ? (openBlock(), createBlock(_component_Spinner, {
                    key: 0,
                    "accessibility-label": "Loading form field",
                    "has-focusable-parent": false
                  })) : (openBlock(), createBlock(_component_Form, {
                    key: 1,
                    "no-validate": "",
                    onSubmit: handleSubmit
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_FormLayout, null, {
                        default: withCtx(() => [
                          createVNode(_component_TextField, {
                            "auto-complete": "off",
                            value: value.value,
                            focused: textFieldFocused.value,
                            label: label.value,
                            onChange: handleUrlChange
                          }, null, 8, ["value", "focused", "label"]),
                          createVNode(_component_Button, { submit: "" }, {
                            default: withCtx(() => [
                              createTextVNode("Submit")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              }, 8, ["title"])
            ]),
            _: 1
          }, 8, ["selected"])
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
