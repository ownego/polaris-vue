import { _ as _export_sfc, o as openBlock, c as createElementBlock, m as createBaseVNode, a as createTextVNode, t as toDisplayString, I as createVNode, w as withCtx, U as createStaticVNode, D as resolveComponent } from "./chunks/framework.1qnja6qJ.js";
const __pageData = JSON.parse('{"title":"Checkbox","description":"","frontmatter":{"layout":"doc","title":"Checkbox","category":"Selection and input","examples":[{"fileName":"Default.vue","frameHeight":250,"title":"Default","description":"Use in forms to toggle the state of something on or off. Default checkboxes can appear as selected and disabled, or unselected."}],"description":"Checkboxes are most commonly used to give merchants a way to make a range of selections (zero, one, or multiple). They may also be used as a way to have merchants indicate they agree to specific terms and services.","head":[["meta",{"name":"keywords","content":"accept decline terms input multiple-choice-lists terms-and-services checkboxes check-boxes multiple-selections form-selections multi choice-lists"}]],"keywords":[" accept\\n  "," decline\\n  "," terms\\n  "," input\\n  "," multiple choice lists\\n  "," terms and services\\n  "," checkboxes\\n  "," check boxes\\n  "," multiple selections\\n  "," form selections\\n  "," multi","choice lists"],"previewImg":"/images/components/selection-and-input/checkbox.png"},"headers":[],"relativePath":"components/Checkbox.md","filePath":"components/Checkbox/README.md"}');
const _sfc_main = { name: "components/Checkbox.md" };
const _hoisted_1 = {
  id: "frontmatter-title",
  tabindex: "-1"
};
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("a", {
  class: "header-anchor",
  href: "#frontmatter-title",
  "aria-label": 'Permalink to "{{ $frontmatter.title }}"'
}, "​", -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("div", {
  class: "docs-example-code docs-example-0",
  "data-example": "0"
}, [
  /* @__PURE__ */ createBaseVNode("div", { class: "language-vue vp-adaptive-theme" }, [
    /* @__PURE__ */ createBaseVNode("button", {
      title: "Copy Code",
      class: "copy"
    }),
    /* @__PURE__ */ createBaseVNode("span", { class: "lang" }, "vue"),
    /* @__PURE__ */ createBaseVNode("pre", { class: "shiki shiki-themes github-light github-dark vp-code" }, [
      /* @__PURE__ */ createBaseVNode("code", null, [
        /* @__PURE__ */ createBaseVNode("span", { class: "line" }, [
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" } }, "<"),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" } }, "template"),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" } }, ">")
        ]),
        /* @__PURE__ */ createTextVNode("\n"),
        /* @__PURE__ */ createBaseVNode("span", { class: "line" }, [
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" } }, "<"),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#B31D28", "--shiki-dark": "#FDAEB7", "--shiki-light-font-style": "italic", "--shiki-dark-font-style": "italic" } }, "Checkbox")
        ]),
        /* @__PURE__ */ createTextVNode("\n"),
        /* @__PURE__ */ createBaseVNode("span", { class: "line" }, [
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" } }, "  label"),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" } }, "="),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" } }, '"Basic checkbox"')
        ]),
        /* @__PURE__ */ createTextVNode("\n"),
        /* @__PURE__ */ createBaseVNode("span", { class: "line" }, [
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" } }, "  v-model"),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" } }, "="),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" } }, '"'),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" } }, "checked"),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" } }, '"')
        ]),
        /* @__PURE__ */ createTextVNode("\n"),
        /* @__PURE__ */ createBaseVNode("span", { class: "line" }, [
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" } }, "/>")
        ]),
        /* @__PURE__ */ createTextVNode("\n"),
        /* @__PURE__ */ createBaseVNode("span", { class: "line" }, [
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" } }, "</"),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" } }, "template"),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" } }, ">")
        ]),
        /* @__PURE__ */ createTextVNode("\n"),
        /* @__PURE__ */ createBaseVNode("span", { class: "line" }),
        /* @__PURE__ */ createTextVNode("\n"),
        /* @__PURE__ */ createBaseVNode("span", { class: "line" }, [
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" } }, "<"),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" } }, "script"),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" } }, " setup"),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" } }, " lang"),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" } }, "="),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" } }, '"ts"'),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" } }, ">")
        ]),
        /* @__PURE__ */ createTextVNode("\n"),
        /* @__PURE__ */ createBaseVNode("span", { class: "line" }, [
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" } }, "import"),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" } }, " { ref } "),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" } }, "from"),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" } }, " 'vue'"),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" } }, ";")
        ]),
        /* @__PURE__ */ createTextVNode("\n"),
        /* @__PURE__ */ createBaseVNode("span", { class: "line" }),
        /* @__PURE__ */ createTextVNode("\n"),
        /* @__PURE__ */ createBaseVNode("span", { class: "line" }, [
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" } }, "const"),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" } }, " checked"),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" } }, " ="),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" } }, " ref"),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" } }, "("),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" } }, "true"),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" } }, ");")
        ]),
        /* @__PURE__ */ createTextVNode("\n"),
        /* @__PURE__ */ createBaseVNode("span", { class: "line" }, [
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" } }, "</"),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" } }, "script"),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" } }, ">")
        ])
      ])
    ])
  ])
], -1);
const _hoisted_4 = /* @__PURE__ */ createBaseVNode("h2", {
  id: "props",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createTextVNode("Props "),
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#props",
    "aria-label": 'Permalink to "Props"'
  }, "​")
], -1);
const _hoisted_5 = /* @__PURE__ */ createBaseVNode("h2", {
  id: "slots",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createTextVNode("Slots "),
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#slots",
    "aria-label": 'Permalink to "Slots"'
  }, "​")
], -1);
const _hoisted_6 = /* @__PURE__ */ createBaseVNode("h2", {
  id: "events",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createTextVNode("Events "),
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#events",
    "aria-label": 'Permalink to "Events"'
  }, "​")
], -1);
const _hoisted_7 = { style: { "font-size": "0.8125rem" } };
const _hoisted_8 = /* @__PURE__ */ createStaticVNode('<h2 id="best-practices" tabindex="-1">Best practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best practices&quot;">​</a></h2><p>Checkboxes should:</p><ul><li>Work independently from each other. Selecting one checkbox shouldn’t change the selection status of another checkbox in the list. The exception is when a checkbox is used to make a bulk selection of multiple items.</li><li>Be framed positively. For example, say “Publish store” instead of “Hide store”.</li><li>Always have a label when used to activate or deactivate a setting.</li><li>Be listed according to a logical order, whether it’s alphabetical, numerical, time-based, or some other clear system.</li><li>Link to more information or include a subtitle as required to provide more explanation. Don’t rely on tooltips to explain a checkbox.</li></ul><hr><h2 id="content-guidelines" tabindex="-1">Content guidelines <a class="header-anchor" href="#content-guidelines" aria-label="Permalink to &quot;Content guidelines&quot;">​</a></h2><h3 id="lists-with-checkboxes" tabindex="-1">Lists with checkboxes <a class="header-anchor" href="#lists-with-checkboxes" aria-label="Permalink to &quot;Lists with checkboxes&quot;">​</a></h3><p>Lists that use checkboxes should:</p><ul><li>Start with a capital letter</li></ul>', 8);
const _hoisted_16 = /* @__PURE__ */ createBaseVNode("h4", {
  id: "do",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createTextVNode("Do "),
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#do",
    "aria-label": 'Permalink to "Do"'
  }, "​")
], -1);
const _hoisted_17 = /* @__PURE__ */ createBaseVNode("ul", null, [
  /* @__PURE__ */ createBaseVNode("li", null, "Option 1"),
  /* @__PURE__ */ createBaseVNode("li", null, "Option 2"),
  /* @__PURE__ */ createBaseVNode("li", null, "Option 3")
], -1);
const _hoisted_18 = /* @__PURE__ */ createBaseVNode("h4", {
  id: "don-t",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createTextVNode("Don’t "),
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#don-t",
    "aria-label": 'Permalink to "Don’t"'
  }, "​")
], -1);
const _hoisted_19 = /* @__PURE__ */ createBaseVNode("ul", null, [
  /* @__PURE__ */ createBaseVNode("li", null, "option 1"),
  /* @__PURE__ */ createBaseVNode("li", null, "option 2"),
  /* @__PURE__ */ createBaseVNode("li", null, "option 3")
], -1);
const _hoisted_20 = /* @__PURE__ */ createBaseVNode("ul", null, [
  /* @__PURE__ */ createBaseVNode("li", null, "Not use commas or semicolons at the end of each line")
], -1);
const _hoisted_21 = /* @__PURE__ */ createBaseVNode("h4", {
  id: "do-1",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createTextVNode("Do "),
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#do-1",
    "aria-label": 'Permalink to "Do"'
  }, "​")
], -1);
const _hoisted_22 = /* @__PURE__ */ createBaseVNode("ul", null, [
  /* @__PURE__ */ createBaseVNode("li", null, "Red"),
  /* @__PURE__ */ createBaseVNode("li", null, "Yellow"),
  /* @__PURE__ */ createBaseVNode("li", null, "Blue")
], -1);
const _hoisted_23 = /* @__PURE__ */ createBaseVNode("h4", {
  id: "don-t-1",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createTextVNode("Don’t "),
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#don-t-1",
    "aria-label": 'Permalink to "Don’t"'
  }, "​")
], -1);
const _hoisted_24 = /* @__PURE__ */ createBaseVNode("ul", null, [
  /* @__PURE__ */ createBaseVNode("li", null, "Red;"),
  /* @__PURE__ */ createBaseVNode("li", null, "Yellow;"),
  /* @__PURE__ */ createBaseVNode("li", null, "Blue.")
], -1);
const _hoisted_25 = /* @__PURE__ */ createBaseVNode("ul", null, [
  /* @__PURE__ */ createBaseVNode("li", null, "In the rare case where the checkbox is asking merchants to agree to terms or service, use the first person")
], -1);
const _hoisted_26 = /* @__PURE__ */ createBaseVNode("h4", {
  id: "do-2",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createTextVNode("Do "),
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#do-2",
    "aria-label": 'Permalink to "Do"'
  }, "​")
], -1);
const _hoisted_27 = /* @__PURE__ */ createBaseVNode("p", null, "I agree to the Terms of Service.", -1);
const _hoisted_28 = /* @__PURE__ */ createBaseVNode("h4", {
  id: "don-t-2",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createTextVNode("Don’t "),
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#don-t-2",
    "aria-label": 'Permalink to "Don’t"'
  }, "​")
], -1);
const _hoisted_29 = /* @__PURE__ */ createBaseVNode("p", null, "You agree to the Terms of Service", -1);
const _hoisted_30 = /* @__PURE__ */ createStaticVNode('<hr><h2 id="related-components" tabindex="-1">Related components <a class="header-anchor" href="#related-components" aria-label="Permalink to &quot;Related components&quot;">​</a></h2><ul><li>To present a list of options where merchants can only make a single choice, <a href="/polaris-vue/components/RadioButton">use the radio button component</a></li><li>To display a list of related content, <a href="/polaris-vue/components/ChoiceList">use the choice list component</a></li><li>To create an ungrouped list, <a href="/polaris-vue/components/List">use the content list component</a></li></ul><hr><h2 id="accessibility" tabindex="-1">Accessibility <a class="header-anchor" href="#accessibility" aria-label="Permalink to &quot;Accessibility&quot;">​</a></h2><p>Screen readers convey the state of the checkbox automatically.</p><ul><li>Use the <code>disabled</code> prop to apply the HTML <code>disabled</code> attribute to the checkbox <code>&lt;input&gt;</code>. This prevents merchants from being able to interact with the checkbox, and conveys its inactive state to assistive technologies.</li><li>Use the <code>id</code> prop to provide a unique <code>id</code> attribute value for the checkbox. If an <code>id</code> isn’t provided, then the component generates one. All checkboxes must have unique <code>id</code> values to work correctly with assistive technologies.</li><li>Setting <code>checked=&quot;indeterminate&quot;</code> conveys the state of the checkbox using <code>aria-checked=&quot;mixed&quot;</code>.</li><li>Setting the <code>ariaControls</code> prop conveys the ID of the element whose contents or presence are controlled by the checkbox to screen reader users with the <code>aria-controls</code> attribute.</li></ul><h3 id="labeling" tabindex="-1">Labeling <a class="header-anchor" href="#labeling" aria-label="Permalink to &quot;Labeling&quot;">​</a></h3><ul><li>The required <code>label</code> prop conveys the purpose of the checkbox to all merchants</li><li>Use the <code>labelHidden</code> prop to visually hide the label but make it available to assistive technologies</li><li>When you provide help text via the <code>helpText</code> prop or an inline error message via the <code>error</code> prop, the help or error content is conveyed to screen reader users with the <code>aria-describedby</code> attribute</li></ul><h3 id="keyboard-support" tabindex="-1">Keyboard support <a class="header-anchor" href="#keyboard-support" aria-label="Permalink to &quot;Keyboard support&quot;">​</a></h3><ul><li>Move focus to each checkbox using the <kbd>tab</kbd> key (or <kbd>shift</kbd> + <kbd>tab</kbd> when tabbing backwards)</li><li>To interact with the checkbox when it has keyboard focus, press the <kbd>space</kbd> key</li></ul>', 11);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Lede = resolveComponent("Lede");
  const _component_Examples = resolveComponent("Examples");
  const _component_PropsTable = resolveComponent("PropsTable");
  const _component_SlotsTable = resolveComponent("SlotsTable");
  const _component_EventsTable = resolveComponent("EventsTable");
  const _component_DoDont = resolveComponent("DoDont");
  return openBlock(), createElementBlock("div", null, [
    createBaseVNode("h1", _hoisted_1, [
      createTextVNode(toDisplayString(_ctx.$frontmatter.title) + " ", 1),
      _hoisted_2
    ]),
    createVNode(_component_Lede, null, {
      default: withCtx(() => [
        createBaseVNode("p", null, toDisplayString(_ctx.$frontmatter.description), 1)
      ]),
      _: 1
    }),
    createVNode(_component_Examples, null, {
      default: withCtx(() => [
        _hoisted_3
      ]),
      _: 1
    }),
    _hoisted_4,
    createVNode(_component_PropsTable),
    _hoisted_5,
    createVNode(_component_SlotsTable),
    _hoisted_6,
    createVNode(_component_EventsTable),
    createBaseVNode("div", _hoisted_7, [
      _hoisted_8,
      createVNode(_component_DoDont, null, {
        default: withCtx(() => [
          _hoisted_16,
          _hoisted_17,
          _hoisted_18,
          _hoisted_19
        ]),
        _: 1
      }),
      _hoisted_20,
      createVNode(_component_DoDont, null, {
        default: withCtx(() => [
          _hoisted_21,
          _hoisted_22,
          _hoisted_23,
          _hoisted_24
        ]),
        _: 1
      }),
      _hoisted_25,
      createVNode(_component_DoDont, null, {
        default: withCtx(() => [
          _hoisted_26,
          _hoisted_27,
          _hoisted_28,
          _hoisted_29
        ]),
        _: 1
      }),
      _hoisted_30
    ])
  ]);
}
const README = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  README as default
};
