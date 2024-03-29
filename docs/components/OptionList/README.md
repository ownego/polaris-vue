---
layout: doc
title: Option list
category: Lists
examples:
  - fileName: Default.vue
    title: Default
    description: Use for a group of similar selectable items when only one should be selectable at once.
  - fileName: Multiple.vue
    title: Multiple
    description: Use when you have a group of similar selectable items and more than one item can be selected at once.
  - fileName: WithSection.vue
    title: With sections
    description: Use sections when you have multiple groups of similar selectable items.
  - fileName: InPopover.vue
    title: In a popover
    description: Use when a set of selections won’t fit in the available screen space.
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

## Events

<EventsTable />

<div style="font-size: 0.8125rem">

## Best practices

The option list component should:

- Be placed on its own inside a container. Usually the container behaves like a menu, as it does with [popover](/components/Popover). Don’t place other components within the same container.
- Not be used when a [select component](/components/Select) will do.

---

## Content guidelines

### Option lists

Each item in an option list should be clear and descriptive.

<DoDont>

#### Do

- Traffic referrer source

#### Don’t

- Source

</DoDont>

---

## Related components

- To render a list of actions,
  [use the action list component](/components/ActionList)
- To create a list of grouped radio buttons or checkboxes,
  [use the choice list component](/components/ChoiceList)
- For a basic version of option list as a single choice menu,
  [use the select component](/components/Select)

---

## Accessibility

Items in an option list are organized as list items (`<li>`) in an unordered list (`<ul>`) and are conveyed as a group of related elements to assistive technology users.

Controls in simple option lists are [buttons](/components/Button), and controls in multiple option lists are [checkboxes](/components/Checkbox).

If you customize the option list, you can provide ARIA roles that fit the context. These roles must be valid according to the [W3C ARIA specification](https://www.w3.org/TR/wai-aria-1.1/) to be conveyed correctly to screen reader users.

- The `role` prop adds an ARIA role to the option list wrapper

</div>
