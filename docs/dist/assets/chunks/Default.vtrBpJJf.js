import { d as defineComponent, h as ref, k as computed, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, t as toDisplayString, I as createVNode, c as createElementBlock, e as createCommentVNode, m as createBaseVNode } from "./framework.1qnja6qJ.js";
const _hoisted_1 = { key: 0 };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("strong", null, "Connect", -1);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Default",
  setup(__props) {
    const connected = ref(false);
    const accountName = computed(() => connected.value ? "Jane Appleseed" : "");
    const buttonText = computed(() => connected.value ? "Disconnect" : "Connect");
    const details = computed(() => connected.value ? "Connected" : "Not connected");
    const action = computed(() => {
      return {
        content: buttonText.value,
        onAction: handleAction
      };
    });
    const handleAction = () => {
      connected.value = !connected.value;
    };
    return (_ctx, _cache) => {
      const _component_Link = resolveComponent("Link");
      const _component_AccountConnection = resolveComponent("AccountConnection");
      return openBlock(), createBlock(_component_AccountConnection, {
        connected: connected.value,
        "account-name": accountName.value,
        action: action.value
      }, {
        title: withCtx(() => [
          createTextVNode(" Example App ")
        ]),
        details: withCtx(() => [
          createTextVNode(toDisplayString(details.value), 1)
        ]),
        "term-of-service": withCtx(() => [
          !connected.value ? (openBlock(), createElementBlock("p", _hoisted_1, [
            createTextVNode(" By clicking "),
            _hoisted_2,
            createTextVNode(", you agree to accept Sample App’s "),
            createVNode(_component_Link, { url: "Example App" }, {
              default: withCtx(() => [
                createTextVNode("terms and conditions")
              ]),
              _: 1
            }),
            createTextVNode(". You’ll pay a commission rate of 15% on sales made through Sample App. ")
          ])) : createCommentVNode("", true)
        ]),
        _: 1
      }, 8, ["connected", "account-name", "action"]);
    };
  }
});
export {
  _sfc_main as default
};
