---
layout: doc
title: Skeleton page
category: Feedback indicators
examples:
  - fileName: Default.vue
    title: With dynamic content
    description: Use this component to compose a loading version of a page where the page title and header content are dynamic, meaning, the content changes.
  - fileName: SkeletonPageWithStaticContent.vue
    title: With static content
    description: Use this component to compose a loading version of a page where the page title and header content are known and stay the same.
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

Skeleton page component should:

- Be used for pages where all content loads at the same time.
- Give merchants an indication of what the page layout will be once loaded. Do this by mimicking its layout similarly to the state that will be loaded.

---

## Content guidelines

Show page titles that never change for a page. For example, keep the title “Products” on the product list page, but use skeleton loading for titles that change on the product details page. Don’t use placeholder content for titles that will change when the page fully loads.

Secondary actions are always represented with skeleton content. You can change the number of skeleton actions that best represent the number of actions once loaded.

<DoDont>

#### Do

Use skeleton loading for dynamic content, and use actual content for content that doesn’t change.

![Image showing skeleton loading for changing content](https://polaris.shopify.com/images/components/feedback-indicators/skeleton-page/do-use-skeleton-for-changing-content@2x.png)

#### Don’t

Use placeholder content that will change when the page fully loads. This will confuse merchants and create a jumpy loading experience.

![Image showing placeholder content that will change](https://polaris.shopify.com/images/components/feedback-indicators/skeleton-page/dont-use-placeholder-content-that-will-change@2x.png)

</DoDont>

---

## Related components

- Use the [Skeleton body text](components/SkeletonBodyText) and [Skeleton display text](components/SkeletonDisplayText) components to represent blocks of content.
- When giving feedback for in-context operations, use [Progress bar](components/ProgressBar) or [Spinner](components/Spinner) component.

</div>
