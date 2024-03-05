import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, t as toDisplayString, a as createTextVNode, I as createVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Default",
  setup(__props) {
    const selected = ref(0);
    const tabs = [
      {
        id: "all-customers-1",
        content: "All",
        accessibilityLabel: "All customers",
        panelID: "all-customers-content-1"
      },
      {
        id: "accepts-marketing-1",
        content: "Accepts marketing",
        panelID: "accepts-marketing-content-1"
      },
      {
        id: "repeat-customers-1",
        content: "Repeat customers",
        panelID: "repeat-customers-content-1"
      },
      {
        id: "prospects-1",
        content: "Prospects",
        panelID: "prospects-content-1"
      }
    ];
    const handleTabChange = (value) => selected.value = value;
    return (_ctx, _cache) => {
      const _component_Text = resolveComponent("Text");
      const _component_LegacyCardSection = resolveComponent("LegacyCardSection");
      const _component_Tabs = resolveComponent("Tabs");
      return openBlock(), createBlock(_component_Tabs, {
        tabs,
        selected: selected.value,
        onSelect: handleTabChange
      }, {
        default: withCtx(() => [
          createVNode(_component_LegacyCardSection, {
            title: tabs[selected.value].content
          }, {
            default: withCtx(() => [
              createVNode(_component_Text, { as: "p" }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(`Tab ${selected.value} selected`), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["title"])
        ]),
        _: 1
      }, 8, ["selected"]);
    };
  }
});
export {
  _sfc_main as default
};
