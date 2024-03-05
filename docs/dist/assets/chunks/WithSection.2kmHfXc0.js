import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithSection",
  setup(__props) {
    const sections = [
      {
        options: [
          { value: "type", label: "Sale item type" },
          { value: "kind", label: "Sale kind" }
        ]
      },
      {
        title: "Traffic",
        options: [
          { value: "source", label: "Traffic referrer source" },
          { value: "host", label: "Traffic referrer host" },
          { value: "path", label: "Traffic referrer path" }
        ]
      }
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
            allowMultiple: "",
            sections,
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
