---
layout: doc
title: Index table
category: Tables
examples:
  - fileName: Default.vue
    title: Default
    description: An index table with simple items and no bulk actions, sorting, or filtering.
  - fileName: WithViewsSearchFilterSort.vue
    title: With saved views, search, filtering, and sorting
    description: An index table with saved views, search, filtering, sorting, and bulk actions.
  - fileName: WithEditColumns.vue
    title: With edit columns button
    description: An index table with edit columns, saved views, search, filtering, sorting, and bulk actions.
  - fileName: WithDisabledRows.vue
    title: With disabled rows
    description: An index table with saved views, search, filtering, sorting, and bulk actions.
  - fileName: SmallScreen.vue
    title: Small screen
    description: A small screen index table with simple items and no bulk actions, sorting, or filtering.
  - fileName: SmallScreenWithElements.vue
    frameHeight: 450
    title: Small screen with saved views, search, filtering, and sorting
    description: A small screen index table with saved views, search, filtering, sorting, and bulk actions.
  - fileName: WithEmptyState.vue
    title: With empty state
    description: Use to explain the purpose of a index table when no resources exist yet. This allows a smooth transition from a list in a loading state to a list where zero, one, or many resources exist.
  - fileName: WithBulkActions.vue
    title: With bulk actions
    description: Allows merchants to select items and perform an action on the selection.
  - fileName: WithMultipleBulkActions.vue
    title: With multiple promoted bulk actions
    description: Allows merchants to select items and perform different actions on the selection.
  - fileName: WithBulkActionsAndSelectionAcrossPages.vue
    title: With bulk actions and selection across pages
    description: Allows merchants to select items, perform an action on the selection and select resources across pages.
  - fileName: WithSelectionNoBulkActions.vue
    title: With selection and no bulk actions
    description: For when a table is selectable, but doesn't have any bulk actions.
  - fileName: WithLoadingState.vue
    title: With loading state
    description: Notifies merchants that index table items are being processed.
  - fileName: WithFiltering.vue
    title: With filtering
    description: Allows merchants to narrow the index table to a subset of the original items.
  - fileName: WithStickyLastColumn.vue
    title: With sticky last column
    description: An index table with a sticky last column that stays visible on scroll. The last heading will also be sticky if not hidden.
  - fileName: WithRowNavigationLink.vue
    title: With row navigation link
    description: Use when clicking the row should navigate merchants to another page, like the row item's detail page. When a row contains a `Link` with the `dataPrimaryLink` prop set to `true`, clicking the row will trigger navigation to the link's `url` instead of selecting the row as well as trigger the callback set on the `IndexTable` `onNavigation` prop if provided.
  - fileName: WithoutCheckboxes.vue
    title: Without checkboxes
    description: An index table without checkboxes and bulk actions.
  - fileName: WithSubheaders.vue
    title: With subheaders
    description: An index table with multiple table headers. Use to present merchants with resources grouped by a relevant data value to enable faster bulk selection.
  - fileName: WithPagination.vue
    title: With pagination
    description: Use when the table contains many rows and they need paginating.
  - fileName: WithNestedRows.vue
    title: With nested rows
    description: An index table with nested rows. Use to present hierarchical or related data in a structured manner.
  - fileName: WithStickyScrollBar.vue
    title: With sticky scroll bar
    description: An index table with pagination and a horizontal scroll bar, to show how the scroll bar behaves with the sticky pagination.
  - fileName: WithPaginationAndBulkActions.vue
    title: With pagination and bulk actions
    description: An index table with both pagination and bulk actions elements, to see how they integrate with one another.
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

<EventsTable typeFile="IndexTableEvents" />

<div style="font-size: 0.8125rem">

Index tables can also:

- Support [customized index rows and columns](/components/ResourceItem)
- Include bulk actions so merchants can act on multiple objects at once
- Support sorting and [filtering](/components/Filters) of long lists
- Be paired with pagination to make long lists digestible

---

## Build

Using an index table in a project involves combining the following components and subcomponents:

- IndexTable
- [IndexTableRow](#index-table-row)
- [IndexTableCell](#index-table-cell)
- [Filters](/components/Filters) (optional)
- [IndexFilters](/components/IndexFilters) (optional)
- [Pagination](/components/Pagination) (optional)

The index table component provides the UI elements for list selection, sorting, filtering, and pagination, but doesn’t provide the logic for these operations. When a sort option is changed, filter added, or second page requested, you’ll need to handle that event (including any network requests) and then update the component with new props.

---

## Purpose

Shopify is organized around objects that represent merchants' businesses, like customers, products, and orders. Each individual order, for example, is given a dedicated page that can be linked to. In Shopify, we call these types of objects _resources_, and we call the object’s dedicated page its _details page_.

### Problem

Take orders as an example. Merchants may have a lot of them. They need a way to scan their orders, view the different attributes on each order, and find out which ones need action first. In other words, they need a way find an individual order, call up more information about it, and take action on it.

### Solution

Index tables function as:

- A content format, presenting a set of individual resources with multiple columns of information for each
- A system for taking action on one or more individual resources
- A way to navigate to an individual resource’s details page

Because a details page displays all the content and actions for an individual resource, you can think of a resource list as a summary of these details pages. In this way resource lists bridge a middle level in Shopify’s navigation hierarchy.

---

## Best practices

Index tables should:

- Have items that perform an action when clicked. The action should navigate to the resource’s details page or otherwise provide more detail about the item.
- [Customize the content and layout](/components/ResourceItem) of their items rows to surface information to support merchants’ needs.
- Support sorting if the list can be long, and especially if different merchant tasks benefit from different sort orders.
- Support [filtering](/components/Filters) if the list can be long.
- Paginate when the current list contains more than 50 items.
- Use the [skeleton page](/components/SkeletonPage) component on initial page load for the rest of the page if the loading prop is true and items are processing.
- Numeric cells and titles should be right aligned with the [Text](/components/Text) component
- Numeric cells should use the numeric style with the [Text](/components/Text) component

Index tables can optionally:

- Provide bulk actions for tasks that are often applied to many list items at once. For example, merchants may want to add the same tag to a large number of products.
- Hide bulk actions on small screens using the `condensed` prop. We only recommend hiding bulk actions on screens smaller than 490px using our `breakpoints-sm` value: `condensed={useBreakpoints().smDown}`.
  - Hiding bulk actions means a merchant can’t select multiple items at once, so it should only be used when the bulk actions are not essential to the merchant’s workflow.

---

## Content guidelines

Index tables should:

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

- Follow the [content guidelines for filter options and applied filters](/components/Filters#content-guidelines)

---

## IndexTableRow

An `IndexTableRow` is used to render a row representing an item within an `IndexTable`

### IndexTableRow properties

| Prop                | Type                                                          | Description                                                                                                                                                                                         |
| ------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                  | string                                                        | A unique identifier for the row                                                                                                                                                                     |
| selected?           | boolean &#124; "indeterminate"                                | A boolean property indicating whether the row or it's related rows are selected                                                                                                                     |
| position            | number                                                        | The zero-indexed position of the row. Used for Shift key multi-selection as well as selection of a range of rows when a `selectionRange` is set.                                                    |
| tone?               | "subdued" &#124; "success" &#124; "warning" &#124; "critical" | Whether the row should visually indicate its status with a background color                                                                                                                         |
| disabled?           | boolean                                                       | Whether the row should be disabled                                                                                                                                                                  |
| selectionRange?     | [number, number]                                              | A tuple array with the first and last index of the range of other rows that the row describes. All non-disabled rows in the range are selected when the row with a selection range set is selected. |
| rowType?            | "data" &#124; "subheader" &#124; "child"                      | Indicates the relationship or role of the row's contents. A `rowType` of "subheader" looks and behaves the same as the table header. Rows of type "child" are indented. Defaults to "data".         |
| accessibilityLabel? | string                                                        | Label set on the row's checkbox. Defaults to "Select \{resourceName\}"                                                                                                                              |

### IndexTableRow slots

| Prop                | Type                                                          | Description                                                                                                                                                                                         |
| ------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| default            | VueNode                                                     | Table header or data cells                                                                                                                                                                          |

### IndexTableRow events

| Prop                | Type                                                          | Description                                                                                                                                                                                         |
| ------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| @click            | () => void                                                    | Callback fired when the row is clicked. Overrides the default click behaviour.                                                                                                                      |
| @navigation       | (id: string) => void                                          | Callback fired when the row is clicked and contains an anchor element with the `data-primary-link` property set

## IndexTableCell

An `IndexTableCell` is used to render a single cell within an `IndexTableRow`

### IndexTableCell properties

| Prop       | Type                                                                              | Description                                                                                                                                                              |
| ---------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| as?        | 'th' &#124; 'td'                                                                  | The table cell element to render. Render the cell as a `th` if it serves as a subheading. Defaults to `td`.                                                              |
| id?        | string                                                                            | The unique ID to set on the cell element                                                                                                                                 |
| className? | string                                                                            | Adds a class to the cell. Use to set a custom cell width.                                                                                                                |
| flush?     | boolean                                                                           | Whether the cell padding should be removed. Defaults to false.                                                                                                           |
| colSpan?   | [HTMLTableCellElement['colSpan']](https://www.w3schools.com/tags/att_colspan.asp) | For subheader cells -- The number of the columns that the cell element should extend to within the row.                                                                  |
| scope?     | [HTMLTableCellElement['scope']](https://www.w3schools.com/tags/att_scope.asp)     | For subheader cells -- Indicates the cells that the `th` element relates to                                                                                              |
| headers?   | [HTMLTableCellElement['headers']](https://www.w3schools.com/tags/att_headers.asp) | A space-separated list of the `th` cell IDs that describe or apply to it. Use for cells within a row that relate to a subheader cell in addition to their column header. |

### IndexTableCell slots

| Prop       | Type                                                                              | Description                                                                                                                                                              |
| ---------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| default?  | VueNode                                                                         | The cell contents                                                                                                                                                        |

---

## Related components

- To create an actionable list of related items that link to details pages, such as a list of customers, use the [resource list component](/components/ResourceList)
- To present structured data for comparison and analysis, like when helping merchants to gain insights or review analytics, use the [data table component](/components/DataTable)
- To display a simple list of related content, [use the list component](/components/List)

---

## Accessibility

### Structure

The `IndexTable` is an actionable, filterable, and sortable table widget that supports row selection with [subheaders](https://www.w3.org/WAI/tutorials/tables/multi-level/). To ensure that the power of this table is accessible to all merchants when implementing `IndexTableRow` subheaders, set the following props on `IndexTableCell` that are appropriate for the enhancement you are implementing.

Merchants can select a group of rows at once by clicking or <kbd>Space</kbd> keypressing a subheader row's checkbox. To indicate that an `IndexTableRow` serves as a subheader for 1 or more rows below it, set the:

- Zero-indexed table `position` of the first and last `IndexTableRow` described by the subheader `IndexTableRow` as a tuple array on its `selectionRange` prop
- Unique `id` on the `IndexTableCell` that contains the subheader content
- Element tag to `"th"` on the `as` prop of the subheader `IndexTableCell`
- Subheader `IndexTableCell` `scope` prop to `"colgroup"`

To associate the subheader `IndexTableRow` with each `IndexTableCell` that it describes, set the:

- Unique `id` provided to the subheader `IndexTableCell` on the `headers` prop of each related `IndexTableCell` (contained by an `IndexTableRow` that's position is within the `selectionRange`) as well as the unique `id` of its corresponding column heading that you provided to the `IndexTable` `headings` prop

### Keyboard support

`IndexTable` also supports multi-selection of a range of rows by keypressing the <kbd>Shift</kbd> key. To select a range, press and hold the <kbd>Shift</kbd> key while you click or keypress the <kbd>Space</kbd> key on a row checkbox and then do the same on another row's checkbox. All selectable rows between the selected checkboxes will also be selected.

</div>
