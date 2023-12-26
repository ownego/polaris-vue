---
layout: doc
title: Link
category: Navigation
examples:
  - fileName: Default.vue
    title: Default links
    description: Use for text links inside a paragraph or for standalone text. Default links open in the same browser tab.
  - fileName: Monochrome.vue
    title: Monochrome
    description: Use for text links that are the same color as the surrounding text.
  - fileName: MonochromeBanner.vue
    title: Monochrome in a banner
    description: Monochrome styles will be applied to links rendered within a `Banner`.
  - fileName: External.vue
    title: External link
    description: Use for text links that should open in a new browser tab (or window, depending on the merchant’s browser settings). Use this only when a default link might disrupt the merchant’s workflow.
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

## Best practices

### Buttons versus links

Links are used primarily for navigation, and usually appear within or directly following a sentence.

Buttons are used primarily for actions, such as “Add”, “Close”, “Cancel”, or “Save”. Plain buttons, which look similar to links, are used for less important or less commonly used actions, such as “view shipping settings”.

The HTML that renders for the `Button` and `Link` components carries meaning. Using these components intentionally and consistently results in:

- a more inclusive experience for assistive technology users
- a more cohesive visual experience for sighted users
- products that are easier to maintain at scale

### Open a new tab only when necessary

Use default links whenever possible to avoid disorienting merchants and causing accessibility problems by opening a new tab.

External links should be used when merchants are:

- Performing a task or workflow, like creating a product
- Navigating to a page outside of the Shopify admin

### No icon

Avoid using the [external icon](/icons?icon=ExternalMinor&q=external), as it can add unnecessary visual load inside a sentence or when accompanied by other content. Instead, add clarity to external links through clear link text and predictable placement of the link in a merchant’s workflow.

Edge cases: External icons should not be used to indicate a new tab or window is being opened. However, they may be used sparingly in features where symbols help merchants scan and pick from a list of several kinds of navigation options, like the admin's global search results.

### Keyboard support

Links use browser defaults for keyboard interaction.

- Give links keyboard focus with the <kbd>tab</kbd> key (or <kbd>shift</kbd> + <kbd>tab</kbd> when tabbing backwards)
- Activate links with the <kbd>enter</kbd>/<kbd>return</kbd> key

