---
layout: doc
title: Avatar
category: Images and icons
examples:
  - fileName: Default.vue
    frameHeight: 250
    title: Default
    description: Use to present an avatar for a merchant, customer, or business.
  - fileName: Initial.vue
    frameHeight: 250
    title: Initials
    description: Use to present an avatar with initials for a merchant, customer, or business.
  - fileName: ExtraSmall.vue
    frameHeight: 250
    title: Extra small
    description: Use to present an avatar in a condensed layout, such as a data table cell or an action list item.
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

The layout component should:

- Use sections with white backgrounds for primary content and sections with grey backgrounds for secondary content that is less important
- Center cards on the background when there is no secondary card on the page to stop the content from becoming too wide
- Group similar concepts and actions together in cards
- Separate different cards using a full-width divider
- Structure primary/secondary, two-column layouts so the primary ⅔ section is used for main information and the secondary ⅓ section is used for information that might not be used as often but remains helpful for context or secondary tasks
- Use equal-width layouts with two or more columns when each layout section has the same importance

---

## Content guidelines

The content that appears in the layout component comes from cards and annotated sections.

### Cards

Content from cards should follow the content guidelines for [cards](/components/Card#content-guidelines).

### Annotated section titles

Annotated section titles should follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#headings-and-subheadings).

### Annotated section descriptions

Annotated section descriptions should:

- Be used if the explanation or purpose of the associated cards isn’t clear
- Provide instructions for any choices merchants need to make, or explain the purpose of the section
- Be short, no more than 1–3 sentences
- Direct merchants to more content in the Help Center with “Learn more” links
- Not repeat the section title
- Use complete sentences and regular punctuation

---

## Related components

- To visually group content in a layout section, [use the card component](/components/Card)
- To lay out form fields, [use the form layout component](/components/FormLayout)

</div>
