---
layout: doc
title: Popover
category: Overlays
examples:
  - fileName: WithActionList.vue
    title: With action list
    description: Use when presenting a set of actions in a disclosable menu.
  - fileName: WithContentAndActions.vue 
    title: With content and actions
    description: Use to present a combination of content, instructions, and actions in a panel for tasks that are of low or secondary importance to the current page. When used this way, popovers provide useful entry points to related features without overwhelming merchants.
  - fileName: WithFormComponents.vue
    title: With form components
    description: Use to present secondary input tasks on demand.
  # - fileName: popover-with-lazy-loaded-list.tsx
  #   title: With lazy loaded list
  #   description: Use to present merchants with a list that dynamically loads more items on scroll or arrow down.
  # - fileName: popover-with-searchable-listbox.tsx
  #   title: With searchable listbox
  #   description: Use to help merchants browse, filter, and choose from a list of options.
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

## Events

<EventsTable />

<div style="font-size: 0.8125rem">

## Best practices

Popovers should:

- Always be positioned next to the button or other interface element that triggers them
- Be used for secondary or less important information and actions since they’re hidden until merchants hit the trigger
- Contain navigation or actions that share a relationships to each other
- Be triggered by a clearly labeled button
- Use a default or tertiary button as the activator

---

## Content guidelines

### Popover content

If a popover contains actions, they should:

- Be clear and predictable: merchants should be able to anticipate what will happen when they click on an action item. Never deceive merchants by mislabeling an action.

<DoDont>

#### Do

- Create order
- Buy shipping label

#### Don’t

- New order
- Buy

</DoDont>

- Be action-led: buttons should always lead with a strong verb that encourages action. To provide enough context to merchants use the \{verb\}+\{noun\} format on buttons except in the case of common actions like Save, Close, Cancel, or OK.

<DoDont>

#### Do

- Rename
- Edit HTML
- Duplicate

#### Don’t

- HTML editing options
- File name changes
- Duplicate this order so that you can make edits, updates, or changes

</DoDont>

- Be scannable, especially when the popover contains a list of actions or options. Avoid unnecessary words and articles such as “the”, “an”, or “a”.

<DoDont>

#### Do

- Add menu item

#### Don’t

- Add a menu item

</DoDont>

If the popover includes a series of navigational links, each item should:

- Be concise but still give merchants enough information so they can easily find and accurately navigate to the path they want.

<DoDont>

#### Do

- Online store
- Messenger
- Facebook
- Buy Button

#### Don’t

- Sales channel

</DoDont>

---

## Related components

- To put a list of actions in a popover, [use the action list component](https://polaris.shopify.com/components/ActionList)
- To let merchants select simple options from a list, [use the select component](https://polaris.shopify.com/components/Select)

---

## Accessibility

Popovers usually contain an [option list](https://polaris.shopify.com/components/OptionList) or an [action list](https://polaris.shopify.com/components/ActionList), but can also contain other controls or content.

To assist screen readers with sending focus to an [action list](https://polaris.shopify.com/components/ActionList), pass `autofocusTarget='first-node'` to `Popover`. This will avoid known issues a screen reader may have with keyboard support once focus is moved off the activator.

Web browsers assign a default value of 'menu' to the `aria-haspopup` role. You can use the prop `ariaHaspopup` to specify a value. Screen readers may fail to send focus to the `Popover` content when they expect the content to be adjacent to the element with `aria-haspopup` in the DOM tree. In this scenario, it is recommended not to provide the `ariaHaspopup` prop.

### Keyboard support

- When a popover opens, focus moves to the first focusable element or to the popover container
- Once focus is in the popover, merchants can access controls in the popover using the <kbd>tab</kbd> key (and <kbd>shift</kbd> + <kbd>tab</kbd> backwards) and standard keystrokes for interacting
- Merchants can dismiss the popover by tabbing out of it, pressing the <kbd>esc</kbd> key, or clicking outside of it
- When the popover is closed, focus returns to the element that launched it

</div>
