---
layout: doc
title: Action list
category: Lists
examples:
  - fileName: InPopover.vue
    title: In a popover
    description: Use for the least important actions so merchants aren’t distracted by secondary tasks. Can also be used for a set of actions that won’t fit in the available screen space.
  - fileName: WithIconOrImage.vue
    title: With icons or image
    description: Use when the items benefit from an associated action or image, such as a list of products.
  - fileName: WithIconAndSuffix.vue
    title: With an icon and a suffix
    description: Use when the items benefit from an associated action or image, such as a list of products.
  - fileName: WithSections.vue
    title: With sections
    description: Use when the items benefit from sections to help differentiate actions.
  - fileName: WithDestructive.vue
    title: With destructive item
    description: Use to visually indicate that an action list item is destructive.
  - fileName: WithHelpText.vue
    title: With help text
    description: Use help text when the normal Verb noun syntax for the actions does not provide sufficient context for the merchant.
  - fileName: WithPrefix.vue
    title: With a prefix and a suffix
    description: Use help text when the normal Verb noun syntax for the actions does not provide sufficient context for the merchant.
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

Actions lists should:

- Be used for secondary or less important information and actions since they’re hidden until merchants expose them by opening a popover
- Contain actions that are related to each other

---

## Content guidelines

### Action lists

Each item in an action list should be clear and predictable. Merchants should be able to anticipate what will happen when they click on an action item.

<DoDont>

#### Do

Buy shipping label

#### Don’t

Buy

</DoDont>

Each item in an action list should always lead with a strong verb that encourages action. To provide enough context use the \{verb\}+\{noun\} format unless the action is clear with a single verb.

<DoDont>

#### Do

- Rename
- Edit HTML

#### Don’t

- File name changes
- HTML editing options

</DoDont>

Each item in an action list should be scannable avoiding unnecessary words and articles such as the, an, or a.

<DoDont>

#### Do

- Add menu item

#### Don’t

- Add a menu item

</DoDont>

---

## Related components

- To combine more than one button in a single layout, [use the button group component](https://polaris.shopify.com/components/ButtonGroup)
- To display a list of related content, [use the list component](https://polaris.shopify.com/components/List)

---

## Accessibility

Items in an action list are organized as list items (`<li>`) in an unordered list (`<ul>`) and are conveyed as a group of related elements to assistive technology users. Each item is implemented as a [button](https://polaris.shopify.com/components/Button).

### Keyboard support

- Give the action list items keyboard focus with the <kbd>tab</kbd> key (or <kbd>shift</kbd> + <kbd>tab</kbd> when tabbing backwards)
- When action list items have a role of `menuitem`, navigate through the list with <kbd>down arrow</kbd> (<kbd>up arrow</kbd> to move backwards)
- Activate buttons with the <kbd>enter</kbd>/<kbd>return</kbd> key or the <kbd>space</kbd> key

### High contrast support

- Each item is clearly discernible in high contrast mode
- Each item that is focused and hovered is clearly discernible in high contrast mode

</div>
