import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode } from "./framework.2IsXxFXf.js";
const CURRENT_PAGE = "current_page";
const ALL_CUSTOMERS = "all_customers";
const SELECTED_CUSTOMERS = "selected_customers";
const CSV_EXCEL = "csv_excel";
const CSV_PLAIN = "csv_plain";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithPrimaryAndSecondary",
  setup(__props) {
    const firstChoices = [
      { label: "Current page", value: CURRENT_PAGE },
      { label: "All customers", value: ALL_CUSTOMERS },
      { label: "Selected customers", value: SELECTED_CUSTOMERS }
    ];
    const secondChoices = [
      {
        label: "CSV for Excel, Numbers, or other spreadsheet programs",
        value: CSV_EXCEL
      },
      {
        label: "Plain CSV file",
        value: CSV_PLAIN
      }
    ];
    const active = ref(false);
    const firstChoice = ref(CURRENT_PAGE);
    const secondChoice = ref(CSV_EXCEL);
    const primaryAction = {
      content: "Export customers",
      onAction: () => {
      }
    };
    const secondaryActions = [
      {
        content: "Cancel",
        onAction: () => {
        }
      }
    ];
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_ChoiceList = resolveComponent("ChoiceList");
      const _component_FormLayout = resolveComponent("FormLayout");
      const _component_Modal = resolveComponent("Modal");
      return openBlock(), createBlock(_component_Modal, {
        sectioned: "",
        open: active.value,
        "primary-action": primaryAction,
        "secondary-actions": secondaryActions,
        onClose: _cache[3] || (_cache[3] = ($event) => active.value = false)
      }, {
        activator: withCtx(() => [
          createVNode(_component_Button, {
            onClick: _cache[0] || (_cache[0] = ($event) => active.value = true)
          }, {
            default: withCtx(() => [
              createTextVNode(" Open ")
            ]),
            _: 1
          })
        ]),
        title: withCtx(() => [
          createTextVNode(" Export customers ")
        ]),
        default: withCtx(() => [
          createVNode(_component_FormLayout, null, {
            default: withCtx(() => [
              createVNode(_component_ChoiceList, {
                choices: firstChoices,
                modelValue: firstChoice.value,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => firstChoice.value = $event)
              }, {
                title: withCtx(() => [
                  createTextVNode(" Export ")
                ]),
                _: 1
              }, 8, ["modelValue"]),
              createVNode(_component_ChoiceList, {
                choices: secondChoices,
                modelValue: secondChoice.value,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => secondChoice.value = $event)
              }, {
                title: withCtx(() => [
                  createTextVNode(" Export as ")
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["open"]);
    };
  }
});
export {
  _sfc_main as default
};
