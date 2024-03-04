---
layout: doc
title: Card
category: Layout and structure
examples:
  - fileName: Default.vue
    frameHeight: 212
    title: Default
    description: >-
      By default, cards have an 8px border radius and uses `--p-color-bg-surface` as the background and `--p-shadow-300` as the shadow. There is padding of `space-400` (16px) around children.
  - fileName: Background.vue
    title: With subdued background
    description: >-
      Use for content that you want to deprioritize. Subdued cards don’t stand out as much as cards with white backgrounds so don’t use them for information or actions that are critical to merchants.
  - fileName: VaryingPadding.vue
    title: With varying padding
    description: >-
      Use the `padding` property to adjust the spacing within a card. You can also specify spacing values at different breakpoints.
  - fileName: ResponsiveBorderRadius.vue
    title: With responsive border radius
    description: >-
      Use the `roundedAbove` property to adjust the border radius of the card based on a set breakpoint.
  - fileName: WithSection.vue
    title: With section
    description: >-
      Use when you have a distinct piece of information to communicate to merchants.
  - fileName: SubduedSection.vue
    title: With subdued section
    description: >-
      Use to indicate when one of the sections in your card contains inactive or disabled content.
  - fileName: MultipleSection.vue
    title: With multiple sections
    description: >-
      Use when you have two related but distinct pieces of information to communicate to merchants. Multiple sections can help break up complicated concepts to make them easier to scan and understand.
  - fileName: MultipleTitledSection.vue
    title: With multiple titled sections
    description: >-
      Use when you have two related but distinct pieces of information to communicate to merchants that are complex enough to require a title to introduce them.
  - fileName: Subsection.vue
    title: With subsection
    description: >-
      Use when your card sections need further categorization.
  - fileName: FlushedSection.vue
    title: With flushed section
    description: >-
      Use when you need further control over the spacing of your card sections.
  - fileName: SectionAndAction.vue
    title: With sections and actions
    description: >-
      Use when your card section has actions that apply only to that section.
  - fileName: SectionAndCriticalAction.vue
    title: With sections and critical action
    description: >-
      Use when a card action applies only to one section and will delete merchant data or be otherwise difficult to recover from.
  - fileName: WithSeparateHeader.vue
    title: With separate header
    description: >-
      Use to be able to use custom React elements as header content.
  - fileName: WithHeaderAction.vue
    title: With header actions
    description: >-
      Use for less important card actions, or actions merchants may do before reviewing the contents of the card. For example, merchants may want to add items to a card containing a long list, or enter a customer’s new address.
  - fileName: WithFooterAction.vue
    title: With footer actions
    description: >-
      Use footer actions for a card’s most important actions, or actions merchants should do after reviewing the contents of the card. For example, merchants should review the contents of a shipment before an important action like adding tracking information.
  - fileName: WithMultipleFooterAction.vue
    title: With multiple footer actions
    description: >-
      Use when there are multiple secondary footer actions that are rendered in an action list popover activated by a disclosure button.
  - fileName: WithCustomFooterAction.vue
    title: With custom footer actions
    description: >-
      Use to present actionable content that is optional or not the primary purpose of the page.
  - fileName: CriticalFooterAction.vue
    title: With critical footer action
    description: >-
      Use when a card action will delete merchant data or be otherwise difficult to recover from.
  - fileName: AllElement.vue
    frameHeight: 600
    title: With all elements
    description: >-
      Use as a broad example that includes using other layout components to build out the card.
---

# {{ $frontmatter.title }}

<Lede>

{{ $frontmatter.description }}

</Lede>

<Examples>

<<< ./[examples]

</Examples>

## Props

<div style="font-size: 0.8125rem">

Some types of props are following the [Polaris Design Tokens](https://polaris.shopify.com/tokens).

</div>

<PropsTable />

## Slots

<SlotsTable />

<div style="font-size: 0.8125rem">

## Best practices

Cards should:

- Group related information
- Display information in a way that prioritizes what the merchant needs to know most first
- Use headings that set clear expectations about the card’s purpose
- Stick to single user flows or break more complicated flows into multiple sections
- Avoid too many call-to-action buttons or links and only one primary call to action per card
- Use calls to action on the bottom of the card for next steps and use the space in the upper right corner of the card for persistent, optional actions (such as Edit)

---

## Related components

- For more flexibility on styling, [use the Box component](/components/Box)

</div>
