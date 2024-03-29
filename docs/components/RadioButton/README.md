---
layout: doc
title: Radio button
category: Selection and input
examples:
  - fileName: Default.vue
    frameHeight: 280
    title: Default
    description: Use radio buttons where merchants must make a single selection.
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

<EventsTable typeFile="RadioButtonEvents" />

<div style="font-size: 0.8125rem">

## Best practices

Radio buttons should:

- Always be used with an associated label component.
- Be part of a list of radio buttons that:
  - Include at least two or more choices.
  - Are used to have merchants select only one option.
  - Include mutually exclusive options—this means that each option must be
    independent from every other option in the list. For example: Red, blue, and
    yellow are mutually exclusive. Red, blue, yellow, red/blue are not mutually
    exclusive.
  - List options in a rational order that makes logical sense.
  - Have a default option selected whenever possible.

---

## Content guidelines

### Radio button labels

Radio button labels should:

- Be introduced with a colon or a heading
- Start with a capital letter

<DoDont>

#### Do

- Option 1

#### Don’t

- option 1

</DoDont>

- Not end in punctuation if it’s a single sentence, word, or a fragment

<DoDont>

#### Do

- Red

#### Don’t

- Red;

</DoDont>

### Toggle (Android and iOS only)

Toggle labels should:

- Be clear what merchants are enabling or disabling
- Start with a capital letter

Toggle values should:

- Never be labeled

---

## Related components

- To make simple lists of radio buttons easier to build, [use the choice list component](/components/ChoiceList)
- For long lists of options, [consider the select component](/components/Select) to avoid overwhelming merchants
- To present merchants with a list of checkboxes, [use the choice list component](/components/ChoiceList) with the “allow multiple” option
- To display non-interactive list of related content, [use the content list component](/components/List)

---

## Accessibility

Screen readers convey the state of the radio button automatically.

- Use the `disabled` prop to apply the HTML `disabled` attribute to the radio button `<input>`. This prevents merchants from being able to interact with the radio button, and conveys its inactive state to assistive technologies.
- Use the `id` prop to provide a unique `id` attribute value for the radio button. If an `id` isn’t provided, then the component generates one. All radio buttons must have unique `id` values to work correctly with assistive technologies.

### Labeling

- The required `label` prop conveys the purpose of the radio button to all merchants
- Use the `labelHidden` prop to visually hide the label but make it available to assistive technologies
- When you provide help text via the `helpText` prop or an inline error message via the `error` prop, the help or error content is conveyed to screen reader users with the `aria-describedby` attribute

### Keyboard support

- Move focus to the radio button group using the <kbd>tab</kbd> key (or <kbd>shift</kbd> + <kbd>tab</kbd> when tabbing backwards)
- Use the up and down arrow keys to change which radio button is selected

</div>
