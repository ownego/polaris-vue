import { N as NoteIcon } from "./NoteIcon.w_L7rheI.js";
import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode, F as Fragment, p as unref, t as toDisplayString, m as createBaseVNode, E as renderList, c as createElementBlock } from "./framework.2IsXxFXf.js";
const _hoisted_1 = {
  key: 0,
  style: { padding: "0" }
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Small",
  setup(__props) {
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    const active = ref(false);
    const files = ref([]);
    const primaryAction = {
      content: "Import customers",
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
    const handleDrop = (_dropFiles, acceptedFiles, _rejectedFiles) => {
      files.value = [...files.value, ...acceptedFiles];
    };
    const getSource = (file) => {
      return window.URL.createObjectURL(file);
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Thumbnail = resolveComponent("Thumbnail");
      const _component_Text = resolveComponent("Text");
      const _component_LegacyStack = resolveComponent("LegacyStack");
      const _component_DropZoneFileUpload = resolveComponent("DropZoneFileUpload");
      const _component_DropZone = resolveComponent("DropZone");
      const _component_Checkbox = resolveComponent("Checkbox");
      const _component_FormLayout = resolveComponent("FormLayout");
      const _component_Modal = resolveComponent("Modal");
      return openBlock(), createBlock(_component_Modal, {
        sectioned: "",
        size: "small",
        open: active.value,
        "primary-action": primaryAction,
        "secondary-actions": secondaryActions,
        onClose: _cache[1] || (_cache[1] = ($event) => active.value = false)
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
          createTextVNode(" Import customers by CSV ")
        ]),
        default: withCtx(() => [
          createVNode(_component_FormLayout, null, {
            default: withCtx(() => [
              createVNode(_component_DropZone, { onDrop: handleDrop }, {
                default: withCtx(() => [
                  files.value.length ? (openBlock(), createElementBlock("div", _hoisted_1, [
                    createVNode(_component_LegacyStack, { vertical: "" }, {
                      default: withCtx(() => [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(files.value, (file, index) => {
                          return openBlock(), createBlock(_component_LegacyStack, {
                            key: index,
                            alignment: "center"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_Thumbnail, {
                                size: "small",
                                alt: file.name,
                                source: validImageTypes.includes(file.type) ? getSource(file) : unref(NoteIcon)
                              }, null, 8, ["alt", "source"]),
                              createBaseVNode("div", null, [
                                createTextVNode(toDisplayString(file.name) + "  ", 1),
                                createVNode(_component_Text, {
                                  variant: "bodySm",
                                  as: "p"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(file.size) + " bytes", 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ])
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
                      ]),
                      _: 1
                    })
                  ])) : (openBlock(), createBlock(_component_DropZoneFileUpload, { key: 1 }))
                ]),
                _: 1
              }),
              createVNode(_component_Checkbox, null, {
                label: withCtx(() => [
                  createTextVNode(" Overwrite existing customers that have the same email or phone ")
                ]),
                _: 1
              })
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
