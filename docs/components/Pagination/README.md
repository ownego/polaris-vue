---
layout: doc
title: Pagination
category: Navigation
examples:
  - fileName: Default.vue
    title: Default
    description: Use for pagination of resources.
  - fileName: Keyboard.vue
    title: With keyboard navigation
    description: Attach standard keyboard shortcuts to important pagination controls.
  - fileName: WithLabel.vue
    title: With label
    description: Add a label between navigation buttons to provide more context of the content being viewed by the user.
  - fileName: TableType.vue
    title: With table type
    description: Use for pagination at the bottom of tables or lists.
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

On all platforms, pagination should:

- Only be used for lists with more than 25 items

Web pagination should:

- Be placed at the bottom of a long list that has been split up into pages
- Pagination should navigate to the previous and next set of items in the paged list
- Hint when merchants are at the first or the last page by disabling the corresponding button

iOS and Android pagination should:

- Start loading items when merchants are close to the bottom, roughly 5 items from the end
- Show [a spinner](components/Spinner) below the list to indicate that items have been requested

---

## Related components

- To see how pagination is used on a page, see the [page component](/components/Page)
- To add primary and secondary calls to action at the bottom of a page, see the [page actions component](components/PageActions)
- The [resource list component](components/ResourceList) is often combined with pagination to handle long lists of resources such as orders or customers
- To create stand-alone navigational links or calls to action, use the [button component](components/Button)
- To embed actions or pathways to more information within a sentence, use the [link component](components/Link)

</div>
