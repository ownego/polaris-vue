import { N as NoteIcon } from "./NoteIcon.0tvtJDgA.js";
import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, F as Fragment, p as unref, I as createVNode, t as toDisplayString, a as createTextVNode, m as createBaseVNode, E as renderList, c as createElementBlock } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CustomFileUploadText",
  setup(__props) {
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    const files = ref([]);
    const handleDropZoneDrop = (_dropFiles, acceptedFiles) => {
      files.value = [...files.value, ...acceptedFiles];
    };
    const getSource = (file) => {
      return window.URL.createObjectURL(file);
    };
    return (_ctx, _cache) => {
      const _component_Thumbnail = resolveComponent("Thumbnail");
      const _component_Text = resolveComponent("Text");
      const _component_LegacyStack = resolveComponent("LegacyStack");
      const _component_DropZoneFileUpload = resolveComponent("DropZoneFileUpload");
      const _component_DropZone = resolveComponent("DropZone");
      return openBlock(), createBlock(_component_DropZone, {
        onDrop: handleDropZoneDrop,
        "variable-height": ""
      }, {
        default: withCtx(() => [
          files.value.length ? (openBlock(), createBlock(_component_LegacyStack, {
            key: 0,
            vertical: ""
          }, {
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
                      createTextVNode(toDisplayString(file.name) + toDisplayString(" ") + " ", 1),
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
          })) : (openBlock(), createBlock(_component_DropZoneFileUpload, {
            key: 1,
            "action-hint": "Accepts .gif, .jpg, and .png"
          }))
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
