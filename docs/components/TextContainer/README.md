---
layout: doc
title: Text container
category: Deprecated
examples:
  - fileName: Default.vue
    title: Default
    description: Use this component for default vertical spacing.
  - fileName: TextContainerTight.vue
    title: Tight
    description: Use the tight spacing option to relate content topics to each other.
  - fileName: TextContainerLoose.vue
    title: Loose
    description: Use the loose spacing option to separate concepts that are independent of each other.
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

The closer the spacing, the closer the relationship between content topics. The closeness visually represents the relationship.

- Use tight spacing to relate content topics to each other
- Use loose spacing to separate concepts that are independent of each other

---

## Related components

- For more layout variations, or if you’re looking to vertically space components other than text, use [BlockStack](/components/BlockStack).

</div>
