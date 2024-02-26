---
layout: doc
title: Autocomplete
category: Selection and input
examples:
  - fileName: Default.vue
    title: Default
    description: Use to help merchants complete text input quickly from a list of options.
  - fileName: MultipleTags.vue
    title: With multiple tags
    description: Use to help merchants select multiple options from a list curated by the text input.
  - fileName: MultipleSections.vue
    title: With multiple sections
    description: Use to help merchants complete text input quickly from a multiple sections list of options.
  - fileName: WithLoading.vue
    title: With loading
    description: Use to indicate loading state to merchants while option data is processing.
  - fileName: WithLazyLoading.vue
    title: With lazy loading
  - fileName: WithEmptyState.vue
    title: With empty state
    description: Use to indicate there are no search results.
  - fileName: WithAction.vue
    title: With action
    description: Use to help merchants complete an action quickly.
  - fileName: WithWrappingAction.vue
    title: With wrapping action
    description: Use to help merchants complete an action quickly with wrapping lines of text.
  - fileName: WithDestructiveAction.vue
    title: With destructive action
    description: Use to help merchants complete a destructive action quickly.
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

The autocomplete component should:

- Be clearly labeled so it’s obvious to the merchant what type of options will be available
- Limit the number of options displayed at once
- Not be used within a popover
- Indicate a loading state to the merchant while option data is being populated

---

## Content guidelines

The input field for autocomplete should follow the [content guidelines](/components/TextField) for text fields.

---

## Related components

- For an input field without suggested options, [use the text field component](/components/TextField)
- For a list of selectable options not linked to an input field, [use the option list component](/components/OptionList)
- For a text field that triggers a popover, [use the combo box component](/components/Combobox)

---

## Accessibility

### Structure

The autocomplete component is based on the [ARIA 1.2 combobox pattern](https://www.w3.org/TR/wai-aria-practices-1.1/#combobox) and the [Aria 1.2 Listbox pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#Listbox).

The autocomplete list displays below the text field or other control by default so it is easy for merchants to discover and use. However, you can change the position with the `preferredPosition` prop.

Autocomplete features can be challenging for merchants with visual, motor, and cognitive disabilities. Even when they’re built using best practices, these features can be difficult to use with some assistive technologies. Merchants should always be able to search, enter data, or perform other activities without relying on the autocomplete.

<DoDont>

#### Do

Use autocomplete as progressive enhancement to make the interface easier to use for most merchants.

#### Don’t

Require that merchants make a selection from the autocomplete to complete a task.

</DoDont>

### Keyboard support

- Give the autocomplete text input keyboard focus with the <kbd>tab</kbd> key (or <kbd>shift</kbd> + <kbd>tab</kbd> when tabbing backwards)
- Access the list of options with the up and down arrow keys
- Select an option that has focus with the <kbd>enter</kbd>/<kbd>return</kbd> key

</div>
