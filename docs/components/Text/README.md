---
layout: doc
title: Text
category: Typography
examples:
  - fileName: Heading.vue
    title: Heading
    description: >-
      Use to create various levels of hierarchy on the page.
  - fileName: Body.vue
    title: Body
    description: >-
      Use to create a range of body text. These styles are primarily used within components and blocks of text.
  - fileName: Align.vue
    title: Align
    description: >-
      Use to set text alignment.
  - fileName: Weight.vue
    title: Weight
    description: >-
      Use to give text a range of font weights.
  - fileName: Tone.vue
    title: Tone
    description: >-
      Use to set text tone (color).
  - fileName: Inheritance.vue
    title: Inheritance
    description: >-
      Inherits props from a parent Text container
  - fileName: Decoration.vue
    title: Decoration
    description: >-
      Use to define text decoration
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
