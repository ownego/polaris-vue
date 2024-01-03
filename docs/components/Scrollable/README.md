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

<div style="font-size: 0.8125rem">

<PropsTable />

## Slots

<SlotsTable />

## Best practices

Scrollable containers should:

- Be used when it’s helpful to provide an extra visual cue to let merchants know that content exists below or above the fold
- Only be used for length text such as terms of service or other legal disclaimers and never for instructional or action-oriented text

---

## Content guidelines

Scrollable containers are cards with scrolling functionality, and should follow the [content guidelines](https://polaris.shopify.com/components/layout-and-structure/legacy-card#content-guidelines) for cards.

---

## Related components

- To put long sections of information under a block that merchants can expand or collapse, [use the collapsible component](https://polaris.shopify.com/components/collapsible)

</div>
