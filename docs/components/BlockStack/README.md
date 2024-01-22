---
layout: doc
title: Block stack
category: Layout and structure
examples:
  - fileName: Gap.vue
    title: Gap
    description: >-
      Control the vertical space between children using the `gap` prop.
  - fileName: Align.vue
    frameHeight: 800
    title: Align
    description: >-
      Control the vertical alignment of children using the `align` prop.
  - fileName: InlineAlign.vue
    frameHeight: 800
    title: Inline align
    description: >-
      Control the horizontal alignment of children using the `inlineAlign` prop.
---

# {{ $frontmatter.title }}

<Lede>

{{ $frontmatter.description }}

</Lede>

<Examples>

<<< ./[examples]

</Examples>

## Props

<PropsTable />

## Slots

<SlotsTable />

<div style="font-size: 0.8125rem">

## Best practices

Stacks should:

- Not be used for complex or unique arrangements of components
- Not be used for large-scale page layout

---

## Related components

- To display elements horizontally, [use the InlineStack component](/components/InlineStack)

## Related resources

- BlockStack props are named following the convention of CSS logical properties, such as `align="start"` vs. `align="top"` and `inlineAlign="end"` vs. `verticalAlign="right"`. Learn more about [CSS logicial properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties).

</div>
