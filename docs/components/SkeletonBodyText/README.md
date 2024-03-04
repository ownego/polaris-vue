---
layout: doc
title: Skeleton body text
category: Feedback indicators
examples:
  - fileName: Default.vue
    frameHeight: 250
    title: Default
    description: Use this component to represent a block of content being loaded. For example, you could use it to represent an entire product description card on the product page.
  - fileName: SkeletonBodyTextSingleLineContent.vue
    frameHeight: 250
    title: Single line content
    description: Use this component to represent a short, single line of text, like a timestamp.
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

Skeleton body text component should:

- Be used with [Skeleton page](/components/SkeletonPage) when page content loads all at once. Together, these components give merchants an indication of what the page layout will be once loaded.
- Be used on its own, inside any content container component (like a [card](/components/Card)), and when content loads after the main page load.
- Try to match the number of lines to the content being loaded so it gives an accurate representation.

---

## Content guidelines

### Skeleton body text

Show static content that never changes on a page and use skeleton loading for dynamic content. Skeleton body text can sometimes be used to represent non-typographic content such as forms. Don’t use placeholder content that will change when the page fully loads.

<DoDont>

#### Do

Use skeleton body text for dynamic content.

![Image showing skeleton body text for dynamic content](https://polaris.shopify.com/images/components/feedback-indicators/skeleton-body-text/do-use-skeleton-body-for-dynamic-content@2x.png)

#### Don’t

Use skeleton body text for static content or use placeholder content for dynamic content.

![Image showing skeleton body text for static content](https://polaris.shopify.com/images/components/feedback-indicators/skeleton-body-text/dont-use-skeleton-body-for-static-or-placeholder-for-dynamic-text@2x.png)

</DoDont>

---

## Related components

- Use this component with [Skeleton page](/components/SkeletonPage) and [Skeleton display text](/components/SkeletonDisplayText) to represent the content of a page while it’s loading.
- When giving feedback for in-context operations, use [Progress bar](/components/ProgressBar) or [Spinner](/components/Spinner) component.

</div>
