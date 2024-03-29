---
layout: doc
title: Inline stack
category: Layout and structure
examples:
  - fileName: NonWrapping.vue
    title: Non-wrapping
    description: >-
      The default wrapping behavior of children can be overridden using the `wrap` prop.
  - fileName: Gap.vue
    title: Gap
    description: >-
      Control the horizontal and vertical space between children using the `gap` prop. The `gap` prop supports responsive spacing with the [Breakpoints tokens](https://polaris.shopify.com/tokens/breakpoints).
  - fileName: BlockAlign.vue
    frameHeight: 700
    title: Block align
    description: >-
      Control the vertical alignment of children using the `blockAlign` prop.
  - fileName: Align.vue
    frameHeight: 700
    title: Align
    description: >-
      Control the horizontal alignment of children using the `align` prop.
  - fileName: WithDirection.vue
    title: Direction
    description: >-
      Control the horizontal direction of children using the `direction` prop. The `direction` prop supports responsive spacing with the [Breakpoints tokens](https://polaris.shopify.com/tokens/breakpoints).
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

- To create the large-scale structure of pages, [use the InlineGrid component](/components/InlineGrid)
- To display elements vertically, [use the BlockStack component](/components/BlockStack)

## Related resources

- InlineStack props are named following the convention of CSS logical properties, such as `align="start"` vs. `align="left"` and `blockAlign="end"` vs. `verticalAlign="bottom"`. Learn more about [CSS logicial properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties).

</div>
