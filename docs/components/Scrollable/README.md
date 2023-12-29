---
layout: doc
title: Scrollable
shortDescription: Used in components with too much content for the available vertical space. Embeds long-form content in components like modals and popovers.
category: Utilities
examples:
  - fileName: Default.vue
    title: Default
    description: >-
      Use when you need to make a region within the page independently scrollable. It’s often used in modals and other panes where it’s helpful to provide an extra visual cue that content exists below or above the fold.
  - fileName: ToChild.vue
    title: To child component
    description: >-
      Use when you need to programmatically scroll a child component into view in the scrollable container.
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

