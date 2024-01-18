<template lang="pug">
div(:class="styles.MonthContainer")
  table(role="grid", :class="styles.Month")
    caption(:class="className")
      | {{ i18n.translate(`Polaris.DatePicker.months.${monthName(month)}`) }} {{ year }}

    thead
      tr(:class="styles.WeekHeadings")
        {weekdays}

    tbody
      {weeksMarkup}
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { classNames } from '@/utilities/css';
import {
  isDateBefore,
  isDateAfter,
  isSameDay,
  getWeeksForMonth,
  dateIsInRange,
  dateIsSelected,
  getNewRange,
  getOrderedWeekdays,
  isDateDisabled,
  type Range,
} from '@polaris/utilities/dates';
import useI18n from '@/use/useI18n';

import { Day } from '../Day';
import { Weekday } from '../Weekday';
import { monthName, weekdayName } from '@polaris/components/DatePicker/utilities';
import styles from '@polaris/components/DatePicker/DatePicker.module.scss';

export type MonthProps {
  focusedDate?: Date;
  selected?: Range;
  hoverDate?: Date;
  month: number;
  year: number;
  disableDatesBefore?: Date;
  disableDatesAfter?: Date;
  disableSpecificDates?: Date[];
  allowRange?: boolean;
  weekStartsOn: number;
  accessibilityLabelPrefixes: [string | undefined, string];
}

type MonthEvents = {
  'change': [date: Range];
  'hover': [hoverEnd: Date];
  'focus': [date: Date];
}

const props = defineProps<MonthProps>();
const emits = defineEmits<MonthEvents>();

const i18n = useI18n();

const isInHoveringRange = props.allowRange ? hoveringDateIsInRange : () => false;
const now = new Date();
const current = computed(() => (now.getMonth() === props.month && now.getFullYear() === props.year));

const className = computed(() => classNames(
  styles.Title,
  current.value && styles['Month-current'],
));

const weeks = computed(() => getWeeksForMonth(props.year, props.month, props.weekStartsOn));

const lastDayOfMonth = computed(() => {
  return new Date(props.year, (props.month as number) + 1, 0);
});

const rangeIsDifferent = computed(() => !(props.selected && isSameDay(props.selected.start, props.selected.end)));

const isDayDisabled = (day: Date) => {
  return (props.disableDatesBefore && isDateBefore(day, props.disableDatesBefore)) ||
    (props.disableDatesAfter && isDateAfter(day, props.disableDatesAfter)) ||
    (props.disableSpecificDates && isDateDisabled(day, props.disableSpecificDates));
};

const isFirstSelectedDay = (day: Date) => {
  return props.allowRange && props.selected && isDateStart(day, props.selected);
};

const isLastSelectedDay = (day: Date) => {
  return props.allowRange && props.selected
    && (
      (!isSameDay(props.selected.start, props.selected.end) && isDateEnd(day, props.selected))
      || (props.hoverDate
        && isSameDay(props.selected.start, props.selected.end)
        && isDateAfter(props.hoverDate, props.selected.start)
        && isSameDay(day, props.hoverDate)
        && !isFirstSelectedDay(day)
      )
    );
};

const isHoveringRight = (day: Date) => {
  return props.hoverDate && isDateBefore(day, props.hoverDate);
};

const accessibilityLabelPrefix = (day: Date) => {
  const [ firstAccessibilityLabelPrefix, lastAccessibilityLabelPrefix ] = props.accessibilityLabelPrefixes;

  if (
    (props.allowRange && isFirstSelectedDay(day))
    || (!props.allowRange && firstAccessibilityLabelPrefix)
  ) {
    return firstAccessibilityLabelPrefix;
  }

  if (props.allowRange && isLastSelectedDay(day)) {
    return lastAccessibilityLabelPrefix;
  }
};

const handleDateClick = (selectedDate: Date) => {
  const selectedValue = getNewRange(props.allowRange ? props.selected : undefined, selectedDate);
  emits('change', selectedValue);
};

function weekdayLabel(weekday: number) {
  return i18n.translate(`Polaris.DatePicker.days.${weekdayName(weekday)}`);
}

function hoveringDateIsInRange(
  day: Date | null,
  range: Range,
  hoverEndDate: Date,
) {
  if (day == null) {
    return false;
  }
  const {start, end} = range;
  return Boolean(isSameDay(start, end) && day > start && day <= hoverEndDate);
}

function isDateEnd(day: Date | null, range: Range) {
  if (day == null) return false;
  const {end} = range;

  return Boolean(end && isSameDay(end, day));
}

function isDateStart(day: Date | null, range: Range) {
  if (day == null) return false;
  const {start} = range;

  return Boolean(start && isSameDay(start, day));
}
</script>
