import { d as defineComponent, h as ref, k as computed, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, t as toDisplayString, a as createTextVNode, I as createVNode } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TabsWithActions",
  setup(__props) {
    const selected = ref(0);
    const itemStrings = ref([
      "All",
      "Unpaid",
      "Open",
      "Closed",
      "Local delivery",
      "Local pickup"
    ]);
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const deleteView = (index) => {
      const newItemStrings = [...itemStrings.value];
      newItemStrings.splice(index, 1);
      itemStrings.value = newItemStrings;
      selected.value = 0;
    };
    const duplicateView = async (name) => {
      itemStrings.value = [...itemStrings.value, name];
      selected.value = itemStrings.value.length - 1;
      await sleep(1);
      return true;
    };
    const tabs = computed(
      () => itemStrings.value.map((item, index) => ({
        content: item,
        index,
        onTabAction: () => {
        },
        id: `${item}-${index}`,
        isLocked: index === 0,
        actions: index === 0 ? [] : [
          {
            type: "rename",
            onPrimaryAction: async (value) => {
              const newItemsStrings = tabs.value.map((item2, idx) => {
                if (idx === index) {
                  return value;
                }
                return item2.content;
              });
              await sleep(1);
              itemStrings.value = newItemsStrings;
              return true;
            }
          },
          {
            type: "duplicate",
            onPrimaryAction: async (name) => {
              await sleep(1);
              duplicateView(name);
              return true;
            }
          },
          {
            type: "edit"
          },
          {
            type: "delete",
            onPrimaryAction: async () => {
              await sleep(1);
              deleteView(index);
              return true;
            }
          }
        ]
      }))
    );
    const onCreateNewView = async (value) => {
      await sleep(500);
      itemStrings.value = [...itemStrings.value, value];
      selected.value = itemStrings.value.length - 1;
      return true;
    };
    const handleSelected = (value) => selected.value = value;
    return (_ctx, _cache) => {
      const _component_Text = resolveComponent("Text");
      const _component_LegacyCardSection = resolveComponent("LegacyCardSection");
      const _component_Tabs = resolveComponent("Tabs");
      const _component_LegacyCard = resolveComponent("LegacyCard");
      return openBlock(), createBlock(_component_LegacyCard, null, {
        default: withCtx(() => [
          createVNode(_component_Tabs, {
            tabs: tabs.value,
            selected: selected.value,
            canCreateNewView: true,
            onSelect: handleSelected,
            onCreateNewView
          }, {
            default: withCtx(() => [
              createVNode(_component_LegacyCardSection, {
                title: tabs.value[selected.value].content
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
          }, 8, ["tabs", "selected"])
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
