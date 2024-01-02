---
layout: doc
title: Spinner
category: Feedback indicators
examples:
  - fileName: Default.vue
    title: Default
    description: Use to notify merchants that their requested action is being processed.
  - fileName: Small.vue
    title: Small
    description: Smaller than the default spinner.
  - fileName: FocusManagement.vue
    title: With focus management
    description: Use to direct the focus state from the control to the spinner, to the content.
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

## Accessibility

SVGs are often conveyed inconsistently to assistive technologies. The `Spinner` component’s accessibility is also highly contextual. When the parent component is focusable, you’ll need to set the `hasFocusableParent` prop for the appropriate `role` attribute to be applied.

For optimal user experience, use the `accessibilityLabel` prop to let assistive technology users know the purpose of the spinner.

---

## Best practices

The spinner component should:

- Notify merchants that their request has been received and the action will soon complete.
- Not be used to give feedback for an entire page load.
- White can only be used with small spinners on actionable components like buttons.
- On web, be used in conjunction with skeleton loading to represent non-typographic content. For example, line graphs on the Merchant analytics dashboard.

---

## Content guidelines

### Accessibility label

Spinner accessibility label should:

- Accurately explain the state of the requested action. For example, “Loading”, “Submitting”, “Processing”.
- Use as few words to describe the state as possible.

---

## Related components

- To improve user experience and reduce the appearance of long loading times, use the [Progress bar](https://polaris.shopify.com/components/progress-bar) component.
- To better represent loading content, use [Skeleton page](https://polaris.shopify.com/components/skeleton-page) along with [Skeleton body text](https://polaris.shopify.com/components/feedback-indicators/skeleton-body-text) and [Skeleton display text](https://polaris.shopify.com/components/skeleton-display-text) components.

</div>
