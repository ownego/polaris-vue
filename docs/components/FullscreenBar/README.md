---
layout: doc
title: Fullscreen bar
category: Navigation
examples:
  - fileName: WithChildren.vue
    title: With children
    description: Use to provide structure for the top of an application while in fullscreen mode.
  - fileName: NoChildren.vue
    title: No children
    description: Use this default to show ONLY the Back button.
---

# {{ $frontmatter.title }}

<Lede>

{{ $frontmatter.description }}

</Lede>

<Examples>

<<< ./[examples]

</Examples>

## Slots

<SlotsTable />

## Events

<EventsTable />

<div style="font-size: 0.8125rem">

## Best practices

The Fullscreen bar component should:

- Be presented when an App is in fullscreen mode as a means of exiting that mode.
- Fire an action to exit fullscreen mode.

---

## Related components

- To provide quick, at-a-glance feedback on the outcome of an action, use the [App Bridge Toast API](https://shopify.dev/docs/api/app-bridge-library/reference/toast) component.
- To indicate to merchants that a page is loading or an upload is processing, use the [App Bridge Loading API](https://shopify.dev/docs/api/app-bridge-library/reference/loading) component.


</div>
