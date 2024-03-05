import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Multiple",
  setup(__props) {
    const selected = ref([]);
    const options = [
      { value: "online_store", label: "Online Store" },
      { value: "messenger", label: "Messenger" },
      { value: "facebook", label: "Facebook" },
      { value: "wholesale", label: "Wholesale" },
      { value: "buzzfeed", label: "BuzzFeed" }
    ];
    const handleSelect = (value) => {
      selected.value = value;
    };
    return (_ctx, _cache) => {
      const _component_OptionList = resolveComponent("OptionList");
      const _component_LegacyCard = resolveComponent("LegacyCard");
      return openBlock(), createBlock(_component_LegacyCard, null, {
        default: withCtx(() => [
          createVNode(_component_OptionList, {
            title: "Manage sales channels availability",
            "allow-multiple": "",
            selected: selected.value,
            options,
            onChange: handleSelect
          }, null, 8, ["selected"])
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
