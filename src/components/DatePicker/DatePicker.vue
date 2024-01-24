<template lang="pug">
div(
  :id="id",
  :class="datePickerClassName",
  @keydown="handleKeyDown",
  @keyup="handleKeyUp",
)
  div(:class="styles.Header")
    Button(
      variant="tertiary",
      :icon="ArrowLeftMinor",
      :accessibility-label="i18n.translate('Polaris.DatePicker.previousMonth', { previousMonthName, showPreviousYear })",
      @click="() => handleMonthChangeClick(showPreviousMonth, showPreviousYear)",
    )
    Button(
      variant="tertiary",
      :icon="ArrowRightMinor",
      :accessibility-label="i18n.translate('Polaris.DatePicker.nextMonth', { nextMonth, nextYear })",
      @click="() => handleMonthChangeClick(showNextMonth, showNextYear)",
    )
  div(:class="styles.MonthLayout")
    Month(
      :focused-date="focusDate",
      :month="month",
      :year="year",
      :selected="deriveRange(model)",
      :hover-date="hoverDate",
      :disable-dates-before="disableDatesBefore",
      :disable-dates-after="disableDatesAfter",
      :disable-specific-dates="disableSpecificDates",
      :allow-range="allowRange",
      :week-starts-on="weekStartsOn",
      :accessibility-label-prefixes="accessibilityLabelPrefixes",
      @change="handleDateSelection",
      @hover="handleHover",
      @focus="handleFocus",
    )
    Month(
      v-if="multiMonth",
      :focused-date="focusDate",
      :month="showNextMonth",
      :year="showNextYear",
      :selected="deriveRange(model)",
      :hover-date="hoverDate",
      :disable-dates-before="disableDatesBefore",
      :disable-dates-after="disableDatesAfter",
      :disable-specific-dates="disableSpecificDates",
      :allow-range="allowRange",
      :week-starts-on="weekStartsOn",
      :accessibility-label-prefixes="accessibilityLabelPrefixes",
      @change="handleDateSelection",
      @hover="handleHover",
      @focus="handleFocus",
    )
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { classNames } from '@/utilities/css';
import {
  isDateAfter,
  isDateBefore,
  getNextDisplayYear,
  getNextDisplayMonth,
  getPreviousDisplayYear,
  getPreviousDisplayMonth,
  isDateDisabled,
  type Range,
} from '@polaris/utilities/dates';
import useI18n from '@/use/useI18n';
import { Button } from '@/components';
import { monthName } from '@polaris/components/DatePicker/utilities';
import { Month } from './components';
import styles from '@polaris/components/DatePicker/DatePicker.module.scss';
import ArrowLeftMinor from '@icons/ArrowLeftMinor.svg';
import ArrowRightMinor from '@icons/ArrowRightMinor.svg';

export type DatePickerProps = {
  /** ID for the element */
  id?: string;
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
  /** Disable specific dates. */
  disableSpecificDates?: Date[];
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

type DatePickerEvents = {
  /** Callback when date is selected. */
  'change': [date: Range];
  /** Callback when month is changed. */
  'month-change': [month: number, year: number];
}

const props = withDefaults(defineProps<DatePickerProps>(), {
  weekStartsOn: 0,
});
const emits = defineEmits<DatePickerEvents>();

const i18n = useI18n();

const model = defineModel<Range | Date>();

const hoverDate = ref<Date>();
const focusDate = ref<Date>();

const showNextYear = computed(() => getNextDisplayYear(props.month, props.year));
const showNextMonth = computed(() => getNextDisplayMonth(props.month));

const showNextToNextYear = computed(() => getNextDisplayYear(showNextMonth.value, showNextYear.value));
const showNextToNextMonth = computed(() => getNextDisplayMonth(showNextMonth.value));

const showPreviousYear = computed(() => getPreviousDisplayYear(props.month, props.year));
const showPreviousMonth = computed(() => getPreviousDisplayMonth(props.month));

const previousMonthName = computed(() => i18n.translate(
  `Polaris.DatePicker.months.${monthName(showPreviousMonth.value)}`,
));

const nextMonth = computed(() => {
  if (props.multiMonth) {
    return i18n.translate(
      `Polaris.DatePicker.months.${monthName(showNextToNextMonth.value)}`,
    );
  }

  return i18n.translate(
    `Polaris.DatePicker.months.${monthName(showNextMonth.value)}`,
  );
});

const nextYear = computed(() => {
  if (props.multiMonth) {
    return showNextToNextYear.value;
  }

  return showNextYear.value;
});

const firstDatePickerAccessibilityLabelPrefix = computed(() => {
  if (props.allowRange) {
    return i18n.translate('Polaris.DatePicker.startDate');
  }

  return props.dayAccessibilityLabelPrefix;
});
const secondDatePickerAccessibilityLabelPrefix = i18n.translate('Polaris.DatePicker.end');

const accessibilityLabelPrefixes = computed<[string | undefined, string]>(() => [
  firstDatePickerAccessibilityLabelPrefix.value,
  secondDatePickerAccessibilityLabelPrefix,
]);

const datePickerClassName = classNames(styles.DatePicker);

const handleFocus = (date: Date) => {
  focusDate.value = date;
};

const setFocusDateAndHandleMonthChange = (date: Date) => {
  emits('month-change', date.getMonth(), date.getFullYear());

  hoverDate.value = date;
  focusDate.value = date;
};

const handleDateSelection = (range: Range) => {
  hoverDate.value = range.end;
  focusDate.value = new Date(range.end);

  model.value = range;
  emits('change', range);
};

const handleMonthChangeClick = (month: number, year: number) => {
  focusDate.value = undefined;
  emits('month-change', month, year);
};

const handleHover = (date: Date | null) => {
  hoverDate.value = date || undefined;
};

const handleKeyUp = (event: KeyboardEvent) => {
  const { key } = event;

  const range = deriveRange(model.value);
  const focusedDate = focusDate.value || (range && range.start);

  if (!focusedDate) {
    return;
  }

  if (key === 'ArrowUp') {
    const previousWeek = new Date(focusedDate);
    previousWeek.setDate(focusedDate.getDate() - 7);

    if (
      !(
        (props.disableDatesBefore && isDateBefore(previousWeek, props.disableDatesBefore))
        || (props.disableSpecificDates && isDateDisabled(previousWeek, props.disableSpecificDates))
      )
    ) {
      setFocusDateAndHandleMonthChange(previousWeek);
    }
  }

  if (key === 'ArrowDown') {
    const nextWeek = new Date(focusedDate);
    nextWeek.setDate(focusedDate.getDate() + 7);

    if (
      !(
        (props.disableDatesAfter && isDateAfter(nextWeek, props.disableDatesAfter))
        || (props.disableSpecificDates && isDateDisabled(nextWeek, props.disableSpecificDates))
      )
    ) {
      setFocusDateAndHandleMonthChange(nextWeek);
    }
  }

  if (key === 'ArrowRight') {
    const nextDay = new Date(focusedDate);
    nextDay.setDate(focusedDate.getDate() + 1);

    if (
      !(
        (props.disableDatesAfter && isDateAfter(nextDay, props.disableDatesAfter))
        || (props.disableSpecificDates && isDateDisabled(nextDay, props.disableSpecificDates))
      )
    ) {
      setFocusDateAndHandleMonthChange(nextDay);
    }
  }

  if (key === 'ArrowLeft') {
    const previousDay = new Date(focusedDate);
    previousDay.setDate(focusedDate.getDate() - 1);

    if (
      !(
        (props.disableDatesBefore && isDateBefore(previousDay, props.disableDatesBefore))
        || (props.disableSpecificDates && isDateDisabled(previousDay, props.disableSpecificDates))
      )
    ) {
      setFocusDateAndHandleMonthChange(previousDay);
    }
  }
};

const handleKeyDown = (event: KeyboardEvent) => {
  const { key } = event;

  if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowRight' || key === 'ArrowLeft') {
    event.preventDefault();
    event.stopPropagation();
  }
};

function deriveRange(selected?: Date | Range) {
  return selected instanceof Date ? {start: selected, end: selected} : selected;
}
</script>
