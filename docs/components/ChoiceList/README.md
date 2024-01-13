---
layout: doc
title: Choice list
category: Selection and input
examples:
  - fileName: Default.vue
    frameHeight: 280
    title: Default
    description: Allows merchants to select one option from a list. Make sure all options are an either/or choice.
  - fileName: WithError.vue
    frameHeight: 280
    title: With error
    description: Allows for accessible error handling by connecting the error message to the field with the error.
  - fileName: MultiChoice.vue
    frameHeight: 280
    title: With multi-choice
    description: Allows merchants to select multiple options from a list. Avoid options that are an either/or choice.
  - fileName: ChildrenContent.vue
    frameHeight: 300
    title: With children content
    description: Use when you need merchants to view and/or interact with additional content under a choice. The content will always be rendered.
  - fileName: DynamicChildrenContent.vue
    frameHeight: 300
    title: With dynamic children content
    description: Use when you need merchants to view and/or interact with additional content under a choice. The content is only rendered when the choice is selected. Works for both single-choice and multi-choice list.
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

<EventsTable typeFile="ChoiceListEvents" />

<div style="font-size: 0.8125rem">

## Best practices

Choice lists should:

- Include a title that tells merchants what to do or explains the available options
- Label options clearly based on what the option will do
- Avoid mutually exclusive options when allowing multiple selection

---

## Content guidelines

### List titles

List titles should:

- Help merchants understand how the items in the list are grouped together, or should explain what kind of choice merchants are making

<DoDont>

#### Do

Pick a shipping method

#### Don’t

Pick one

</DoDont>

### Be concise and scannable

- Use simple, clear language that can be read at a glance
- Keep list titles to a single sentence
- It the title introduces the list, it should end with a colon
- Should be written in sentence case

<DoDont>

#### Do

Shipping options

#### Don’t

Shipping Options

</DoDont>

### Not use colons

<DoDont>

#### Do

If the customer abandons their checkout, send them an email reminder to complete their order:

- Option a
- Option b

#### Don’t

If the customer abandons their checkout, send them an email reminder to complete their order

- Option a
- Option b

</DoDont>

### List choices

Every item in a choice list should:

- Start with a capital letter
- Not use commas or semicolons at the end of each line
- Be written in sentence case (the first word capitalized, the rest lowercase)

<DoDont>

#### Do

- Option 1
- Yellow
- Item three

#### Don’t

- option 1
- Yellow;
- Item Three

</DoDont>

### Helper text and descriptions

If your list contains helper text, only the description below the list item should contain punctuation.

---

## Related components

- To present a long list of radio buttons or when space is constrained, [use the select component](/components/Select)
- To build a group of radio buttons or checkboxes with a custom layout, use the [radio button component](/components/RadioButton) or [checkbox component](/components/Checkbox)
- To display a simple, non-interactive list of related content, [use the list component](/components/List)

---

## Accessibility

The choice list component uses the accessibility features of the [checkbox](/components/Checkbox) and [radio button](/components/RadioButton) components.

</div>

