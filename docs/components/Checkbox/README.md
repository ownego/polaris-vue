---
layout: doc
title: Checkbox
category: Selection and input
examples:
  - fileName: Default.vue
    frameHeight: 250
    title: Default
    description: Use in forms to toggle the state of something on or off. Default checkboxes can appear as selected and disabled, or unselected.
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

Checkboxes should:

- Work independently from each other. Selecting one checkbox shouldn’t change the selection status of another checkbox in the list. The exception is when a checkbox is used to make a bulk selection of multiple items.
- Be framed positively. For example, say “Publish store” instead of “Hide store”.
- Always have a label when used to activate or deactivate a setting.
- Be listed according to a logical order, whether it’s alphabetical, numerical, time-based, or some other clear system.
- Link to more information or include a subtitle as required to provide more explanation. Don’t rely on tooltips to explain a checkbox.

---

## Content guidelines

### Lists with checkboxes

Lists that use checkboxes should:

- Start with a capital letter

<DoDont>

#### Do

- Option 1
- Option 2
- Option 3

#### Don’t

- option 1
- option 2
- option 3

</DoDont>

- Not use commas or semicolons at the end of each line

<DoDont>

#### Do

- Red
- Yellow
- Blue

#### Don’t

- Red;
- Yellow;
- Blue.

</DoDont>

- In the rare case where the checkbox is asking merchants to agree to terms or service, use the first person

<DoDont>

#### Do

I agree to the Terms of Service.

#### Don’t

You agree to the Terms of Service

</DoDont>

---

## Related components

- To present a list of options where merchants can only make a single choice, [use the radio button component](/components/RadioButton)
- To display a list of related content, [use the choice list component](/components/ChoiceList)
- To create an ungrouped list, [use the content list component](/components/List)

---

## Accessibility

Screen readers convey the state of the checkbox automatically.

- Use the `disabled` prop to apply the HTML `disabled` attribute to the checkbox `<input>`. This prevents merchants from being able to interact with the checkbox, and conveys its inactive state to assistive technologies.
- Use the `id` prop to provide a unique `id` attribute value for the checkbox. If an `id` isn’t provided, then the component generates one. All checkboxes must have unique `id` values to work correctly with assistive technologies.
- Setting `checked="indeterminate"` conveys the state of the checkbox using `aria-checked="mixed"`.
- Setting the `ariaControls` prop conveys the ID of the element whose contents or presence are controlled by the checkbox to screen reader users with the `aria-controls` attribute.

### Labeling

- The required `label` prop conveys the purpose of the checkbox to all merchants
- Use the `labelHidden` prop to visually hide the label but make it available to assistive technologies
- When you provide help text via the `helpText` prop or an inline error message via the `error` prop, the help or error content is conveyed to screen reader users with the `aria-describedby` attribute

### Keyboard support

- Move focus to each checkbox using the <kbd>tab</kbd> key (or <kbd>shift</kbd> + <kbd>tab</kbd> when tabbing backwards)
- To interact with the checkbox when it has keyboard focus, press the <kbd>space</kbd> key

</div>
