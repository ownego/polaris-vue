---
layout: doc
title: Skeleton thumbnail
category: Feedback indicators
examples:
  - fileName: Default.vue
    title: Medium
    description: Use this component to represent medium thumbnails.
  - fileName: SkeletonThumbnailLarge.vue
    title: Large
    description: Use this component to represent large thumbnails.
  - fileName: SkeletonThumbnailSmall.vue
    title: Small
    description: Use this component to represent small thumbnails.
  - fileName: SkeletonThumbnailExtraSmall.vue
    title: Extra small
    description: Use this component to represent extra small thumbnails.
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

Skeleton thumbnail component should:

- Try to match the size of the thumbnail to the content being loaded so it gives an accurate representation.

---

## Related components

- Use this component with [Skeleton display text](/components/SkeletonDisplayText) to represent the content of a card while it’s loading.

</div>
