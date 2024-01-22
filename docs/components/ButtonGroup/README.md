---
layout: doc
title: Button group
category: Actions
examples:
  - fileName: Default.vue
    frameHeight: 250
    title: Default
    description: Use when you have multiple buttons to space them out evenly.
  - fileName: Segmented.vue
    frameHeight: 250
    title: With segmented buttons
    description: Use to emphasize several buttons as a thematically-related set among other controls.
  - fileName: Pressed.vue
    frameHeight: 250
    title: Pressed with segmented buttons
    description: Pressed buttons can be used in combination to create a toggle for other parts of the user interface.
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

Button groups should:

- Only use buttons that follow the
  [best practices outlined in the button component](/components/Button#best-practices)
- Group together calls to action that have a relationship
- Be used with consideration that too many calls to action can cause merchants to be unsure of what to do next
- Be thoughtful about how multiple buttons will look and work on small screens
- Only be used in groups of up to six buttons if the buttons contain an icon with no text

---

## Content guidelines

Button groups should follow the [content guidelines](https://polaris.shopify.com/content/actionable-language#buttons) for buttons.

---

## Related components

- To learn how to use individual buttons, [use the button component](/components/Button)
- To embed an action or navigation into a line of text, [use the link component](/components/Link)

</div>
