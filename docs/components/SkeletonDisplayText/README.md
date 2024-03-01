---
layout: doc
title: Skeleton display text
category: Feedback indicators
examples:
  - fileName: Default.vue
    frameHeight: 200
    title: Medium and large
    description: Use this component to represent medium and large display text such as large metrics on the reports list page, or for page titles.
  - fileName: SkeletonDisplayTextExtraLarge.vue
    frameHeight: 200
    title: Extra large
    description: Use this component to represent extra large display text.
  - fileName: SkeletonDisplayTextSmall.vue
    frameHeight: 200
    title: Small
    description: Use this component to represent small display text such as content headings.
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

Skeleton display text component should:

- Give merchants an indication of what the page content will be once loaded
- Use real content for display text that never changes

---

## Content guidelines

### Skeleton display text

Show static display text that that never changes on a page. For example, keep page titles, such as Products on the product list page, but use skeleton loading for page titles that change on the product details page.

<DoDont>

#### Do

![Image showing skeleton display text for dynamic content](https://polaris.shopify.com/images/components/feedback-indicators/skeleton-display-text/do-show-display-text-for-static-content@2x.png)

Show actual display text for static content and use skeleton display text for dynamic content.

#### Don’t

![Image showing skeleton display text for static content and placeholder text for dynamic content](https://polaris.shopify.com/images/components/feedback-indicators/skeleton-display-text/dont-use-skeleton-for-static-or-placeholder-content-for-dynamic@2x.png)

Use skeleton display text for static content or placeholder content for dynamic content.

</DoDont>

<DoDont>

#### Do

Show skeleton display text for dynamic page titles.

![Image showing skeleton display text for dynamic page title](https://polaris.shopify.com/images/components/feedback-indicators/skeleton-display-text/do-use-skeleton-for-dynamic-page-titles@2x.png)

</DoDont>

---

## Related components

- Use this component with [Skeleton page](/components/SkeletonPage) and [Skeleton body text](/components/SkeletonBodyText) to represent the content of a page before it’s loaded.
- When giving feedback for in-context operations, use [Progress bar](/components/ProgressBar) or [Spinner](/components/Spinner) component.

</div>
