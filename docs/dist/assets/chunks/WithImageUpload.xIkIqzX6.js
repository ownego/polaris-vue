import { d as defineComponent, h as ref, k as computed, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, F as Fragment, t as toDisplayString, a as createTextVNode, E as renderList, c as createElementBlock, I as createVNode, e as createCommentVNode, m as createBaseVNode } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithImageUpload",
  setup(__props) {
    const files = ref([]);
    const rejectedFiles = ref([]);
    const hasError = computed(() => rejectedFiles.value.length > 0);
    const handleDrop = (_dropFiles, acceptedFiles, _rejectedFiles) => {
      files.value = [...files.value, ...acceptedFiles];
      rejectedFiles.value = [...rejectedFiles.value, ..._rejectedFiles];
    };
    const getSource = (file) => {
      return window.URL.createObjectURL(file);
    };
    return (_ctx, _cache) => {
      const _component_ListItem = resolveComponent("ListItem");
      const _component_List = resolveComponent("List");
      const _component_Banner = resolveComponent("Banner");
      const _component_Thumbnail = resolveComponent("Thumbnail");
      const _component_Text = resolveComponent("Text");
      const _component_LegacyStack = resolveComponent("LegacyStack");
      const _component_DropZoneFileUpload = resolveComponent("DropZoneFileUpload");
      const _component_DropZone = resolveComponent("DropZone");
      return openBlock(), createBlock(_component_LegacyStack, { vertical: "" }, {
        default: withCtx(() => [
          hasError.value ? (openBlock(), createBlock(_component_Banner, {
            key: 0,
            title: "The following images couldn't be uploaded:",
            tone: "critical"
          }, {
            default: withCtx(() => [
              createVNode(_component_List, { type: "bullet" }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(rejectedFiles.value, (file, index) => {
                    return openBlock(), createBlock(_component_ListItem, { key: index }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(`"${file.name}" is not supported. File type must be .gif, .jpg, .png or .svg.`), 1)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ]),
                _: 1
              })
            ]),
            _: 1
          })) : createCommentVNode("", true),
          createVNode(_component_DropZone, {
            accept: "image/*",
            type: "image",
            onDrop: handleDrop
          }, {
            default: withCtx(() => [
              files.value.length ? (openBlock(), createBlock(_component_LegacyStack, {
                key: 0,
                vertical: ""
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(files.value, (file, index) => {
                    return openBlock(), createBlock(_component_LegacyStack, { key: index }, {
                      default: withCtx(() => [
                        createVNode(_component_Thumbnail, {
                          size: "small",
                          alt: file.name,
                          source: getSource(file)
                        }, null, 8, ["alt", "source"]),
                        createBaseVNode("div", null, [
                          createTextVNode(toDisplayString(file.name) + toDisplayString(" ") + " ", 1),
                          createVNode(_component_Text, {
                            variant: "bodySm",
                            as: "p"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(file.size) + " bytes ", 1)
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
              })) : (openBlock(), createBlock(_component_DropZoneFileUpload, { key: 1 }))
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
