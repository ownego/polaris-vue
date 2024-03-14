---
layout: doc
title: Index filters
category: Selection and input
examples:
  - fileName: Default.vue
    title: Default
    description: An IndexFilters component with view management, search, filtering, and sorting.
  - fileName: WithPinned.vue
    title: With pinned filters
    description: An IndexFilters component with some of the filters pinned, making them visible by default.
  - fileName: FilteringMode.vue
    title: Filtering mode default
    description: An IndexFilters component with filtering mode enabled by default.
  - fileName: Disabled.vue
    title: Disabled
    description: An IndexFilters component that is disabled.
  - fileName: WithNoFilters.vue
    title: With no filters
    description: An IndexFilters component with only view management, search, and sorting.
  - fileName: WithNoSearchOrFilters.vue
    title: With no search or filters
    description: An IndexFilters component with only view management and sorting.
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

Merchants use filters to:

- Create different subsets of list items
- Search list items by typing a query into the text input
- Sort list items by column

The way that merchants interact with index filters depends on the components that you decide to incorporate. It supports configuration of a search query input, sorting options, and one or more filters that can be made up of different inputs.

Merchants use the tabs in index tables to:

- Control which view is visible
- Edit the applied filters and search terms of a view
- Create, rename, duplicate, or delete views

You can create views and control which actions can be performed on a particular view.

## Anatomy

1. **Tabs**: A list of saved views. Each tab represents a subset of the list that has been sorted, filtered, and or queried and saved with a unique name. New views can be created directly from the tab list, or by editing the filters, query, or sort selection of an existing view and saving it as new.
2. **Search and filter, and sort buttons**: The search and filter button allows merchants to toggle the index table from "View" mode to "Filter" mode. When clicked, the button reveals the search field and the filters that allow merchants to edit or create saved views. The sort button activates a popover displaying a list of options merchants can choose from to sort the list items. Merchants can also choose whether the list should be sorted in ascending or descending order.
3. **Filters**: A set of useful ways to narrow down the list based on the common actions merchants may need to take on the data. The filters should present merchants with form inputs that help them include or exclude list items from the view based on their data.
4. **Action buttons**: Primary and secondary actions that a merchant can take on the current view. The primary action will always be either "Save" or "Save as" depending on whether the view is mutable, and the secondary action will always be "Cancel".

---

## Accessibility

The filters component relies on the accessibility features of several other components:

- [Popover](/components/Popover)
- [ChoiceList](/components/ChoiceList)
- [Modal](/components/Modal)
- [Tabs](/components/Tabs)
- [Tooltip](/components/Tooltip)

### Maintain accessibility with custom features

Since custom HTML can be passed to the component for additional actions, ensure that the filtering system you build is accessible as a whole.

All merchants must be able to:

- Identify and understand the labels of all controls
- Be notified of state changes as they use the filter controls
- Complete all actions using a keyboard

---

## Best practices

Index filters should:

- Reduce merchant effort by promoting the filtering categories that are most commonly used
- Include no more than 2 or 3 promoted filters
- Consider small screen sizes when designing the interface for each filter and the total number filters to include
- Use children only for content that’s related or relevant to filtering

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
