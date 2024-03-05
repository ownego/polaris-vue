import { N as NoteIcon } from "./NoteIcon.w_L7rheI.js";
import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, F as Fragment, p as unref, I as createVNode, t as toDisplayString, a as createTextVNode, m as createBaseVNode, E as renderList, c as createElementBlock } from "./framework.2IsXxFXf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithDropOnPage",
  setup(__props) {
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    const files = ref([]);
    const handleDropZoneDrop = (_dropFiles) => {
      files.value = [...files.value, ..._dropFiles];
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
      const _component_Page = resolveComponent("Page");
      return openBlock(), createBlock(_component_Page, {
        "back-action": { content: "Products", url: "/products" },
        title: "Jar With Lock-Lid",
        "primary-action": { content: "Save", disabled: true },
        "secondary-actions": [
          { content: "Duplicate" },
          { content: "View on your store" }
        ],
        pagination: {
          hasPrevious: true,
          hasNext: true
        }
      }, {
        default: withCtx(() => [
          createVNode(_component_DropZone, {
            "drop-on-page": "",
            onDrop: handleDropZoneDrop
          }, {
            default: withCtx(() => [
              files.value.length ? (openBlock(), createBlock(_component_LegacyStack, {
                key: 0,
                vertical: ""
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(files.value, (file, index) => {
                    return openBlock(), createBlock(_component_LegacyStack, {
                      alignment: "center",
                      key: index
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
