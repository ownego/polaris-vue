---
layout: doc
title: Form layout
category: Layout and structure
examples:
  - fileName: Default.vue
    frameHeight: 280
    title: Default
    description: Use to stack form fields vertically, which makes them easier to scan and complete.
  - fileName: FieldGroup.vue
    frameHeight: 280
    title: Field group
    description: Use field groups to arrange multiple fields in a row. Works best for familiar layouts such as a row of city, state, and zip code fields. Use caution when arranging unrelated fields next to each other as this makes fields easier to miss. Field groups will wrap automatically on smaller screens.
  - fileName: CondensedFieldGroup.vue
    frameHeight: 280
    title: Condensed field group
    description: For very short inputs, the width of the inputs may be reduced in order to fit more fields in the row.
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

Forms should:

- Be considerate of merchants’ time and privacy by only asking for information that’s required
- Group related tasks under section titles to provide more context and make the interface easier to scan
- Follow a logical, predictable order—for example, always ask for first name first, and last name second on forms

---

## Content guidelines

### Form section title

Form section titles should follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#headings-and-subheadings).

### Field label

A label is a short description of a field. Labels are not help text, and they shouldn’t be used to provide instruction, but they should be meaningful and clearly indicate what is expected. Labels should be:

- Placed above or beside the form field
- Short and succinct (1–3 words)
- Written in sentence case (the first word capitalized, the rest lowercase)

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

### Help text

Help text provides extra guidance to people filling out a form field. This text is easy for people to ignore, so merchants should not need to depend on it to fill out a form. As with all forms, help text should be succinct and easy to read.

---

## Related components

- To arrange the largest sections of a page, [use the layout component](/components/Layout)

</div>
