---
layout: doc
title: Resource list
category: Lists
examples:
  - fileName: Default.vue
    title: Default
    description: A basic resource item with its details filled in at the point of use.
  - fileName: WithMedia.vue
    title: With media
    description: The media element can hold an [avatar](/components/Avatar), [thumbnail](/components/Thumbnail), or other small-format graphic.
  - fileName: WithShortcutActions.vue
    title: With shortcut actions
    description: Shortcut actions present popular actions from the resource’s details page for easy access. A shortcut action should be available on every item in the list.
  - fileName: VerticalAlign.vue
    title: With vertical alignment
    description: Use to adjust the vertical alignment of item content.
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

## Required components

The resource item component must be wrapped in the [resource list](/components/ResourceList) component.

---

## Accessibility

Resource items function as links to the full-page representations of the items. Each item should have a unique `name` prop. For each `ResourceItem`, the `accessibilityLabel` prop should be used to give the link a unique `aria-label` value. The `aria-label` value should convey the link’s purpose, using the `name` value. Merchants who use screen readers or other text to speech tools should be able to easily distinguish each link from the others.

When adding custom content to resource items, ensure that all text is available to all users and that all custom controls have a unique accessible name to help users understand what will happen when the control is activated.

### Keyboard

Links can be activated with the <kbd>enter</kbd>/<kbd>return</kbd> key by default.

If you add custom controls to resource items, then make sure that the controls:

- Can be used with the keyboard
- Receive keyboard focus in a logical order
- Display a visible focus indicator

---

## Best practices

Resource items should:

- Be tailored to the specific type of context being displayed.
- Perform an action when clicked. The action should navigate to the resource’s details page or provide more detail about the item.

Resource items can optionally:

- Provide [shortcut actions](/components/ResourceList#study-custom-item-shortcut-actions) for quick access to frequent actions from the resource’s details page.

---

## Content guidelines

Resource items should:

- Present the information that merchants need to find the items that they’re looking for.
- Support merchant tasks for the particular type of resource.
- Avoid colons.
- [Shortcut actions](/components/ResourceList#study-custom-item-shortcut-actions) don’t need to follow the full verb + noun formula for buttons.

---

## Related components

To display a simple list of related content, [use the list component](/components/List).

</div>
