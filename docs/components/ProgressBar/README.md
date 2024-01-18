---
layout: doc
title: Progress bar
shortDescription: Used to visually represent the completion of a task or operation.
category: Feedback indicators
releasedIn: 1.8.0
keywords:
  - ProgressBar
  - progress indicator
  - progress bar
  - loading
examples:
  - fileName: Default.vue
    title: Default
    description: Use this component to visually represent the completion of a task or operation.
  - fileName: ProgressBarSmall.vue
    title: Small
    description: Use the size option when you need to increase or decrease the visual weight of the progress bar.
  - fileName: ProgressBarColored.vue
    title: Colored
    description: Use the color option when you need to blend the progress bar in a context that calls for it, such as a progress toward success or where it’s the primary focus.
  - fileName: ProgressBarNonAnimated.vue
    title: Non-animated
    description: Use the animated prop when you want to show a static progress bar.
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

Progress bar components should:

- Give merchants an indication of how much of the task has completed and how much is left.
- Not be used for entire page loads. In this case, use the [Skeleton page](/components/SkeletonPage) component.

---

## Related components

- For tasks with a short load time, use the [Spinner](/components/Spinner) component
- For full page loads, use the [Skeleton page](/components/SkeletonPage) component

</div>
