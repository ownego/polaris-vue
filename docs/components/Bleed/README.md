---
layout: doc
title: Bleed
category: Layout and structure
examples:
  - fileName: Default.vue
    title: Horizontal
    description: >-
      Content will bleed horizontally into the surrounding layout using the `marginInline` prop.
  - fileName: Vertical.vue
    title: Vertical
    description: >-
      Content will bleed vertically into the surrounding layout using the `marginBlock` prop.
  - fileName: Direction.vue
    title: Specific direction
    description: >-
      Negative margins can be added in a specific direction using the [Space tokens](https://polaris.shopify.com/tokens/space).
---

# {{ $frontmatter.title }}

<Lede>

{{ $frontmatter.description }}

</Lede>

<Examples>

<<< ./[examples]

</Examples>

## Bleed values

Content should never go beyond the edges of the parent container. Choose a bleed value that works within the containing layout.

## Related resources

- Bleed props are named following the convention of CSS logical properties, such as 'margin-inline-start' and 'margin-block-start'. Learn more about [CSS logicial properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties).
