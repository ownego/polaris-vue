import { d as _sfc_main$1 } from "./Preview.vue_vue_type_style_index_0_lang.a_K4ko6J.js";
import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode, p as unref, F as Fragment, t as toDisplayString, m as createBaseVNode, E as renderList, c as createElementBlock } from "./framework.1qnja6qJ.js";
const _hoisted_1 = { href: "#" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithScrollListener",
  setup(__props) {
    const active = ref(false);
    const handleScrolledToBottom = () => {
      alert("Scrolled to bottom!");
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Modal = resolveComponent("Modal");
      return openBlock(), createBlock(_component_Modal, {
        sectioned: "",
        open: active.value,
        onClose: _cache[1] || (_cache[1] = ($event) => active.value = false),
        onScrolledToBottom: handleScrolledToBottom
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
          createTextVNode(" Scrollable content ")
        ]),
        default: withCtx(() => [
          createVNode(unref(_sfc_main$1), null, {
            default: withCtx(() => [
              (openBlock(), createElementBlock(Fragment, null, renderList(50, (item) => {
                return createBaseVNode("p", { key: item }, [
                  createTextVNode(" Item "),
                  createBaseVNode("a", _hoisted_1, "#" + toDisplayString(item), 1)
                ]);
              }), 64))
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
