<template lang="pug">
div(
  :id="id",
  :class="styles.DatePicker",
  @keydown="handleKeyDown",
  @keyup="handleKeyUp",
)
  div(:class="styles.Header")
    Button(
      plain,
      :icon="ArrowLeftMinor",
      :accessibilityLabel="previousMonthAccessibilityLabel",
      @click="handleMonthChangeClick(showPreviousMonth, showPreviousYear)"
    )
    Button(
      plain,
      :icon="ArrowRightMinor",
      :accessibilityLabel="nextMonthAccessibilityLabel",
      @click="handleMonthChangeClick(showNextMonth, showNextYear)",
    )
  div(:class="styles.MonthLayout")
    Month(
      :focusedDate="focusDate",
      :month="month",
      :year="year",
      :selected="deriveRange(modelValue)",
      :hoverDate="hoverDate",
      :disableDatesBefore="disableDatesBefore",
      :disableDatesAfter="disableDatesAfter",
      :allowRange="allowRange",
      :weekStartsOn="weekStartsOn",
      :accessibilityLabelPrefixes="accessibilityLabelPrefixes",
      @change="handleDateSelection",
      @hover="handleHover",
      @focus="handleFocus",
    )
    Month(
      v-if="multiMonth",
      :focusedDate="focusDate",
      :month="showNextMonth",
      :year="showNextYear",
      :selected="monthIsSelected",
      :hoverDate="hoverDate",
      :disableDatesBefore="disableDatesBefore",
      :disableDatesAfter="disableDatesAfter",
      :allowRange="allowRange",
      :weekStartsOn="weekStartsOn",
      :accessibilityLabelPrefixes="accessibilityLabelPrefixes",
      @change="handleDateSelection",
      @hover="handleHover",
      @focus="handleFocus",
    )
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  isDateAfter,
  isDateBefore,
  getNextDisplayYear,
  getNextDisplayMonth,
  getPreviousDisplayYear,
  getPreviousDisplayMonth,
} from 'polaris/polaris-react/src/utilities/dates';
import type { Range } from 'polaris/polaris-react/src/utilities/dates';
import ArrowLeftMinor from '@icons/ArrowLeftMinor.svg';
import ArrowRightMinor from '@icons/ArrowRightMinor.svg';
import styles from '@/classes/DatePicker.json';
import { Month } from './components';
import { Button } from '../Button';
import { transformedDate, monthName } from './utils';

interface Props {
  /** ID for the element */
  id?: string;
  /** The selected date or range of dates */
  modelValue?: Range;
  /** The month to show, from 0 to 11. 0 is January, 1 is February ... 11 is December */
  month: number;
  /** The year to show */
  year: number;
  /** Allow a range of dates to be selected */
  allowRange?: boolean;
  /** Disable selecting dates before this. */
  disableDatesBefore?: Date;
  /** Disable selecting dates after this. */
  disableDatesAfter?: Date;
  /** The selection can span multiple months */
  multiMonth?: boolean;
  /**
   * First day of week, from 0 to 6. 0 is Sunday, 1 is Monday ... 6 is Saturday
   * @default 0
   */
  weekStartsOn?: number;
  /** Visually hidden prefix text for selected days on single selection date pickers */
  dayAccessibilityLabelPrefix?: string;
}

const props = withDefaults(defineProps<Props>(), {
  weekStartsOn: 0,
});

const emits = defineEmits<{
  (event: 'month-change', value: { month: number, year: number }): void,
  (event: 'change', value: Range | null): void,
  (event: 'update:modelValue', value: Range | Date): void,
}>();

const focusDate= ref<Date>();
const hoverDate = ref<Date>();

const showNextYear = computed(() => {
  return getNextDisplayYear(props.month, props.year);
});

const showNextMonth = computed(() => {
  return getNextDisplayMonth(props.month);
});

const showNextToNextYear = computed(() => {
  return getNextDisplayYear(showNextMonth.value, showNextYear.value);
});

const showNextToNextMonth = computed(() => {
  return getNextDisplayMonth(showNextMonth.value);
});

const showPreviousYear = computed(() => {
  return getPreviousDisplayYear(props.month, props.year);
});

const showPreviousMonth = computed(() => {
  return getPreviousDisplayMonth(props.month);
});

const previousMonthName = computed(() => {
  const name = monthName(showPreviousMonth.value);
  return name ? transformedDate.months[name] : '';
});

const nextMonth = computed(() => {
  if (props.multiMonth) {
    const month = monthName(showNextToNextMonth.value);
    return month ? transformedDate.months[month] : '';
  }

  const name = monthName(showNextMonth.value);
  return name ? transformedDate.months[name] : '';
});

const nextYear = computed(() => {
  return props.multiMonth ? showNextToNextYear.value : showNextYear.value;
});

const monthIsSelected = computed(() => {
  return deriveRange(props.modelValue);
});

const firstDatePickerAccessibilityLabelPrefix = computed(() => {
  return props.allowRange
    ? 'Start of range'
    : props.dayAccessibilityLabelPrefix;
});

const secondDatePickerAccessibilityLabelPrefix = 'End of range';

const accessibilityLabelPrefixes = computed((): [string | undefined, string] => {
  return [
    firstDatePickerAccessibilityLabelPrefix.value,
    secondDatePickerAccessibilityLabelPrefix,
  ];
});

const previousMonthAccessibilityLabel = computed(() => {
  return `Show previous month, ${previousMonthName.value} ${showPreviousYear.value}`;
});

const nextMonthAccessibilityLabel = computed(() => {
  return `Show next month, ${nextMonth.value} ${nextYear.value}`;
});

const onMonthChange = (month: number, year: number) => {
  /**
  * Callback when month is changed
  */
  emits('month-change', { month, year });
}

const handleMonthChangeClick = (month: number, year: number) => {
  focusDate.value = undefined;
  onMonthChange(month, year);
}

const handleFocus = (date: Date | null) => {
  focusDate.value = date || undefined;
}

const handleHover = (date: Date | null) => {
  hoverDate.value = date || undefined;
}

const setFocusDateAndHandleMonthChange = (date: Date) => {
  onMonthChange(date.getMonth(), date.getFullYear());
  hoverDate.value = date;
  focusDate.value = date;
}

const handleDateSelection = (range: Range | null) => {
  if (range) {
    const { end } = range;
    hoverDate.value = end;
    focusDate.value = new Date(end);

    emits('update:modelValue', range);
  }

  /**
  * Callback when date is selected
  */
  emits('change', range);
}

const handleKeyUp = (event: KeyboardEvent) => {
  const { key } = event;

  const range = deriveRange(props.modelValue);
  const focusedDate = focusDate.value || (range && range.start);

  if (!focusedDate) {
    return;
  }

  if (key === 'ArrowUp') {
    const previousWeek = new Date(focusedDate);
    previousWeek.setDate(focusedDate.getDate() - 7);
    if (
      !(
        props.disableDatesBefore && isDateBefore(previousWeek, props.disableDatesBefore)
      )
    ) {
      setFocusDateAndHandleMonthChange(previousWeek);
    }
  }

  if (key === 'ArrowDown') {
    const nextWeek = new Date(focusedDate);
    nextWeek.setDate(focusedDate.getDate() + 7);
    if (!(props.disableDatesAfter && isDateAfter(nextWeek, props.disableDatesAfter))) {
      setFocusDateAndHandleMonthChange(nextWeek);
    }
  }

  if (key === 'ArrowRight') {
    const tomorrow = new Date(focusedDate);
    tomorrow.setDate(focusedDate.getDate() + 1);
    if (!(props.disableDatesAfter && isDateAfter(tomorrow, props.disableDatesAfter))) {
      setFocusDateAndHandleMonthChange(tomorrow);
    }
  }

  if (key === 'ArrowLeft') {
    const yesterday = new Date(focusedDate);
    yesterday.setDate(focusedDate.getDate() - 1);
    if (
      !(props.disableDatesBefore && isDateBefore(yesterday, props.disableDatesBefore))
    ) {
      setFocusDateAndHandleMonthChange(yesterday);
    }
  }
}

const handleKeyDown = (event: KeyboardEvent) => {
  const { key } = event;

  if (
    key === 'ArrowUp'
    || key === 'ArrowDown'
    || key === 'ArrowLeft'
    || key === 'ArrowRight'
  ) {
    event.preventDefault();
    event.stopPropagation();
  }
}

function deriveRange(selected?: Range) {
  return selected instanceof Date
    ? { start: selected, end: selected }
    : selected;
}
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/DatePicker/DatePicker.scss';
</style>
