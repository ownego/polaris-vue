---
layout: doc
title: Resource list
category: Lists
examples:
  - fileName: Default.vue
    title: Default
    description: A resource list with simple items and no bulk actions, sorting, or filtering.
  - fileName: WithEmptyState.vue
    frameHeight: 700
    title: With empty state
    description: Use to explain the purpose of a list of resources when no resources exist yet. This allows a smooth transition from a list in a loading state to a list where zero, one, or many resources exist.
  - fileName: WithSectionsAndNoBulkActions.vue
    title: With selection and no bulk actions
    description: A resource list with simple items and selection.
  - fileName: WithBulkActions.vue
    title: With bulk actions
    description: Allows merchants to select items and perform an action on the selection.
  - fileName: Loading.vue
    title: With loading state
    description: Notifies merchants that list items are being processed.
  - fileName: TotalCount.vue
    title: With total count
    description: Use to indicate that the number of resources shown is a subset of the total number of resources in the list.
  - fileName: Sorting.vue
    title: With sorting
    description: Allows merchants to change the way the list is sorted by selecting one of several options from a [Select](/components/Select) control.
  - fileName: AlternateTool.vue
    title: With alternate tool
    description: Allows merchants to add an alternate tool in the current sort option location when sort may not be the most relevant action for the current list.
  - fileName: WithFilter.vue
    title: With filtering
    description: Allows merchants to narrow the resource list to a subset of the original items.
  - fileName: CustomEmptySearchResultState.vue
    title: With a custom empty search result state
    description: Allows merchants to narrow the resource list to a subset of the original items. If the filters or search applied return no results, then display a custom empty search state.
  - fileName: ItemShortcutAction.vue
    title: With item shortcut actions
    description: Shortcut actions are intended to provide quick access to popular actions from the resource’s details page. They are shown when the mouse is hovered over the list item, and are not shown on small screen devices, so the action must also be accessible in another way.
  - fileName: PersistAction.vue
    title: With persistent item shortcut actions
    description: Use persistent shortcut actions in rare cases when the action cannot be made available on the item’s details page. Persistent shortcut actions roll up into an overflow menu on small screens.
  - fileName: MultiSelect.vue
    frameHeight: 700
    title: With multiselect
    description: Allows merchants to select or deselect multiple items at once.
  - fileName: WithAllElements.vue
    title: With all of its elements
    description: Use as a broad example that includes most props available to resource list.
  - fileName: WithPagination.vue
    title: With pagination
    description: Use when the list contains many rows and they need paginating.
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

Resource lists can also:

- Support [customized list items](components/ResourceItem)
- Include bulk actions so merchants can act on multiple objects at once
- Support sorting and [filtering](/components/Filters) of long lists
- Be paired with pagination to make long lists digestible

---

## Build

Using a resource list in a project involves combining the following components and subcomponents:

- ResourceList
- [ResourceItem](/components/ResourceItem) or a customized list item
- [Filters](components/Filters) (optional)
- Pagination component (optional)

The resource list component provides the UI elements for list sorting, filtering, and pagination, but doesn’t provide the logic for these operations. When a sort option is changed, filter added, or second page requested, you’ll need to handle that event (including any network requests) and then update the component with new props.

---

## Purpose

Shopify is organized around objects that represent merchants businesses, like customers, products, and orders. Each individual order, for example, is given a dedicated page that can be linked to. In Shopify, we call these types of objects _resources_, and we call the object’s dedicated page its _details page_.

### Problem

Take orders as an example. Merchants may have a lot of them. They need a way to scan their orders, see what state they’re in and find out which ones need action first. In other words, they need a way find an individual order, call up more information about it, and take action on it.

### Solution

Resource lists function as:

- A content format, presenting a set of individual resources in a compact form
- A system for taking action on one or more individual resources
- A way to navigate to an individual resource’s details page

Because a details page displays all the content and actions for an individual resource, you can think of a resource list as a summary of these details pages. In this way resource lists bridge a middle level in Shopify’s navigation hierarchy.

#### A resource list isn’t a data table

On wide screens, a resource list often looks like a table, especially if some content is aligned in columns. Despite this, resource lists and data tables have different purposes.

A data table is a form of data visualization. It works best to present highly structured data for comparison and analysis.

If your use case is more about visualizing or analyzing data, use the [data table component](components/DataTable). If your use case is more about finding and taking action on objects, use a resource list.

---

## Best practices

Resource lists can live in many places in Shopify. You could include a short resource list in a card summarizing recent marketing activities. You could also dedicate an entire page to a resource list like Shopify’s main products list.

Resource lists should:

- Have items that perform an action when clicked. The action should navigate to the resource’s details page or otherwise provide more detail about the item.
- [Customize the content and layout](components/ResourceItem) of their list items to support merchants’ needs.
- Support sorting if the list can be long, and especially if different merchant tasks benefit from different sort orders.
- Support [filtering](components/Filters) if the list can be long.
- Paginate when the current list contains more than 50 items.
- Use the [skeleton page](components/SkeletonPage) component on initial page load for the rest of the page if the loading prop is true and items are processing.

Resource lists can optionally:

- Provide bulk actions for tasks that are often applied to many list items at once. For example, merchants may want to add the same tag to a large number of products.

---

## Content guidelines

Resource lists should:

- Identify the type of resource, usually with a heading

<DoDont>

#### Do

- Products
- Showing 50 products

#### Don’t

- _No heading_

</DoDont>

- Indicate when not all members of a resource are being shown. For a card summarizing and linking to recently purchased products:

<DoDont>

#### Do

- Popular products this week

#### Don’t

- Products

</DoDont>

- Follow the verb + noun formula for bulk actions

- Follow the [content guidelines for filter options and applied filters](components/Filters#content-guidelines)

---

## Related components

- To present structured data for comparison and analysis, like when helping merchants to gain insights or review analytics, use the [data table component](components/DataTable)
- To display a simple list of related content, [use the list component](components/List)

</div>

