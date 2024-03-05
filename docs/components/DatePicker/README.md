---
layout: doc
title: Date picker
category: Selection and input
examples:
  - fileName: Default.vue
    title: Default
    description: Use when merchants need to select a single day close to today (today is the default starting position for the date picker).
  - fileName: Ranged.vue
    title: Ranged
    description: Use when merchants need to select a range of days close to today (today is the default starting position for the date picker).
  - fileName: MultiMonthRanged.vue
    title: Multi-month ranged
    description: Use multi-month mode to show two months at a time.
  - fileName: WithDisabledDates.vue
    title: With disabled date ranges
    description: Date ranges may be disabed if you do not want them to be selectable
  - fileName: WithSpecificDisabledDates.vue
    title: With specific disabled dates
    description: Dates may be disabed if you do not want them to be selectable
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

<EventsTable />

<br/>

::: tip :grey_exclamation: Tip

Check out the [new patterns section](/patterns/date-picking) to learn how merchants prefer to select dates in different scenarios!

:::

<div style="font-size: 0.8125rem">

## Best practices

Date pickers should:

- Use smart defaults and highlight common selections
- Close after a single date is selected unless a range with a start and end date is required
- Set the start date on first click or tap and the end date on second click or tap if a range is required
- Not be used to enter a date that is many years in the future or the past
- Follow [date format guidelines](https://polaris.shopify.com/content/grammar-and-mechanics#dates--numbers--and-measurements)

---

## Accessibility

Some users might find interacting with date pickers to be challenging. When you use the date picker component, always give users the option to enter the date using a text field component as well.

If you use the date picker within a [popover component](/components/Popover), then use a button to trigger the popover instead of displaying the popover when the text input gets focus. This gives users more control over their experience.

### Keyboard support

- Press the <kbd>tab</kbd> key to move forward and <kbd>shift</kbd> + <kbd>tab</kbd> to move backward through the previous button, next button, and the calendar
- When focus is in the calendar, move keyboard focus between the dates using the arrow keys
- To select a date that has focus, press the <kbd>enter</kbd>/<kbd>return</kbd> key

## Related patterns

- [Date picking](/patterns/date-picking)

</div>
