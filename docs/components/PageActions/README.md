---
layout: doc
title: Page actions
category: Actions
examples:
  - fileName: Default.vue
    frameHeight: 250
    title: Default
    description: Used on a resource page (such as an individual order or product page) to let merchants take key actions at the bottom of the page. Usually, the primary action is Save and the secondary action is Delete.
  - fileName: WithPrimaryOnly.vue
    frameHeight: 250
    title: Primary action only
    description: Not all page actions require a secondary action.
  - fileName: WithCustomPrimaryAction.vue
    frameHeight: 250
    title: With custom primary action
    description: Use to create a custom primary action.
  - fileName: WithCustomSecondaryAction.vue
    frameHeight: 250
    title: With custom secondary action
    description: Use to create a custom secondary action.
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

Page actions should:

- Include a single primary action on the right. It should be the same as the primary action that shows in the title bar at the top of the page.
- Include a maximum of two secondary actions, but doesn’t have to include any secondary actions.

---

## Content guidelines

### Call to action buttons

Buttons should be:

- Clear and predictable: merchants should be able to anticipate what will happen when they click a button. Never deceive merchants by mislabeling a button.

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

---

## Related components

- To add actions to the top of a page, see the [page component’s](/components/Page) action props
- To create a call to action within the context of other page content, use the [button component](/components/Button)
- To let merchants move through a collection of items that spans multiple pages, see the [pagination component](/components/Pagination)

</div>
