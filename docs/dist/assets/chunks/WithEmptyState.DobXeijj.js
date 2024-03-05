import { d as defineComponent, h as ref, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, I as createVNode, ad as createSlots, m as createBaseVNode } from "./framework.2IsXxFXf.js";
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("p", null, " You can use the Files section to upload images, videos, and other documents ", -1);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithEmptyState",
  setup(__props) {
    const taggedWith = ref("");
    const queryValue = ref("");
    const setTaggedWith = (value) => {
      taggedWith.value = value;
    };
    const setQueryValue = (value) => {
      queryValue.value = value;
    };
    const handleTaggedWithRemove = () => setTaggedWith(void 0);
    const handleQueryValueRemove = () => setQueryValue(void 0);
    const handleClearAll = () => {
      handleTaggedWithRemove();
      handleQueryValueRemove();
    };
    const filters = [];
    const appliedFilters = [];
    const items = [];
    const resourceName = {
      singular: "file",
      plural: "files"
    };
    return (_ctx, _cache) => {
      const _component_EmptyState = resolveComponent("EmptyState");
      const _component_Filters = resolveComponent("Filters");
      const _component_ResourceList = resolveComponent("ResourceList");
      const _component_LegacyCard = resolveComponent("LegacyCard");
      const _component_LayoutSection = resolveComponent("LayoutSection");
      const _component_Layout = resolveComponent("Layout");
      const _component_Page = resolveComponent("Page");
      return openBlock(), createBlock(_component_Page, { title: "File" }, {
        default: withCtx(() => [
          createVNode(_component_Layout, null, {
            default: withCtx(() => [
              createVNode(_component_LayoutSection, null, {
                default: withCtx(() => [
                  createVNode(_component_LegacyCard, null, {
                    default: withCtx(() => [
                      createVNode(_component_ResourceList, {
                        resourceName,
                        items
                      }, createSlots({
                        filterControl: withCtx(() => [
                          createVNode(_component_Filters, {
                            disabled: "",
                            queryPlaceholder: "Filter files",
                            "query-value": queryValue.value,
                            filters,
                            appliedFilters,
                            onQueryChange: setQueryValue,
                            onQueryClear: handleQueryValueRemove,
                            onClearAll: handleClearAll
                          }, null, 8, ["query-value"])
                        ]),
                        _: 2
                      }, [
                        !appliedFilters.length && !items.length ? {
                          name: "emptyState",
                          fn: withCtx(() => [
                            createVNode(_component_EmptyState, {
                              heading: "Upload a file to get started",
                              image: "https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png",
                              action: { content: "Upload files" }
                            }, {
                              default: withCtx(() => [
                                _hoisted_1
                              ]),
                              _: 1
                            })
                          ]),
                          key: "0"
                        } : void 0
                      ]), 1024)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
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
