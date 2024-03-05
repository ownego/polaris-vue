---
layout: doc
title: Badge
category: Feedback indicators
examples:
  - fileName: Default.vue
    frameHeight: 250
    title: Default
    description: Use to give a non-critical tone update on a piece of information or action.
  - fileName: Small.vue
    frameHeight: 250
    title: Small
    description: Use in layouts with minimal space, like inside of an `IndexTable` cell.
  - fileName: Info.vue
    frameHeight: 250
    title: Informational
    description: Use to call out an object or action as having an important attribute. For example, marking an option as “Recommended” or marking a theme as “Published”.
  - fileName: Success.vue
    frameHeight: 250
    title: Success
    description: Use to indicate a successful, completed, or desirable state when it’s important to provide positive reinforcement to merchants. For example, when merchants successfully dispute a chargeback, a success badge shows that says “Funds recovered”.
  - fileName: Attention.vue
    frameHeight: 250
    title: Attention
    description: Use when something requires merchants’ attention but the issue isn’t critical. For example, this badge would show next to an order that needs to be reviewed by merchants.
  - fileName: Warning.vue
    frameHeight: 250
    title: Warning
    description: Use for warnings and time-sensitive issues that require merchants’ attention and potential action. Warning events are often reversible. Keep in mind that seeing this badge can feel stressful for merchants so it should only be used when absolutely necessary.
  - fileName: Critical.vue
    frameHeight: 250
    title: Critical
    description: Use for critical and irreversible issues that require merchants’ attention and potential action. Keep in mind that seeing this badge can feel stressful for merchants so it should only be used when absolutely necessary.
  - fileName: Incomplete.vue
    frameHeight: 250
    title: Incomplete
    description: Use to indicate when a given task has not yet been completed. For example, when merchants haven’t fulfilled an order.
  - fileName: Partially.vue
    frameHeight: 250
    title: Partially complete
    description: Use to indicate when a given task has been partially completed. For example, when merchants have partially fulfilled an order.
  - fileName: Complete.vue
    frameHeight: 250
    title: Complete
    description: Use to indicate when a given task has been completed. For example, when merchants have fulfilled an order.
  - fileName: WithOverride.vue
    frameHeight: 250
    title: With toneAndProgressLabelOverride
    description: Use when the tone and progress accessibilityLabels are not appropriate to a given context.
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

Badges benefit merchants by:

- Using established color patterns so that merchants can quickly identify their tone or importance level
- Being clearly labeled with short, scannable text
- Being positioned to clearly identify the object they’re informing or labelling

---

## Content guidelines

### Badge label

Badge labels should:

- Use a single word to describe the tone of an object.
- Only use two words if you need to describe a complex state. For example, “Partially refunded” and “Partially fulfilled”.
- Always describe the tone in the past tense. For example, refunded not refund.

The available badges for financial tone are:

- Authorized
- Pending
- Paid
- Unpaid
- Pending
- Voided
- Partially paid
- Partially refunded
- Refunded

The available badges for fulfillment tone are:

- Fulfilled
- Complete
- Partial
- Unfulfilled
- Restocked

<DoDont>

#### Don’t

Don’t use alternatives to existing badge options. Only create a new badge option if there aren’t any existing options to communicate the tone you need.

</DoDont>

---

## Related components

- To represent an interactive list of categories provided by merchants, [use tags](/components/Tag)

---

## Accessibility

Badges that convey information with icons or color include text provided by the visually hidden component. This text is read out by assistive technologies like screen readers so that merchants with vision issues can access the meaning of the badge in context.

</div>

