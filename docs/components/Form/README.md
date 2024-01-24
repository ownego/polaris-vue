---
layout: doc
title: Form
category: Selection and input
examples:
  - fileName: FormSubmit.vue
    frameHeight: 350
    title: Custom onSubmit
    description: Use onSubmit as a callback for when your form is submitted.
  - fileName: WithoutValidation.vue
    frameHeight: 350
    title: Without native validation
    description: Use in forms to toggle native form validation.
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

<EventsTable />

<div style="font-size: 0.8125rem">

## Best practices

The form component should be used to:

- Wrap around all form input elements
- Emulate the native HTML `form` element behavior with a custom `onSubmit` callback

---

## Related components

- To arrange fields within a form using standard spacing, [use the form layout component](/components/FormLayout)
- To see all of the components that make up a form, [visit the form section](/components/Checkbox#navigation) of the component library

---

## Accessibility

The form component wraps content in an HTML `<form>` element. This helps to support assistive technologies that use different interaction and browse modes.

Forms can have only one submit button and it must be at the end of the form. By default, buttons added to the form are given a `type` attribute set to `button` to avoid conflicts. To make a button the submit button instead (`type="submit"`), set the `submit` prop on the button.

### Keyboard support

By default, the `implicitSubmit` prop is set to `true`. This allows merchants to submit the form with the <kbd>enter</kbd>/<kbd>return</kbd> key when focus is in any text field inside the form. This provides a shortcut for keyboard users. If this behavior doesn't fit the form, then set the prop to `false`.

</div>
