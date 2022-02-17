<template lang="pug">
div(:class="monthContainerClassName")
  table(
    role="grid",
    :class="monthClassName",
  )
    caption(:class="className") {{ monthName }} {{ year }}
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
        :class="weekClassName",
      )
        template(
          v-for="day, dayIndex in week",
        )
          Day(
            v-if="!day",
            :key="dayIndex",
            :lastDayOfMonth="lastDayOfMonth",
            @hover="onHover",
          )
          Day(
            v-else,
            :key="dayIndex",
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
            @focus="onFocus(day)",
            @click="handleDateClick(day)",
            @hover="onHover(day)",
          )
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import {
  isDateBefore,
  isDateAfter,
  isSameDay,
  getWeeksForMonth,
  dateIsInRange,
  dateIsSelected,
  getNewRange,
  getOrderedWeekdays,
} from 'polaris-react/src/utilities/dates';
import type { Range } from 'polaris-react/src/utilities/dates';
import styles from '@/classes/DatePicker.json';
import { Day } from '../Day';
import { Weekday } from '../Weekday';
import { transformedDate, monthName, weekdayName } from '../../utils';

@Component({
  components: {
    Day,
    Weekday,
  },
})
export default class Month extends Vue {
  @Prop({ type: Date })
  public focusedDate?: Date;

  @Prop({ type: Object })
  public selected?: Range;

  @Prop({ type: Date })
  public hoverDate?: Date;

  @Prop({ type: Number, required: true })
  public month!: number;

  @Prop({ type: Number, required: true })
  public year!: number;

  @Prop({ type: Date })
  public disableDatesBefore?: Date;

  @Prop({ type: Date })
  public disableDatesAfter?: Date;

  @Prop({ type: Boolean })
  public allowRange?: boolean;

  @Prop({ type: Number, required: true })
  public weekStartsOn!: number;

  @Prop({ type: Array })
  public accessibilityLabelPrefixes?: [string | undefined, string];

  public now = new Date();

  public monthContainerClassName = styles.MonthContainer;

  public monthClassName = styles.Month;

  public weekClassName = styles.Week;

  // public weekHeadingsClassName = styles.WeekHeadings;
  public weekHeadingsClassName = null;

  public isSameDay = isSameDay;

  public dateIsSelected = dateIsSelected;

  public dateIsInRange = dateIsInRange;

  get current() {
    return this.now.getMonth() === this.month && this.now.getFullYear() === this.year;
  }

  get className() {
    return classNames(
      styles.Title,
      this.current && styles['Month-current'],
    );
  }

  get weeks() {
    return getWeeksForMonth(this.month, this.year, this.weekStartsOn);
  }

  get monthName() {
    const month = monthName(this.month);
    return month ? transformedDate.months[month] : '';
  }

  get weekdaysOrdered() {
    return getOrderedWeekdays(this.weekStartsOn);
  }

  get lastDayOfMonth() {
    return new Date(this.year, (this.month as number) + 1, 0);
  }

  get rangeIsDifferent() {
    return !(
      this.selected && isSameDay(this.selected.start, this.selected.end)
    );
  }

  public handleDateClick(selectedDate: Date) {
    const selectedValue = getNewRange(this.allowRange ? this.selected : undefined, selectedDate);
    this.$emit('change', selectedValue);
  }

  public onFocus(day: Date) {
    this.$emit('focus', day);
  }

  public onHover(day: Date) {
    this.$emit('hover', day);
  }

  public isDayDisabled(day: Date) {
    return (this.disableDatesBefore && isDateBefore(day, this.disableDatesBefore))
      || (this.disableDatesAfter && isDateAfter(day, this.disableDatesAfter));
  }

  public isFirstSelectedDay(day: Date) {
    return this.allowRange && this.selected && this.isDateStart(day, this.selected);
  }

  public isLastSelectedDay(day: Date) {
    return this.allowRange && this.selected
      && (
        (!isSameDay(this.selected.start, this.selected.end)
          && this.isDateEnd(day, this.selected)
        )
        || (this.hoverDate
          && isSameDay(this.selected.start, this.selected.end)
          && isDateAfter(this.hoverDate, this.selected.start)
          && isSameDay(day, this.hoverDate)
          && !this.isFirstSelectedDay(day)
        )
      );
  }

  public isHoveringRight(day: Date) {
    return this.hoverDate && isDateBefore(day, this.hoverDate);
  }

  public accessibilityLabelPrefix(day: Date) {
    if (!this.accessibilityLabelPrefixes) return '';

    const [
      firstAccessibilityLabelPrefix,
      lastAccessibilityLabelPrefix,
    ] = this.accessibilityLabelPrefixes;

    if (
      (this.allowRange && this.isFirstSelectedDay(day))
      || (!this.allowRange && firstAccessibilityLabelPrefix)
    ) {
      return firstAccessibilityLabelPrefix;
    }

    if (this.allowRange && this.isLastSelectedDay(day)) {
      return lastAccessibilityLabelPrefix;
    }
  }

  public hoveringDateIsInRange(
    day: Date | null,
    range: Range,
    hoverEndDate: Date,
  ) {
    if (!this.allowRange || !range || !hoverEndDate || day == null) {
      return false;
    }
    const { start, end } = range;
    return Boolean(isSameDay(start, end) && day > start && day <= hoverEndDate);
  }

  /* Some common methods */
  public weekdaysName = (weekday: number) => {
    const name = weekdayName(weekday);
    return name ? transformedDate.daysAbbreviated[name] : '';
  }

  public weekdayLabel = (weekday: number) => {
    const name = weekdayName(weekday);
    return name ? transformedDate.days[name] : '';
  }

  public isDateEnd = (day: Date | null, range: Range) => {
    if (day == null) return false;
    const { end } = range;

    return Boolean(end && isSameDay(end, day));
  }

  public isDateStart = (day: Date | null, range: Range) => {
    if (day == null) return false;
    const { start } = range;

    return Boolean(start && isSameDay(start, day));
  }
}
</script>
