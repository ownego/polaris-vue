import { N as NoteIcon } from "./NoteIcon.w_L7rheI.js";
import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, F as Fragment, p as unref, I as createVNode, t as toDisplayString, a as createTextVNode, m as createBaseVNode, E as renderList, c as createElementBlock } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CustomFileDialogTrigger",
  setup(__props) {
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    const files = ref([]);
    const openFileDialog = ref(false);
    const toggleOpenFileDialog = () => {
      openFileDialog.value = !openFileDialog.value;
    };
    const handleDropZoneDrop = (dropFiles) => {
      files.value = [...files.value, ...dropFiles];
    };
    const getSource = (file) => {
      return window.URL.createObjectURL(file);
    };
    return (_ctx, _cache) => {
      const _component_Thumbnail = resolveComponent("Thumbnail");
      const _component_Text = resolveComponent("Text");
      const _component_LegacyStack = resolveComponent("LegacyStack");
      const _component_DropZone = resolveComponent("DropZone");
      const _component_LegacyCard = resolveComponent("LegacyCard");
      return openBlock(), createBlock(_component_LegacyCard, {
        sectioned: "",
        title: "Product Images",
        actions: [{ content: "Upload Image", onAction: toggleOpenFileDialog }]
      }, {
        default: withCtx(() => [
          createVNode(_component_DropZone, {
            "open-file-dialog": openFileDialog.value,
            onDrop: handleDropZoneDrop,
            onFileDialogClose: toggleOpenFileDialog
          }, {
            default: withCtx(() => [
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
                          source: validImageTypes.indexOf(file.type) > -1 ? getSource(file) : unref(NoteIcon)
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
              })
            ]),
            _: 1
          }, 8, ["open-file-dialog"])
        ]),
        _: 1
      }, 8, ["actions"]);
    };
  }
});
export {
  _sfc_main as default
};
