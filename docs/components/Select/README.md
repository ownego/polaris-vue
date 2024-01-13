---
layout: doc
title: Select
category: Selection and input
examples:
  - fileName: Default.vue
    frameHeight: 250
    title: Default
    description: Presents a classic dropdown menu or equivalent picker as determined by merchants’ browsers.
  - fileName: InlineLabel.vue
    frameHeight: 250
    title: With inline label
    description: Use only for cases where the select must fit on a single line, such as in a toolbar.
  - fileName: Disabled.vue
    frameHeight: 250
    title: Disabled
    description: Use for selections that aren’t currently available. The surrounding interface should make it clear why the select box is disabled and how to activate it.
  - fileName: WithPrefix.vue
    frameHeight: 250
    title: With prefix
    description: Renders any React element to the left of individual select options. Does not show in the dropdown.
  - fileName: ValidationError.vue
    frameHeight: 250
    title: With validation error
    description: Use to let merchants know if there’s a problem with their selection. For selects, a selection is typically invalid only when using a placeholder option (“Select”) and no other selection has been made.
  - fileName: SeparateValidationError.vue
    frameHeight: 250
    title: With separate validation error
    description: Use to let merchants know when their select input is invalid in the context of a group of form inputs that the select depends on.
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

<EventsTable typeFile="SelectEvents" />

<div style="font-size: 0.8125rem">

## Best practices

The select component should:

- Be used for selecting between 4 or more pre-defined options
- Have a default option selected whenever possible
- Use “Select” as a placeholder option only if there’s no logical default option

---

## Content guidelines

### Select label

Labels should:

- Give a short description (1–3 words) of the requested input.
- Be written in sentence case (the first word capitalized, the rest lowercase).
- Avoid punctuation and articles (“the”, “an”, “a”).
- Be independent sentences. To support [internationalization](https://polaris.shopify.com/foundations/internationalization), they should not act as the first part of a sentence that is finished by the component’s options.
- Be descriptive, not instructional. If the selection needs more explanation, use help text below the field.

<DoDont>

#### Do

- Email address

#### Don’t

- What is your email address?

</DoDont>

<DoDont>

#### Do

- Phone number

#### Don’t

- My phone number is:

</DoDont>

### Select options

Options should:

- Start with “Select” as a placeholder if there isn’t a default option
- Be listed alphabetically or in another logical order so merchants can easily find the option they need
- Be written in sentence case (the first word capitalized, the rest lowercase) and avoid using commas or semicolons at the end of each option
- Be clearly labelled based on what the option will do

---

## Related components

- To let merchants select one option from a list with less than 4 options, use [the choice list component](/components/ChoiceList)
- To create a select where merchants can make multiple selections, or to allow advanced formatting of option text, use an [option list](/components/OptionList) inside a [popover](/components/Popover)

</div>
