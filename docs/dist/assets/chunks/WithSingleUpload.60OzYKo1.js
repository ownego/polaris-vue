import { N as NoteIcon } from "./NoteIcon.0tvtJDgA.js";
import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, p as unref, I as createVNode, t as toDisplayString, a as createTextVNode, m as createBaseVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithSingleUpload",
  setup(__props) {
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    const file = ref(null);
    const handleDropZoneDrop = (_dropFiles, acceptedFiles) => {
      file.value = acceptedFiles[0];
    };
    const getSource = (file2) => {
      return window.URL.createObjectURL(file2);
    };
    return (_ctx, _cache) => {
      const _component_Thumbnail = resolveComponent("Thumbnail");
      const _component_Text = resolveComponent("Text");
      const _component_LegacyStack = resolveComponent("LegacyStack");
      const _component_DropZoneFileUpload = resolveComponent("DropZoneFileUpload");
      const _component_DropZone = resolveComponent("DropZone");
      return openBlock(), createBlock(_component_DropZone, {
        "allow-multiple": false,
        onDrop: handleDropZoneDrop
      }, {
        default: withCtx(() => [
          file.value ? (openBlock(), createBlock(_component_LegacyStack, { key: 0 }, {
            default: withCtx(() => [
              createVNode(_component_Thumbnail, {
                size: "small",
                alt: file.value.name,
                source: validImageTypes.includes(file.value.type) ? getSource(file.value) : unref(NoteIcon)
              }, null, 8, ["alt", "source"]),
              createBaseVNode("div", null, [
                createTextVNode(toDisplayString(file.value.name) + toDisplayString(" ") + " ", 1),
                createVNode(_component_Text, {
                  variant: "bodySm",
                  as: "p"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(file.value.size) + " bytes", 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            _: 1
          })) : (openBlock(), createBlock(_component_DropZoneFileUpload, { key: 1 }))
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
