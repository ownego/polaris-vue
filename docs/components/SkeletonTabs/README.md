---
layout: doc
title: Skeleton tabs
category: Feedback indicators
examples:
  - fileName: Default.vue
    frameHeight: 200
    title: Default
  - fileName: SkeletonTabsWithCustomCount.vue
    frameHeight: 200
    title: With custom count
  - fileName: SkeletonTabsFitted.vue
    frameHeight: 200
    title: Fitted
    description: Use when tabs contain a few (2 or 3) items within a narrow column.
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

<div style="font-size: 0.8125rem">

## Best practices

Skeleton tabs component should:

- Give merchants an indication of what the page content will be once loaded

---

## Related components

- Use this component with [Skeleton page](/components/SkeletonPage) and [Skeleton body text](/components/SkeletonBodyText) to represent the content of a page before it’s loaded.

</div>
