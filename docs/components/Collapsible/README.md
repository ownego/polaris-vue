---
layout: doc
title: Collapsible
category: Utilities
examples:
  - fileName: Default.vue
    title: Default
    description: Use for a basic “show more” interaction when you need to display more content.
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

<EventsTable />

<div style="font-size: 0.8125rem">

## Best practices

The collapsible component should:

- Be used for information that is lower priority or that merchants donâ€™t need to see all the time
- Not be used to hide error messages or other critical information that requires an immediate action

---

## Content guidelines

Collapsible containers are cards with expandable and collapsible functionality, and should follow the content guidelines for [cards](/components/LegacyCard#content-guidelines).

---

## Related components

- To control a collapsible component, use the [button](/components/Button) component
- To put long sections of information in a container that allows for scrolling, [use the scrollable component](/components/Scrollable)

---

## Accessibility

Use the collapsible component in conjunction with a [button](/components/Button). Place the collapsible content immediately after the button that controls it, so merchants with vision or attention issues can easily discover what content is being affected.

- Use the required `id` prop of the collapsible component to give the content a unique `id` value
- Use the `ariaExpanded` prop on the button component to add an `aria-expanded` attribute, which conveys the expanded or collapsed state to screen reader users
- Use the `ariaControls` prop on the button component, and set its value to the `id` value of the collapsible component

</div>
