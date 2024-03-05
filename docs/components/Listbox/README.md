---
layout: doc
title: List box
category: Lists
examples:
  - fileName: Default.vue
    title: Default
    description: Basic implementation of a control element used to let merchants select options
  - fileName: WithLoading.vue
    title: With Loading
    description: Implementation of a control element showing a loading indicator to let merchants know more options are being loaded
  - fileName: WithAction.vue
    title: With Action
    description: Implementation of a control element used to let merchants take an action
  - fileName: WithCustomElement.vue
    title: With custom element
    description: Implementation of a control with custom rendering of options
  - fileName: WithSearch.vue
    title: With search
    description: Use to help merchants browse, filter, and choose from a list of options.
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

## Anatomy

![A diagram of the Listbox component showing the smaller primitive components it can be composed of.]

A listbox can be composed of:

1. **Options:** The individual options inside the Listbox that merchants can select or deselect.
2. **Dividers:** Placed between items and are useful in complex lists when there’s a lot of information for the merchant to parse.
3. **Section headers:** Used at the begining of a section when it’s necessary to call out the content being displayed. In most cases, the surrounding context should be enough for the merchant to understand the information in the list.

---

## Best practices

Listboxes should:

- Be clearly labeled so it’s noticeable to the merchant what type of options will be available
- Limit the number of options displayed at once
- Indicate a loading state to the merchant while option data is being populated

---

## Content guidelines

### Option lists

Each item in a `Listbox` should be clear and descriptive.

<DoDont>

#### Do

- Traffic referrer source

#### Don’t

- Source

</DoDont>

## Patterns that use `Listbox`

Location picker

---

## Related components

- For a text field and popover container, [use the combobox component](/components/Combobox)
- [Autocomplete](/components/AutoComplete) can be used as a convenience wrapper in lieu of Combobox and Listbox.

---

## Accessibility

### Structure

The `Listbox` component is based on the [Aria 1.2 Listbox pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#Listbox).

It is important to not present interactive elements inside of list box options as they can interfere with navigation for assistive technology users.

<DoDont>

#### Do

- Use labels

#### Don’t

- Use interactive elements inside the list

</DoDont>

### Keyboard support

- Access the list of options with the up and down arrow keys
- Select an option that has focus with the <kbd>enter</kbd>/<kbd>return</kbd> key

</div>
