import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, t as toDisplayString, a as createTextVNode, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TabWithBadgeContent",
  setup(__props) {
    const selected = ref(0);
    const handleTabChange = (selectedTabIndex) => selected.value = selectedTabIndex;
    const tabs = [
      {
        id: "all-customers-fitted-3",
        content: "All",
        badge: "10+",
        accessibilityLabel: "All customers",
        panelID: "all-customers-fitted-content-3"
      },
      {
        id: "accepts-marketing-fitted-3",
        content: "Accepts marketing",
        badge: "4",
        panelID: "accepts-marketing-fitted-content-3"
      }
    ];
    return (_ctx, _cache) => {
      const _component_Text = resolveComponent("Text");
      const _component_LegacyCardSection = resolveComponent("LegacyCardSection");
      const _component_Tabs = resolveComponent("Tabs");
      const _component_LegacyCard = resolveComponent("LegacyCard");
      return openBlock(), createBlock(_component_LegacyCard, null, {
        default: withCtx(() => [
          createVNode(_component_Tabs, {
            tabs,
            selected: selected.value,
            fitted: true,
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
