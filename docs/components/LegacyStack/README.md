---
layout: doc
title: Legacy Stack
category: Deprecated
examples:
  - fileName: Default.vue
    frameHeight: 250
    title: Default
    description: Use to quickly lay out a horizontal row of components and maintain their relative sizes. On small screens, children rows wrap down to additional rows as needed.
  - fileName: NonWrap.vue
    frameHeight: 250
    title: Non-wrapping
    description: Use to create a stack where the children will not wrap to new rows on small screens. As noted above, the wrap option defaults to true. This means you must explicitly set it to false to turn it off.
  - fileName: Spacing.vue
    frameHeight: 250
    title: Spacing
    description: Use to control spacing of items in a stack in standard increments. Use tight for less spacing, loose for more spacing, or none to remove normal spacing altogether.
  - fileName: VerticalCenter.vue
    frameHeight: 250
    title: Vertical centering
    description: Use to vertically center a set of items that have different heights.
  - fileName: FillSpace.vue
    frameHeight: 250
    title: Fill available space proportionally
    description: Use to have the stack’s items fill the horizontal space in the container but maintain their relative proportions.
  - fileName: FillEven.vue
    frameHeight: 250
    title: Where items fill space evenly
    description: Use to have the stack’s items fill the horizontal space in the container and be equal widths, regardless of their content.
  - fileName: SingleItemFill.vue
    frameHeight: 250
    title: Where a single item fills the remaining space
    description: Use for aligning buttons or secondary content to the right edge of another element, allowing it to wrap below on small screens.
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

Stacks should:

- Be used for small-scale layout tasks when you want a row of components that should wrap on small screen widths
- Be used to vertically center two elements
- Not be used for complex or unique arrangements of components
- Not be used for large-scale page layout

---

## Stack item

The stack component will treat multiple elements wrapped in a stack item component as one item. By default, each individual element is treated as one stack item. Use the fill prop on a single stack item component to make it fill the rest of the available horizontal space. See the “Stack where a single item fills the remaining space” example.

### Stack item properties

| Prop     | Type    | Description                                                    | Default |
| -------- | ------- | -------------------------------------------------------------- | ------- |
| fill     | boolean | Fill the available horizontal space in the stack with the item | false   |
| children | any     | Elements to display inside stack item                          |         |

---

## Related components

- To create the large-scale structure of pages, [use the layout component](https://polaris.shopify.com/components/layout)

---

## Accessibility

The stack component is for alignment only and doesn’t provide any structural information for assistive technologies. To convey relationships between specific items, consider using the [list component](https://polaris.shopify.com/components/list).


</div>

