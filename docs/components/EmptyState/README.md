---
layout: doc
title: Empty state
category: Layout and structure
examples:
  - fileName: Default.vue
    frameHeight: 600
    title: Default
    description: Use to explain a single feature before merchants have used it.
  - fileName: WithSubduedFooterContent.vue
    frameHeight: 600
    title: With subdued footer context
    description: Use to provide additional but non-critical context for a new product or feature. Can also be used to include a subdued call to action for secondary or tertiary actions.
  - fileName: FullWidthLayout.vue
    frameHeight: 600
    title: With full width layout
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

<div style="font-size: 0.8125rem">

## Best practices

Empty states should:

- Orient merchants by clearly explaining the benefit and utility of a product or feature
- Simplify a complicated experience by focusing on a few key features and benefits
- Use simple and clear language that empowers merchants to move their business forward
- Be encouraging and never make merchants feel unsuccessful or guilty because they haven’t used a product or feature
- Explain the steps merchants need to take to activate a product or feature
- Use illustrations thoughtfully as outlined in our [illustration guidelines](https://polaris.shopify.com/design/illustrations)
- Use only one primary call-to-action button
- Provide extra spacing at the bottom of an empty state that is within content (card, modal, or navigation) to match the image that was passed into the component with a white space above it of 40px

---

## Content guidelines

### Title

Empty state titles should:

- Be action-oriented: encourage merchants to take the step required to activate the product or feature

<DoDont>

#### Do

- Create orders and send invoices

#### Don’t

- Orders and invoices

</DoDont>

- Follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#headings-and-subheadings)

### Subtitle

Empty state subtitles act like body content. They should:

- Describe or explain what’s in the empty state title or item title
- Be conversational: include articles such as the, a, and an

### Primary action

Buttons are used for the most important actions you want merchants to take.
They should be:

- Clear and predictable: merchants should be able to anticipate what will happen when they click a button. Never deceive merchants by using misleading titles.

<DoDont>

#### Do

- Create order
- Buy shipping label

#### Don’t

- New order
- Buy

</DoDont>

- Action-led: buttons should always lead with a strong verb that encourages action. To provide enough context to merchants use the \{verb\}+\{noun\} format on buttons except in the case of common actions like Save, Close, Cancel, or OK.

<DoDont>

#### Do

- Activate Apple Pay
- View shipping settings

#### Don’t

- Try Apple Pay
- View your settings

</DoDont>

- Scannable: avoid unnecessary words and articles such as the, an, or a.

<DoDont>

#### Do

- Add menu item

#### Don’t

- Add a menu item

</DoDont>

### Secondary action

Secondary actions are used for less important actions such as “Learn more” or “Close” buttons. They should follow all the other content rules outlined for primary buttons.

---

## Related components

- To learn more about illustrations for empty states, [read the illustration guidelines](https://polaris.shopify.com/design/illustrations)
- To create page-level layout, [use the layout component](/components/Layout)
- To highlight a Shopify feature, [use the callout card component](/components/CalloutCard)

---

## Accessibility

Empty state illustrations are implemented as decorative images, so they use an empty `alt` attribute and are skipped by technologies like screen readers.

</div>
