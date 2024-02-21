---
layout: doc
title: Data table
category: Tables
examples:
  - fileName: Default.vue
    title: Default
    description: Use to present small amounts of data for merchants to view statically.
  - fileName: Sortable.vue
    title: Sortable
    description: Use when clarity of the table’s content is needed. For example, to note the number of rows currently shown in a data table with pagination.
  - fileName: WithFooter.vue
    title: With footer
    description: Use when clarity of the table’s content is needed. For example, to note the number of rows currently shown in a data table with pagination.
  - fileName: WithCustomTotalsHeading.vue
    title: With custom totals heading
    description: Use to provide a custom heading for the totals row.
  - fileName: WithTotalsInFooter.vue
    title: With totals in footer
    description: Use to reposition the totals row in a more appropriate location based on the data stored in the table for merchants to better understand its meaning.
  - fileName: WithRowHeadingLinks.vue
    title: With row heading links
    description: Use to help merchants find relevant, finer grained data sets.
  - fileName: AllElements.vue
    title: With all of its elements
    description: Use as a broad example that includes most props available to data table.
  - fileName: WithFixedFirstColumns.vue
    frameHeight: 560
    title: With fixed first columns
    description:
      Use when the table contains many columns and it would benefit the merchant to see a set number of columns when scrolling to the right. For example, the first column in the "Sales by Product" report table is fixed because the product names are important to reference while analyzing the sales data in other columns.
      When fixing multiple columns, ensure other data within the table is visible and not limited on smaller screens.
  - fileName: ZebraStriping.vue
    title: With increased density and zebra striping
    description: Use as a broad example that includes most props available to data table.
  - fileName: StickyHeader.vue
    frameHeight: 560
    title: With sticky header enabled
    description: Use as a broad example that includes most props available to data table.
  - fileName: WithPagination.vue
    title: With pagination
    description: Use when the table contains many rows and they need paginating.
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

## Events

<EventsTable typeFile="DataTableEvents" />

<div style="font-size: 0.8125rem">

## Best practices

Data tables should:

- Show values across multiple categories and measures.
- Allow for filtering and ordering when comparison is not a priority.
- Help merchants visualize and scan many values from an entire data set.
- Help merchants find other values in the data hierarchy through use of links.
- Minimize clutter by only including values that supports the data’s purpose.
- Include a summary row to surface the column totals.
- Not include calculations within the summary row.
- Wrap instead of truncate content. This is because if row titles start with the same word, they’ll all appear the same when truncated.
- Not to be used for an actionable list of items that link to details pages. For this functionality, use the [resource list component](/components/ResourceList).

### Alignment

Column content types are built into the component props so the following alignment rules are followed:

- Numerical = Right aligned
- Textual data = Left aligned
- Align headers with their related data
- Don’t center align

---

## Content guidelines

Headers should:

- Be informative and descriptive
- Concise and scannable
- Include units of measurement symbols so they aren’t repeated throughout the columns
- Use sentence case (first word capitalized, rest lowercase)

<DoDont>

#### Do

Temperature °C

#### Don’t

Temperature

</DoDont>

Column content should:

- Be concise and scannable
- Not include units of measurement symbols (put those symbols in the headers)
- Use sentence case (first word capitalized, rest lowercase)

### Decimals

Keep decimals consistent. For example, don’t use 3 decimals in one row and 2 in others.

---

## Related components

- To create an actionable list of related items that link to details pages, such as a list of customers, use the [resource list component](/components/ResourceList).

---

## Accessibility

### Structure

Native HTML tables provide a large amount of structural information to screen reader users. Merchants who rely on screen readers can navigate tables and identify relationships between data cells (`<td>`) and headers (`<th>`) using keys specific to their screen reader.

Sortable tables use the `aria-sort` attribute to convey which columns are sortable (and in what direction). They also use `aria-label` on sorting buttons to convey what activating the button will do.

<DoDont>

#### Do

Use tables for tabular data.

#### Don’t

Use tables for layout. For a table-like layout that doesn’t use table HTML elements, use the [resource list component](/components/ResourceList).

</DoDont>

### Keyboard support

Sorting controls for the data table component are implemented with native HTML buttons.

- Give buttons keyboard focus with the <kbd>tab</kbd> key (or <kbd>shift</kbd> + <kbd>tab</kbd> when tabbing backwards)
- Activate buttons with the <kbd>enter</kbd>/<kbd>return</kbd> and <kbd>space</kbd> keys

</div>
