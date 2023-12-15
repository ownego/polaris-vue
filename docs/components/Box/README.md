---
layout: doc
title: Box
category: Layout and structure
outline: deep
examples:
  - fileName: Color.vue
    title: Color
    description:
      Background color of box and text color inside a box can be .
  - fileName: Border.vue
    title: Border width
    description:
      Border width can be adjusted using the  and a subset of tokens allows different types of border.
  - fileName: BorderRadius.vue
    title: Border radius
    description:
      Border radius can be adjusted using the
  - fileName: Padding.vue
    title: Padding
    description:
      Padding can be added to either all sides, left, right, top, and bottom
  - fileName: Shadow.vue
    title: Shadow
    description:
      Shadow can be applied using the
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

## Events
