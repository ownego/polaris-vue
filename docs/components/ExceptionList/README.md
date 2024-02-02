---
layout: doc
title: Exception list
category: Feedback indicators
examples:
  - fileName: Default.vue
    title: Default
    description: Use icons to add clarity or assist in visualizing the meaning
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

The exception list component should:

- Be attached to another component
- Inform merchants about extra context that will help them make better decisions
- Only surface noteworthy, actionable content, like a high risk order or out of stock item
- Used sparingly, so that it has more impact and doesn’t add clutter
- Only use an icon if it adds clarity to the content or helps merchants visualize the meaning

---

## Content guidelines

Exception lists should:

- Highlight an exceptional state that helps merchants make a decision
- Use the appropriate [color](https://polaris.shopify.com/design/colors) to suit the tone of the message
- Have a description (a title is optional)
- Be concise

For error states, exception lists should:

- Either tell merchants how to solve the problem or be attached to an item that lets merchants fix the problem

If placed next to an item in a [resource list](/components/ResourceList), exceptions lists should:

- Make the entire list item clickable because the exception list itself isn’t clickable

---

## Related components

- To display an error at the top of a page, or to indicate multiple errors in a form, use the [banner](/components/Banner) component
- Exceptions lists are often used in the [resource list](/components/ResourceList) component to display conditional content

---

## Accessibility

Items in an exception list are organized as list items (`<li>`) in an unordered list wrapper (`<ul>`), so they’re conveyed as a group of related elements to assistive technology users.

Icons displayed with exception list items are meant to visually reinforce the adjacent information, not to convey information on their own. They are skipped by screen readers using `aria-hidden="true"`.

</div>
