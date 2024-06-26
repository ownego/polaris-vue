---
layout: doc
title: Filters
category: Selection and input
examples:
  - fileName: WithResourceList.vue
    frameHeight: 600
    title: With a resource list
  - fileName: WithDataTable.vue
    frameHeight: 600
    title: With a data table
  - fileName: WithChildrenContent.vue
    frameHeight: 600
    title: With children content
  - fileName: WithChildrenAndUnsavedChanges.vue
    frameHeight: 600
    title: With children content and unsaved changes
  - fileName: Disabled.vue
    frameHeight: 600
    title: Disabled
  - fileName: SomeDisabled.vue
    frameHeight: 600
    title: With some disabled
  - fileName: WithQueryFieldHidden.vue
    frameHeight: 600
    title: With query field hidden
  - fileName: WithQueryFieldDisabled.vue
    frameHeight: 600
    title: With query field disabled
  - fileName: WithAdditionalFilterSections.vue
    frameHeight: 600
    title: With additional filter sections
  - fileName: WithFilterBarHidden.vue
    frameHeight: 600
    title: With filter bar hidden
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

Merchants use filters to:

- view different subsets of items in a list or table
- filter by typing into a text field
- filter by selecting filters or promoted filters

The way that merchants interact with filters depends on the components that you decide to incorporate. In its simplest form, filters includes a text field and a set of filters, which can be displayed in different ways. What the filters are and how they’re exposed to merchants is flexible.

---

## Accessibility

The filters component relies on the accessibility features of multiple other components:

- [Text field](/components/TextField)
- [Button](/components/Button)
- [Popover](/components/Popover)

### Maintain accessibility with custom features

Since custom HTML can be passed to the component for additional actions, ensure that the filtering system you build is accessible as a whole.

All merchants must:

- be able to identify and understand labels for all controls
- be notified of state changes
- be able to complete all actions with the keyboard

---

## Best practices

The filters component should:

- help reduce merchant effort by promoting the filtering categories that are most commonly used
- include no more than 2 or 3 promoted filters
- consider small screen sizes when designing the interface for each filter and the total number filters to include
- use children only for content that’s related or relevant to filtering

---

## Content guidelines

### Text field

The text field should be clearly labeled so it’s obvious to merchants what they should enter into the field.

<DoDont>

#### Do

- Filter orders

#### Don’t

- Enter text here

</DoDont>

### Filter badges

Use the name of the filter if the purpose of the name is clear on its own. For example, when you see a filter badge that reads **Fulfilled**, it’s intuitive that it falls under the Fulfillment status category.

<DoDont>

#### Do

- Fulfilled, Unfulfilled

#### Don’t

- Fulfillment: Fulfilled, Unfulfilled

</DoDont>

If the filter name is ambiguous on its own, add a descriptive word related to the status. For example, **Low** doesn’t make sense out of context. Add the word “risk” so that merchants know it’s from the Risk category.

<DoDont>

#### Do

- High risk, Low risk

#### Don’t

- High, Low

</DoDont>

Group tags from the same category together.

<DoDont>

#### Do

- (Unfulfilled, Fulfilled)

#### Don’t

- (Unfulfilled) (fulfilled)

</DoDont>

If all tag pills selected: truncate in the middle

<DoDont>

#### Do

- Paid, par… unpaid

#### Don’t

- All payment status filters selected, Paid, unpa…

</DoDont>


</div>
