---
layout: doc
title: Inline error
category: Selection and input
examples:
  - fileName: Default.vue
    frameHeight: 200
    title: Default
    description: Use when the merchant has entered information that is not valid into multiple fields inside of a form, or needs to be displayed in a non-standard position in the form layout.
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

Inline errors should:

- Be brief
- Be written in sentence case
- Be visible immediately upon a form input that is not valid
- Be removed as soon as the input is valid so merchants can immediately tell they fixed the issue
- Describe specific solutions so merchants can successfully complete their task in the form
- Not be placed out of context of the input or group of inputs they describe

[Learn more about error message patterns](https://polaris.shopify.com/patterns/error-messages#form-validation)

---

## Content guidelines

### Inline error messages

Since the error message is directly below the source of the problem, the copy only needs to explain why the error happened. Optionally, the message can clarify what to do next or offer a one-click fix.

Inline error messages should:

- Clearly explain what went wrong, give a next step, or offer a one-click fix
- Be short and concise, no more than a single sentence
- Use [passive voice](https://polaris.shopify.com/content/grammar-and-mechanics) so merchants don’t feel like they’re being blamed for the error

<DoDont>

#### Do

- Store name is required

#### Don’t

- You didn’t enter a store name.

</DoDont>

---

## Related components

- To create a list of exceptions that describe a resource, [use the exception list component](/components/ExceptionList)

---

## Accessibility

- Use the required `fieldId` prop to give the inline error a unique `id`. This ties the error to a form field using `aria-describedby` so that it's conveyed to screen reader users.
- Use the required `message` prop to provide the text that describes the error.
- The inline error [icon](https://polaris.shopify.com/design/icons) helps visually identify the error message for merchants who have difficulty seeing [colors](https://polaris.shopify.com/design/colors) or who use settings that remove color from the page.

</div>
