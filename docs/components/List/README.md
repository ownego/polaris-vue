---
layout: doc
title: List
category: Lists
examples:
  - fileName: ListBulleted.vue
    title: Bulleted
    description: Use for a text-only list of related items that don’t need to be in a specific order and don’t require an icon or other indicator.
  - fileName: ListNumber.vue
    title: Numbered
    description: Use for a text-only list of related items when an inherent order, priority, or sequence needs to be communicated.
  - fileName: ExtraTight.vue
    title: Extra Tight
    description: Use when there is limited space for a text-only list of related items when an inherent order, priority, or sequence needs to be communicated.
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

Lists should:

- Break up chunks of related content to make the information easier for merchants to scan
- Be phrased consistently (try to start each item with a noun or a verb and be consistent with each item)
- Not be used for lists where the entire item represents an action

---

## Content guidelines

### List items

Every item in a list should:

- Start with a capital letter
- Not use commas or semicolons at the end of each line

<DoDont>

#### Do

- Red
- Yellow
- Blue

#### Don’t

- Red;
- Yellow;
- Blue.

</DoDont>

- Be written in sentence case

<DoDont>

#### Do

- Item one
- Item two
- Item three

#### Don’t

- Item One
- Item Two
- Item Three

</DoDont>

---

## Related components

- To create a list of checkboxes or radio buttons, [use the choice list component](/components/ChoiceList)
- To present a collection of objects of the same type such as customers, products, or orders, [use the resource list component](/components/ResourceList)
- When text labels for each item are useful for describing the content, [use the Description List component](/components/DescriptionList)

---

## Accessibility

The list component outputs list items (`<li>`) inside a list wrapper (`<ul>` for bullet lists or `<ol>` for numbered lists). By default, list items are conveyed as a group of related elements to assistive technology users.

To group items for layout only, consider using the [vertical stack component](/components/VerticalStack).

</div>
