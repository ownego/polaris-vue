---
layout: doc
title: Icon
category: Images and icons
examples:
  - fileName: Default.vue
    frameHeight: 250
    title: Default
    description: >-
      Use to visually communicate core parts of the product and available actions.
  - fileName: Colored.vue
    frameHeight: 250
    title: Colored
    description: >-
      Apply a color to the icon.
  - fileName: CustomSvg.vue
    frameHeight: 250
    title: With custom SVG
    description: >-
      Specify an SVG as a string to render it in an image tag, instead of an inline SVG to prevent script injection.
  - fileName: CustomSvgColor.vue
    frameHeight: 250
    title: With custom SVG and color
    description: >-
      When using changing color of an svg and it uses currentColor, the white color is applied.
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

## Accessibility

Using icons can be a great help to merchants who have difficulties with reading, language, attention, and low vision.

If the icon appears without text, then use the `accessibilityLabel` prop to give the icon a text alternative. This adds an `aria-label` that’s conveyed to screen reader users.

<DoDont>

#### Do

- Pair text and icons for clarity
- Give the icon a text equivalent if its purpose isn’t conveyed in another way
- Review our [alternative text](https://polaris.shopify.com/content/alternative-text) guidelines to make sure your use of icon works for all merchants

```html
<Icon :source="OrdersMajor" />
<p>No orders yet</p>
```

```html
<Button :icon="CirclePlusMinor">Add a product</Button>
```

#### Don’t

- Describe what the icon looks like
- Include “icon” in the text equivalent
- Duplicate adjacent text in the alternative text
- Duplicate information provided programmatically

```html
<Icon :source="CirclePlusMinor" accessibilityLabel="Circle plus icon" />
```

</DoDont>

---

## Related guidelines

- To learn about implementing Polaris icons with [Polaris React](https://github.com/Shopify/polaris-react) in your projects, see the [`@shopify/polaris-icons` documentation](https://www.npmjs.com/package/@shopify/polaris-icons)
- To learn about the best practices for designing and using icons in your projects, see the [icon design guidelines](https://polaris.shopify.com/design/icons)
- To learn how to name icons, see the [icon naming guidelines](https://polaris.shopify.com/content/naming#icons)

</div>
