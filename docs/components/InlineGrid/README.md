---
layout: doc
title: Inline grid
category: Layout and structure
examples:
  - fileName: Gap.vue
    title: Gap
    description: >-
      Use the `gap` prop to set the amount of space between columns. The `gap` prop supports responsive spacing with the [Breakpoints tokens](https://polaris.shopify.com/tokens/breakpoints).
  - fileName: ColumnWidth.vue
    title: Column width
    description: >-
      The `columns` property accepts CSS column shorthand syntax, or an array of strings mapping to common widths in the admin such as `oneThird`, `oneHalf`, and `twoThirds`. For responsive columns, use the same syntax passed into an object with the breakpoints.
  - fileName: ColumnNumber.vue
    title: Number of columns
    description: >-
      Control the number of columns using the `columns` prop. Column numbers can be responsively set using the [Breakpoints tokens](https://polaris.shopify.com/tokens/breakpoints).
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

## Related components

- For more control over padding and widths, [use the Box component](https://polaris.shopify.com/components/box)
- To lay out a set of smaller components horizontally, [use the InlineStack component](https://polaris.shopify.com/components/layout-and-structure/inline-stack)

## Related resources

- InlineGrid props are named following the convention of CSS logical properties, such as `alignItems="start"` vs. `alignItems="left"`. Learn more about [CSS logicial properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties).

</div>
