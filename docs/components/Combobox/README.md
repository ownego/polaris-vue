---
layout: doc
title: Combobox
category: Selection and input
examples:
  - fileName: Default.vue
    title: Default
    description: Use when merchants can select one option from a predefined or editable list.
  - fileName: ManualSelection.vue
    title: With manual selection
    description: Use when merchants can select one option from a predefined or editable list.
  - fileName: MultiSelect.vue
    title: With multi-select
    description: Use when merchants can select one or more options from a predefined or editable list.
  - fileName: MultiSelectAndManualSelection.vue
    title: With multi-select and manual selection
    description: Use when merchants can select one or more options from a predefined or editable list.
  - fileName: MultiSelectAndVerticalContent.vue
    title: With multi-select and vertical content
    description: Use to display selected options above the input value.
  - fileName: WithLoading.vue
    title: With loading
    description: Use to indicate to merchants that the list data is being fetched.
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

## Anatomy

![A diagram of the Combobox component showing the smaller primitive components it is composed of.](https://polaris.shopify.com/images/components/selection-and-input/combobox/combobox-anatomy@2x.png)

A combobox is made up of the following:

1. **TextField**: A text input that activates a popover displaying a list of options. As merchants type in the text field, the list of options is filtered by the input value. Options replace or add to the input value when selected.
2. **Popover**: An overlay containing a list of options.
3. **Listbox**: A list of options to filter and select or deselect.
4. **Listbox.Option**: The individual options to select or deselect. Check out the [listbox component documentation](/components/Listbox) to learn how to compose it with various content.

---

## Best practices

The `Combobox` component should:

- Be clearly labeled so the merchant knows what kind of options will be available
- Not be used within a popover
- Indicate a loading state to the merchant while option data is being populated
- Order items in an intentional way so it’s easy for the merchant to find a specific value

---

## Content guidelines

The input field for `Combobox` should follow the [content guidelines](/components/TextField) for text fields.

---

## Sorting and filtering

### Sorting

Item order should be intentional. Order them so it’s easy for the merchant to find a specific value. Some ways you can do this:

- Sort options in alphabetical order
- Display options based on how frequently the merchant selects an option

If multiple options can be selected, move selected items to the top of the list. If this doesn’t work for your context, you can override this behavior.

### Filtering

- By default, menu items are filtered based on whether or not they match the value of the textfield.
- Filters are **not** case-sensitive by default.
- You can apply custom filtering logic if the default behavior doesn’t make sense for your use case.

---

## Patterns

### Tags autocomplete

The tag multi-select input enables merchants to efficiently add or remove tags from a resource, like a product or an order. It uses the inline autocomplete combobox pattern to present merchants with an editable list of tags to browse and select from.

---

## Related components

- For an input field without suggested options, [use the text field component](/components/TextField)
- For a list of selectable options not linked to an input field, [use the list box component](/components/Listbox)

---

## Accessibility

### Structure

The `Combobox` component is based on the [ARIA 1.2 combobox pattern](https://www.w3.org/TR/wai-aria-practices-1.1/#combobox). It is a combination of a single-line `TextField` and a `Popover`. The current implementation expects a [`Listbox`](/components/Listbox) component to be used.

The `Combobox` popover displays below the text field or other control by default so it is easy for merchants to discover and use. However, you can change the position with the `preferredPosition` prop.

`Combobox` features can be challenging for merchants with visual, motor, and cognitive disabilities. Even when they’re built using best practices, these features can be difficult to use with some assistive technologies. Merchants should always be able to search, enter data, or perform other activities without relying on the combobox.

<DoDont>

#### Do

- Use combobox as progressive enhancement to make the interface easier to use for most merchants.

#### Don’t

- Require that merchants make a selection from the combobox to complete a task.

</DoDont>

### Keyboard support

- Give the combobox's text input keyboard focus with the <kbd>tab</kbd> key (or <kbd>shift</kbd> + <kbd>tab</kbd> when tabbing backwards)

</div>
