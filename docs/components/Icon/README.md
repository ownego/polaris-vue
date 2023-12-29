---
layout: doc
title: Icon
category: Images and icons
examples:
  - fileName: Default.vue
    title: Default
    description: >-
      Use to visually communicate core parts of the product and available actions.
  - fileName: Colored.vue
    title: Colored
    description: >-
      Apply a color to the icon.
  - fileName: CustomSvg.vue 
    title: With custom SVG
    description: >-
      Specify an SVG as a string to render it in an image tag, instead of an inline SVG to prevent script injection.
  - fileName: CustomSvgColor.vue
    title: With custom SVG and color
    description: >-
      When using changing color of an svg and it uses currentColor, the white color is applied.
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

