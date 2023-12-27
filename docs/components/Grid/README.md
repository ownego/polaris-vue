---
layout: doc
title: Grid
category: Layout and structure
examples:
  - fileName: TwoColumn.vue
    title: Two column
    description: Use to create a two column layout that wraps at a breakpoint and aligns to a twelve column grid.
  - fileName: TwoThirdColumn.vue
    title: Two-thirds and one-third column
    description: Use to create a two-thirds, one-third column layout that wraps at a breakpoint and aligns to a twelve column grid.
  - fileName: ThreeOneThirdColumn.vue
    title: Three one-third column
    description: Use to create a three column layout that wrap at a breakpoint and aligns to a twelve column grid.
  - fileName: CustomLayout.vue
    title: Custom layout
    description: Use to create a layout that can be customized at specific breakpoints.
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

- To lay out a set of smaller components in a row, [use the vertical stack component](https://polaris.shopify.com/components/layout-and-structure/vertical-stack)
- To lay out form fields, [use the form layout component](https://polaris.shopify.com/components/form-layout)

</div>
