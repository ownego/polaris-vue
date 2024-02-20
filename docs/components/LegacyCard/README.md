---
layout: doc
title: Legacy card
category: Deprecated
examples:
  - fileName: Default.vue
    title: Default
    description: Use when you have a simple message to communicate to merchants that doesn’t require any secondary steps.
  - fileName: LegacyCardWithHeaderActions.vue
    title: With header actions
    description: Use for less important card actions, or actions merchants may do before reviewing the contents of the card. For example, merchants may want to add items to a card containing a long list, or enter a customer’s new address.
  - fileName: LegacyCardWithFooterActions.vue
    title: With footer actions
    description: Use footer actions for a card’s most important actions, or actions merchants should do after reviewing the contents of the card. For example, merchants should review the contents of a shipment before an important action like adding tracking information. Footer actions can be left or right aligned with the `footerActionAlignment` prop.
  - fileName: LegacyCardWithMultipleFooterActions.vue
    title: With multiple footer actions
    description: When multiple secondary footer actions are provided, they will render in an action list popover activated by a disclosure button. The disclosure button text can be customized with the `secondaryFooterActionsDisclosureText` prop.
  - fileName: LegacyCardWithCustomFooterActions.vue
    title: With custom footer actions
    description: Use to present actionable content that is optional or not the primary purpose of the page.
  - fileName: LegacyCardWithDestructiveFooterAction.vue
    title: With destructive footer action
    description: Use when a card action will delete merchant data or be otherwise difficult to recover from.
  - fileName: LegacyCardWithMultipleSections.vue
    title: With multiple sections
    description: Use when you have two related but distinct pieces of information to communicate to merchants. Multiple sections can help break up complicated concepts to make them easier to scan and understand.
  - fileName: LegacyCardWithMultipleTitledSections.vue
    title: With multiple titled sections
    description: Use when you have two related but distinct pieces of information to communicate to merchants that are complex enough to require a title to introduce them.
  - fileName: LegacyCardWithSectionsAndActions.vue
    title: With sections and actions
    description: Use when your card section has actions that apply only to that section.
  - fileName: LegacyCardWithSubsection.vue
    title: With subsection
    description: Use when your card sections need further categorization.
  - fileName: LegacyCardWithDestructiveAction.vue
    title: With destructive action
    description: Use when a card action applies only to one section and will delete merchant data or be otherwise difficult to recover from.
  - fileName: LegacyCardWithSubduedSection.vue
    title: With a subdued section
    description: Use to indicate when one of the sections in your card contains inactive or disabled content.
  - fileName: LegacyCardWithSubduedForSecondaryContent.vue
    title: With subdued for secondary content
    description: Use for content that you want to deprioritize. Subdued cards don’t stand out as much as cards with white backgrounds so don’t use them for information or actions that are critical to merchants.
  - fileName: LegacyCardWithSeparateHeader.vue
    title: With separate header
    description: Use to be able to use custom React elements as header content.
  - fileName: LegacyCardWithCustomTitle.vue
    title: With custom Vue Node title
    description: Use to render custom content such as icons, links, or buttons in a card section’s header.
  - fileName: LegacyCardWithAllElements.vue
    title: With all elements
    description: Use as a broad example that includes most props available to card.
  - fileName: LegacyCardWithFlushedSections.vue
    title: With flushed sections
    description: Use when you need further control over the spacing of your card sections.
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

The keyboard key component should:

- Include a heading to introduce and explain the shortcuts being described when more than one shortcut is listed
- Include an action label to describe what will happen if merchants use the key combination

---

## Content guidelines

### Heading

Headings above the keyboard key should:

- Label the type of keyboard shortcuts being presented
- Follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#headings-and-subheadings)

### Shortcut description

The shortcut description should describe what action is taken when merchants tap certain keys. When a hotkey combination takes merchants to a location in the interface, the format should be:

| Properties | Type   | Description                           |
| ---------- | ------ | ------------------------------------- |
| children   | string | The content to display inside the key |

---

## Related components

- To add a tooltip for a button with an associated keyboard shortcut, [use the tooltip component](/components/Tooltip)

---

## Accessibility

The text of the keyboard key component is read by screen readers, but the visual formatting isn’t conveyed. Ensure that merchants are able to understand information about keyboard shortcuts without relying on the visual style of the component.

<DoDont>

#### Do

- Pair lists of keyboard shortcut information with a heading that describes the section (“Keyboard shortcuts”).
- Provide inline keyboard instructions with context.

```JSX
Press the <KeyboardKey>Ctrl</KeyboardKey> key.
```

#### Don't

- Use the keyboard key component alone to convey keyboard instructions.

```JSX
Use <KeyboardKey>Ctrl</KeyboardKey>
```

</DoDont>

</div>
