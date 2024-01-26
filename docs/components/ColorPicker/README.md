---
layout: doc
title: Color picker
category: Selection and input
examples:
  - fileName: Default.vue
    frameHeight: 350
    title: Default
    description: Use when merchants need to select a color to make the selection a visual task rather than a technical one.
  - fileName: RgbValue.vue
    frameHeight: 350
    title: RGB value
    description: Output the RGB value of the selected color.
  - fileName: HexValue.vue
    frameHeight: 350
    title: Hex value
    description: Output the hex value of the selected color. Cannot use the alpha slider.
  - fileName: Transparent.vue
    frameHeight: 350
    title: With transparent value
    description: Use when attached to a visual builder to allow the designated object to have a transparent background that allows underlying objects to show through.
  - fileName: FullWidth.vue
    frameHeight: 350
    title: With transparent value full width
    description: Use when attached to a visual builder to allow the designated object to have a transparent background that allows underlying objects to show through.
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

## Events

<EventsTable />

<div style="font-size: 0.8125rem">

## Best practices

- Use the alpha slider if you want to allow merchants to be able to select a transparent color

</div>
