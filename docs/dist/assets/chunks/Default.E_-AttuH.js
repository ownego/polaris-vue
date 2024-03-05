import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Default",
  setup(__props) {
    const options = [
      { value: "byward_market", label: "Byward Market" },
      { value: "centretown", label: "Centretown" },
      { value: "hintonburg", label: "Hintonburg" },
      { value: "westboro", label: "Westboro" },
      { value: "downtown", label: "Downtown" }
    ];
    const selected = ref([]);
    const handleSelect = (value) => {
      selected.value = value;
    };
    return (_ctx, _cache) => {
      const _component_OptionList = resolveComponent("OptionList");
      const _component_LegacyCard = resolveComponent("LegacyCard");
      return openBlock(), createBlock(_component_LegacyCard, null, {
        default: withCtx(() => [
          createVNode(_component_OptionList, {
            title: "Inventory Location",
            options,
            selected: selected.value,
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
