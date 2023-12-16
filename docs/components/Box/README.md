---
layout: doc
title: Box
category: Layout and structure
examples:
  - fileName: Color.vue
    frameHeight: 212
    title: Color
    description: >-
      Background color of box and text color inside a box can be adjusted using the [Color tokens](https://polaris.shopify.com/tokens/color).
  - fileName: Border.vue
    frameHeight: 212
    title: Border width
    description: >-
      Border width can be adjusted using the [Border tokens](https://polaris.shopify.com/tokens/border), and a subset of tokens allows different types of border.
  - fileName: BorderRadius.vue
    frameHeight: 212
    title: Border radius
    description: >-
      Border radius can be adjusted using the [Border tokens](https://polaris.shopify.com/tokens/border).
  - fileName: Padding.vue
    frameHeight: 212
    title: Padding
    description: >-
      Padding can be added to either all sides, left, right, top, and bottom, using the [Space tokens](https://polaris.shopify.com/tokens/space). The `padding` prop supports responsive spacing with the [Breakpoints tokens](https://polaris.shopify.com/tokens/breakpoints).
  - fileName: Shadow.vue
    frameHeight: 212
    title: Shadow
    description: >-
      Shadow can be applied using the [Shadow tokens](https://polaris.shopify.com/tokens/shadow).
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

- For more specific use cases, [use the Card component](https://polaris.shopify.com/components/Card)

## Related resources

- Box props are named following the convention of CSS logical properties, such as `padding-inline-start` and `padding-block-start`. Learn more about [CSS logicial properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties).

</div>
