import { _ as _export_sfc, D as resolveComponent, o as openBlock, b as createBlock } from "./framework.2IsXxFXf.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Select = resolveComponent("Select");
  return openBlock(), createBlock(_component_Select, {
    label: "Date range",
    disabled: "",
    options: [
      { label: "Today", value: "today" },
      { label: "Yesterday", value: "yesterday" },
      { label: "Last 7 days", value: "lastWeek" }
    ]
  });
}
const Disabled = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Disabled as default
};
