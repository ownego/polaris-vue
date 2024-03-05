import { d as defineComponent, D as resolveComponent, o as openBlock, b as createBlock, w as withCtx, a as createTextVNode, I as createVNode, F as Fragment, t as toDisplayString, m as createBaseVNode, E as renderList, c as createElementBlock } from "./framework.1qnja6qJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ThreeColumnsEqual",
  setup(__props) {
    const resourceItems = [
      {
        id: "341",
        url: "#",
        name: "Black & orange scarf",
        sku: "9234194023",
        quantity: "254",
        media: {
          source: "https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg",
          alt: "Black orange scarf"
        }
      },
      {
        id: "256",
        url: "#",
        name: "Tucan scarf",
        sku: "9234194010",
        quantity: "201",
        media: {
          source: "https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg",
          alt: "Tucan scarf"
        }
      }
    ];
    return (_ctx, _cache) => {
      const _component_Text = resolveComponent("Text");
      const _component_LegacyCardSection = resolveComponent("LegacyCardSection");
      const _component_Thumbnail = resolveComponent("Thumbnail");
      const _component_ResourceItem = resolveComponent("ResourceItem");
      const _component_ResourceList = resolveComponent("ResourceList");
      const _component_LegacyCard = resolveComponent("LegacyCard");
      const _component_LayoutSection = resolveComponent("LayoutSection");
      const _component_Layout = resolveComponent("Layout");
      const _component_Page = resolveComponent("Page");
      return openBlock(), createBlock(_component_Page, { fullWidth: "" }, {
        default: withCtx(() => [
          createVNode(_component_Layout, null, {
            default: withCtx(() => [
              createVNode(_component_LayoutSection, { variant: "oneThird" }, {
                default: withCtx(() => [
                  createVNode(_component_LegacyCard, {
                    title: "Florida",
                    actions: [{ content: "Manage" }]
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_LegacyCardSection, null, {
                        default: withCtx(() => [
                          createVNode(_component_Text, {
                            tone: "subdued",
                            as: "span"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 455 units available ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_LegacyCardSection, { title: "Items" }, {
                        default: withCtx(() => [
                          createVNode(_component_ResourceList, {
                            resourceName: { singular: "product", plural: "products" },
                            items: resourceItems
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createElementBlock(Fragment, null, renderList(resourceItems, (item) => {
                                return createVNode(_component_ResourceItem, {
                                  key: item.id,
                                  id: item.id,
                                  url: item.url,
                                  accessibilityLabel: `View details for ${item.name}`
                                }, {
                                  media: withCtx(() => [
                                    createVNode(_component_Thumbnail, {
                                      source: item.media.source,
                                      alt: item.media.alt
                                    }, null, 8, ["source", "alt"])
                                  ]),
                                  default: withCtx(() => [
                                    createVNode(_component_Text, {
                                      variant: "bodyMd",
                                      fontWeight: "bold",
                                      as: "h3"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(item.name), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createBaseVNode("div", null, "SKU: " + toDisplayString(item.sku), 1),
                                    createBaseVNode("div", null, toDisplayString(item.quantity) + " available", 1)
                                  ]),
                                  _: 2
                                }, 1032, ["id", "url", "accessibilityLabel"]);
                              }), 64))
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
              }),
              createVNode(_component_LayoutSection, { variant: "oneThird" }, {
                default: withCtx(() => [
                  createVNode(_component_LegacyCard, {
                    title: "Nevada",
                    actions: [{ content: "Manage" }]
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_LegacyCardSection, null, {
                        default: withCtx(() => [
                          createVNode(_component_Text, {
                            tone: "subdued",
                            as: "span"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 301 units available ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_LegacyCardSection, { title: "Items" }, {
                        default: withCtx(() => [
                          createVNode(_component_ResourceList, {
                            resourceName: { singular: "product", plural: "products" },
                            items: resourceItems
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createElementBlock(Fragment, null, renderList(resourceItems, (item) => {
                                return createVNode(_component_ResourceItem, {
                                  key: item.id,
                                  id: item.id,
                                  url: item.url,
                                  accessibilityLabel: `View details for ${item.name}`
                                }, {
                                  media: withCtx(() => [
                                    createVNode(_component_Thumbnail, {
                                      source: item.media.source,
                                      alt: item.media.alt
                                    }, null, 8, ["source", "alt"])
                                  ]),
                                  default: withCtx(() => [
                                    createVNode(_component_Text, {
                                      variant: "bodyMd",
                                      fontWeight: "bold",
                                      as: "h3"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(item.name), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createBaseVNode("div", null, "SKU: " + toDisplayString(item.sku), 1),
                                    createBaseVNode("div", null, toDisplayString(item.quantity) + " available", 1)
                                  ]),
                                  _: 2
                                }, 1032, ["id", "url", "accessibilityLabel"]);
                              }), 64))
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
              }),
              createVNode(_component_LayoutSection, { variant: "oneThird" }, {
                default: withCtx(() => [
                  createVNode(_component_LegacyCard, {
                    title: "Minneapolis",
                    actions: [{ content: "Manage" }]
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_LegacyCardSection, null, {
                        default: withCtx(() => [
                          createVNode(_component_Text, {
                            tone: "subdued",
                            as: "span"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 1931 units available ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_LegacyCardSection, { title: "Items" }, {
                        default: withCtx(() => [
                          createVNode(_component_ResourceList, {
                            resourceName: { singular: "product", plural: "products" },
                            items: resourceItems
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createElementBlock(Fragment, null, renderList(resourceItems, (item) => {
                                return createVNode(_component_ResourceItem, {
                                  key: item.id,
                                  id: item.id,
                                  url: item.url,
                                  accessibilityLabel: `View details for ${item.name}`
                                }, {
                                  media: withCtx(() => [
                                    createVNode(_component_Thumbnail, {
                                      source: item.media.source,
                                      alt: item.media.alt
                                    }, null, 8, ["source", "alt"])
                                  ]),
                                  default: withCtx(() => [
                                    createVNode(_component_Text, {
                                      variant: "bodyMd",
                                      fontWeight: "bold",
                                      as: "h3"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(item.name), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createBaseVNode("div", null, "SKU: " + toDisplayString(item.sku), 1),
                                    createBaseVNode("div", null, toDisplayString(item.quantity) + " available", 1)
                                  ]),
                                  _: 2
                                }, 1032, ["id", "url", "accessibilityLabel"]);
                              }), 64))
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
