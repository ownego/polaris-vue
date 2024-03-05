import { _ as _export_sfc, o as openBlock, c as createElementBlock, m as createBaseVNode, a as createTextVNode, t as toDisplayString, I as createVNode, w as withCtx, U as createStaticVNode, D as resolveComponent } from "./chunks/framework.1qnja6qJ.js";
const __pageData = JSON.parse('{"title":"Inline error","description":"","frontmatter":{"layout":"doc","title":"Inline error","category":"Selection and input","examples":[{"fileName":"Default.vue","frameHeight":200,"title":"Default","description":"Use when the merchant has entered information that is not valid into multiple fields inside of a form, or needs to be displayed in a non-standard position in the form layout."}],"description":"Inline errors are brief, in-context messages that tell merchants something went wrong with a single or group of inputs in a form. Use inline errors to help merchants understand why a form input may not be valid and how to fix it.","head":[["meta",{"name":"keywords","content":"InlineError error-message form-error invalid-input form-group"}]],"keywords":[" InlineError\\n  "," error message\\n  "," form error\\n  "," invalid input\\n  "," form group"],"previewImg":"/images/components/selection-and-input/inline-error.png"},"headers":[],"relativePath":"components/InlineError.md","filePath":"components/InlineError/README.md"}');
const _sfc_main = { name: "components/InlineError.md" };
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
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#B31D28", "--shiki-dark": "#FDAEB7", "--shiki-light-font-style": "italic", "--shiki-dark-font-style": "italic" } }, "InlineError"),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" } }, " message"),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" } }, "="),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" } }, '"Store name is required"'),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" } }, " field-id"),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" } }, "="),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" } }, '"myFieldID"'),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" } }, " />")
        ]),
        /* @__PURE__ */ createTextVNode("\n"),
        /* @__PURE__ */ createBaseVNode("span", { class: "line" }, [
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" } }, "</"),
          /* @__PURE__ */ createBaseVNode("span", { style: { "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" } }, "template"),
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
const _hoisted_5 = { style: { "font-size": "0.8125rem" } };
const _hoisted_6 = /* @__PURE__ */ createStaticVNode('<h2 id="best-practices" tabindex="-1">Best practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best practices&quot;">​</a></h2><p>Inline errors should:</p><ul><li>Be brief</li><li>Be written in sentence case</li><li>Be visible immediately upon a form input that is not valid</li><li>Be removed as soon as the input is valid so merchants can immediately tell they fixed the issue</li><li>Describe specific solutions so merchants can successfully complete their task in the form</li><li>Not be placed out of context of the input or group of inputs they describe</li></ul><p><a href="https://polaris.shopify.com/patterns/error-messages#form-validation" target="_blank" rel="noreferrer">Learn more about error message patterns</a></p><hr><h2 id="content-guidelines" tabindex="-1">Content guidelines <a class="header-anchor" href="#content-guidelines" aria-label="Permalink to &quot;Content guidelines&quot;">​</a></h2><h3 id="inline-error-messages" tabindex="-1">Inline error messages <a class="header-anchor" href="#inline-error-messages" aria-label="Permalink to &quot;Inline error messages&quot;">​</a></h3><p>Since the error message is directly below the source of the problem, the copy only needs to explain why the error happened. Optionally, the message can clarify what to do next or offer a one-click fix.</p><p>Inline error messages should:</p><ul><li>Clearly explain what went wrong, give a next step, or offer a one-click fix</li><li>Be short and concise, no more than a single sentence</li><li>Use <a href="https://polaris.shopify.com/content/grammar-and-mechanics" target="_blank" rel="noreferrer">passive voice</a> so merchants don’t feel like they’re being blamed for the error</li></ul>', 10);
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
  /* @__PURE__ */ createBaseVNode("li", null, "Store name is required")
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
  /* @__PURE__ */ createBaseVNode("li", null, "You didn’t enter a store name.")
], -1);
const _hoisted_20 = /* @__PURE__ */ createStaticVNode('<hr><h2 id="related-components" tabindex="-1">Related components <a class="header-anchor" href="#related-components" aria-label="Permalink to &quot;Related components&quot;">​</a></h2><ul><li>To create a list of exceptions that describe a resource, <a href="/polaris-vue/components/ExceptionList">use the exception list component</a></li></ul><hr><h2 id="accessibility" tabindex="-1">Accessibility <a class="header-anchor" href="#accessibility" aria-label="Permalink to &quot;Accessibility&quot;">​</a></h2><ul><li>Use the required <code>fieldId</code> prop to give the inline error a unique <code>id</code>. This ties the error to a form field using <code>aria-describedby</code> so that it&#39;s conveyed to screen reader users.</li><li>Use the required <code>message</code> prop to provide the text that describes the error.</li><li>The inline error <a href="https://polaris.shopify.com/design/icons" target="_blank" rel="noreferrer">icon</a> helps visually identify the error message for merchants who have difficulty seeing <a href="https://polaris.shopify.com/design/colors" target="_blank" rel="noreferrer">colors</a> or who use settings that remove color from the page.</li></ul>', 6);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Lede = resolveComponent("Lede");
  const _component_Examples = resolveComponent("Examples");
  const _component_PropsTable = resolveComponent("PropsTable");
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
    createBaseVNode("div", _hoisted_5, [
      _hoisted_6,
      createVNode(_component_DoDont, null, {
        default: withCtx(() => [
          _hoisted_16,
          _hoisted_17,
          _hoisted_18,
          _hoisted_19
        ]),
        _: 1
      }),
      _hoisted_20
    ])
  ]);
}
const README = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  README as default
};
