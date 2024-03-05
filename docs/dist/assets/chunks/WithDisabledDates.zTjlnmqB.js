import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, c as createElementBlock, I as createVNode, m as createBaseVNode, t as toDisplayString, F as Fragment } from "./framework.1qnja6qJ.js";
const _hoisted_1 = { style: { marginTop: "1rem" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithDisabledDates",
  setup(__props) {
    const month = ref(1);
    const year = ref(2024);
    const selectedDates = ref({
      start: /* @__PURE__ */ new Date("Wed Feb 07 2024 00:00:00 GMT-0500 (EST)"),
      end: /* @__PURE__ */ new Date("Wed Feb 10 2024 00:00:00 GMT-0500 (EST)")
    });
    const handleMonthChange = (m, y) => {
      month.value = m;
      year.value = y;
    };
    return (_ctx, _cache) => {
      const _component_DatePicker = resolveComponent("DatePicker");
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_component_DatePicker, {
          "allow-range": "",
          month: month.value,
          year: year.value,
          modelValue: selectedDates.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectedDates.value = $event),
          "disable-dates-before": /* @__PURE__ */ new Date("Sat Feb 03 2024 00:00:00 GMT-0500 (EST)"),
          "disable-dates-after": /* @__PURE__ */ new Date("Sun Feb 18 2024 00:00:00 GMT-0500 (EST)"),
          onMonthChange: handleMonthChange
        }, null, 8, ["month", "year", "modelValue", "disable-dates-before", "disable-dates-after"]),
        createBaseVNode("p", _hoisted_1, "Selected Date: " + toDisplayString(selectedDates.value), 1)
      ], 64);
    };
  }
});
export {
  _sfc_main as default
};
