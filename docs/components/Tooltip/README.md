---
layout: doc
title: Tooltip
category: Overlays
examples:
  - fileName: Default.vue
    frameHeight: 250
    title: Default
    description: Use only when necessary to provide an explanation for an interface element.
  - fileName: ChildInteract.vue
    frameHeight: 250
    title: Visible only with child interaction
    description: Use when the tooltip overlays interactive elements when active, for example a form input. The `dismissOnMouseOut` prop prevents the tooltip from remaining active when mouse hover or focus leaves its `children` and enters the tooltip's content.
  - fileName: PersistentOnClick.vue
    frameHeight: 250
    title: With persistence on click
    description: Use to present a tooltip that remains open if activated by click or keypress.
  - fileName: Suffix.vue
    frameHeight: 250
    title: With suffix
    description: Use when merchants benefit from information supplemental to the tooltip content. For example, to present a keyboard shortcut beside the content of a tooltip that describes an icon button.
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

Tooltips should:

- Provide useful, additional information or clarification.
- Succinctly describe or expand on the element they point to.
- Be provided for icon-only buttons or a button with an associated keyboard shortcut.
- Not be used to communicate critical information, including errors in forms or other interaction feedback.
- Not contain any links or buttons.
- Be used sparingly. If you’re building something that requires a lot of tooltips, work on clarifying the design and the language in the experience.

---

## Content guidelines

### Basic tooltips

Tooltips should:

- Be written in sentence case
- Be concise and scannable
- Not be used to communicate error messages or important account information

<DoDont>

#### Do

Post reach is the number of people who have seen your post in their News Feed.

#### Don’t

To continue using Shopify, this amount must be paid immediately.

</DoDont>

---

## Related components

- To make helpful content more visible to merchants, use the help text portions of form components such as [text fields](/components/TextField), [footer help](/components/FooterHelp), or [an inline link to help](/components/Link)

</div>
