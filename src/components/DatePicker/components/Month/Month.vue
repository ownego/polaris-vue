<template lang="pug">
div(:class="styles.MonthContainer")
  table(
    role="grid",
    :class="styles.Month",
  )
    caption(:class="className") {{ monthRealName }} {{ year }}
    thead
      tr(:class="weekHeadingsClassName")
        Weekday(
          v-for="weekday in weekdaysOrdered",
          :key="weekday",
          :title="weekdaysName(weekday)",
          :label="weekdayLabel(weekday)",
          :current="current && new Date().getDay() === weekday",
        )
    tbody
      tr(
        v-for="week, index in weeks",
        :key="index",
        :class="styles.Week",
      )
        template(
          v-for="day, dayIndex in week",
          :key="dayIndex",
        )
          Day(
            v-if="!day",
            :lastDayOfMonth="lastDayOfMonth",
            @hover="$emit('hover', null)",
          )
          Day(
            v-else,
            :selectedAccessibilityLabelPrefix="accessibilityLabelPrefix(day)",
            :weekday="weekdayLabel(dayIndex)",
            :focused="focusedDate && isSameDay(day, focusedDate)",
            :day="day",
            :selected="selected && dateIsSelected(day, selected)",
            :inRange="selected && dateIsInRange(day, selected)",
            :disabled="isDayDisabled(day)",
            :inHoveringRange="hoveringDateIsInRange(day, selected, hoverDate)",
            :isLastSelectedDay="isLastSelectedDay(day)",
            :isFirstSelectedDay="isFirstSelectedDay(day)",
            :isHoveringRight="isHoveringRight(day)",
            :rangeIsDifferent="rangeIsDifferent",
            @focus="$emit('focus', day)",
            @click="handleDateClick",
            @hover="$emit('hover', day)",
          )
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import {
  isDateBefore,
  isDateAfter,
  isSameDay,
  getWeeksForMonth,
  dateIsInRange,
  dateIsSelected,
  getNewRange,
  getOrderedWeekdays,
} from 'polaris/polaris-react/src/utilities/dates';
import type { Range } from 'polaris/polaris-react/src/utilities/dates';
import styles from '@/classes/DatePicker.json';
import { Day } from '../Day';
import { Weekday } from '../Weekday';
import { transformedDate, monthName, weekdayName } from '../../utils';

interface Props {
  focusedDate?: Date;
  selected?: Range;
  hoverDate?: Date;
  month: number;
  year: number;
  disableDatesBefore?: Date;
  disableDatesAfter?: Date;
  allowRange?: boolean;
  weekStartsOn: number;
  accessibilityLabelPrefixes?: [string | undefined, string];
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (event: 'focus', value: Date | null): void;
  (event: 'hover', value: Date | null): void;
  (event: 'click', value: Date): void;
  (event: 'change', value: Range | null): void;
}>();

const now = new Date();

const current = computed(() => {
  return now.getMonth() === props.month && now.getFullYear() === props.year;
});

const className = computed(() => {
  return classNames(
    styles.Title,
    current.value && styles['Month-current'],
  );
});

// const weekHeadingsClassName = classNames(styles.WeekHeadings);
const weekHeadingsClassName = 'Polaris-DatePicker__WeekHeadings';

const weeks = computed(() => {
  return getWeeksForMonth(props.month, props.year, props.weekStartsOn);
})

const monthRealName = computed(() => {
  const month = monthName(props.month);
  return month ? transformedDate.months[month] : '';
});

const weekdaysOrdered = computed(() => {
  return getOrderedWeekdays(props.weekStartsOn);
});

const lastDayOfMonth = computed(() => {
  return new Date(props.year, (props.month as number) + 1, 0);
});

const rangeIsDifferent = computed(() => {
  return !(
    props.selected && isSameDay(props.selected.start, props.selected.end)
  );
});

const handleDateClick = (selectedDate: Date) => {
  const selectedValue = getNewRange(props.allowRange ? props.selected : undefined, selectedDate);
  emits('change', selectedValue);
}

const isDayDisabled = (day: Date) => {
  return (props.disableDatesBefore && isDateBefore(day, props.disableDatesBefore))
    || (props.disableDatesAfter && isDateAfter(day, props.disableDatesAfter));
}

const isFirstSelectedDay = (day: Date) => {
  return props.allowRange && props.selected && isDateStart(day, props.selected);
}

const isLastSelectedDay = (day: Date) => {
  return props.allowRange && props.selected
    && (
      (!isSameDay(props.selected.start, props.selected.end)
        && isDateEnd(day, props.selected)
      )
      || (props.hoverDate
        && isSameDay(props.selected.start, props.selected.end)
        && isDateAfter(props.hoverDate, props.selected.start)
        && isSameDay(day, props.hoverDate)
        && !isFirstSelectedDay(day)
      )
    );
}

const isHoveringRight = (day: Date) => {
  return props.hoverDate && isDateBefore(day, props.hoverDate);
}

const accessibilityLabelPrefix = (day: Date) => {
  if (!props.accessibilityLabelPrefixes) {
    return '';
  }

  const [
    firstAccessibilityLabelPrefix,
    lastAccessibilityLabelPrefix,
  ] = props.accessibilityLabelPrefixes;

  if (
    (props.allowRange && isFirstSelectedDay(day))
    || (!props.allowRange && firstAccessibilityLabelPrefix)
  ) {
    return firstAccessibilityLabelPrefix;
  }

  if (props.allowRange && isLastSelectedDay(day)) {
    return lastAccessibilityLabelPrefix;
  }
}

const hoveringDateIsInRange = (
  day: Date | null,
  range: Range | undefined,
  hoverEndDate: Date | undefined,
) => {
  if (!props.allowRange || !range || !hoverEndDate || day == null) {
    return false;
  }
  const { start, end } = range;
  return Boolean(isSameDay(start, end) && day > start && day <= hoverEndDate);
}

/* Some common methods */
function weekdaysName(weekday: number) {
  const name = weekdayName(weekday);
  return name ? transformedDate.daysAbbreviated[name] : '';
}

function weekdayLabel(weekday: number) {
  const name = weekdayName(weekday);
  return name ? transformedDate.days[name] : '';
}

function isDateEnd(day: Date | null, range: Range) {
  if (day == null) {
    return false;
  }

  const { end } = range;

  return Boolean(end && isSameDay(end, day));
}

function isDateStart(day: Date | null, range: Range) {
  if (day == null) {
    return false;
  }
  const { start } = range;

  return Boolean(start && isSameDay(start, day));
}
</script>
