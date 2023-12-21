---
layout: doc
title: Link
category: Navigation
examples:
  - fileName: Default.vue
    title: Default links
    description: Use for text links inside a paragraph or for standalone text. Default links open in the same browser tab.
  - fileName: Monochrome.vue
    title: Monochrome
    description: Use for text links that are the same color as the surrounding text.
  # - fileName: MonochromeBanner.vue
  #   title: Monochrome in a banner
  #   description: Monochrome styles will be applied to links rendered within a `Banner`.
  # - fileName: External.vue
  #   title: External link
  #   description: Use for text links that should open in a new browser tab (or window, depending on the merchant’s browser settings). Use this only when a default link might disrupt the merchant’s workflow.
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

