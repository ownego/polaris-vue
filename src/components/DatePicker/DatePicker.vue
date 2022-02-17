<template lang="pug">
div(
  :id="id",
  :class="datePickerClassName",
  @keydown="handleKeyDown",
  @keyup="handleKeyUp",
)
  div(:class="headerClassName")
    Button(
      plain,
      :icon="iconArrowLeftMinor",
      :accessibilityLabel="previousMonthAccessibilityLabel",
      @click="handleMonthChangeClick(showPreviousMonth, showPreviousYear)"
    )
    Button(
      plain,
      :icon="iconArrowRightMinor",
      :accessibilityLabel="nextMonthAccessibilityLabel",
      @click="handleMonthChangeClick(showNextMonth, showNextYear)",
    )
  div(:class="monthLayoutClassName")
    Month(
      :focusedDate="focusDate",
      :month="month",
      :year="year",
      :selected="deriveRange(selected)",
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
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import ArrowLeftMinor from '@icons/ArrowLeftMinor.svg';
import ArrowRightMinor from '@icons/ArrowRightMinor.svg';
import { classNames } from 'polaris-react/src/utilities/css';
import {
  isDateAfter,
  isDateBefore,
  getNextDisplayYear,
  getNextDisplayMonth,
  getPreviousDisplayYear,
  getPreviousDisplayMonth,
} from 'polaris-react/src/utilities/dates';
import type { Range } from 'polaris-react/src/utilities/dates';
import styles from '@/classes/DatePicker.json';
import { Month } from './components';
import { Button } from '../Button';
import { transformedDate, monthName } from './utils';

@Component({
  components: {
    Button,
    Month,
  },
})
export default class DatePicker extends Vue {
  /** ID for the element */
  @Prop({ type: String })
  public id?: string;

  /** The selected date or range of dates */
  @Prop({ type: Object })
  public selected?: Date | Range;

  /** The month to show, from 0 to 11. 0 is January, 1 is February ... 11 is December */
  @Prop({ type: Number, required: true })
  public month!: number;

  /** The year to show */
  @Prop({ type: Number, required: true })
  public year!: number;

  /** Allow a range of dates to be selected */
  @Prop({ type: Boolean })
  public allowRange?: boolean;

  /** Disable selecting dates before this. */
  @Prop({ type: Date })
  public disableDatesBefore?: Date;

  /** Disable selecting dates after this. */
  @Prop({ type: Date })
  public disableDatesAfter?: Date;

  /** The selection can span multiple months */
  @Prop({ type: Boolean })
  public multiMonth?: boolean;

  /**
   * First day of week, from 0 to 6. 0 is Sunday, 1 is Monday ... 6 is Saturday
   * @default 0
   */
  @Prop({ type: Number, default: 0 })
  public weekStartsOn?: number;

  /** Visually hidden prefix text for selected days on single selection date pickers */
  @Prop({ type: String })
  public dayAccessibilityLabelPrefix?: string;

  public datePickerClassName = classNames(styles.DatePicker);

  public headerClassName = classNames(styles.Header);

  public monthLayoutClassName = classNames(styles.MonthLayout);

  public iconArrowLeftMinor = ArrowLeftMinor;

  public iconArrowRightMinor = ArrowRightMinor;

  public focusDate: Date | null = null;

  public hoverDate: Date | null = null;

  get showNextYear() {
    return getNextDisplayYear(this.month, this.year);
  }

  get showNextMonth() {
    return getNextDisplayMonth(this.month);
  }

  get showNextToNextYear() {
    return getNextDisplayYear(this.showNextMonth, this.showNextYear);
  }

  get showNextToNextMonth() {
    return getNextDisplayMonth(this.showNextMonth);
  }

  get showPreviousYear() {
    return getPreviousDisplayYear(this.month, this.year);
  }

  get showPreviousMonth() {
    return getPreviousDisplayMonth(this.month);
  }

  get previousMonthName() {
    const name = monthName(this.showPreviousMonth);
    return name ? transformedDate.months[name] : '';
  }

  get nextMonth() {
    if (this.multiMonth) {
      const month = monthName(this.showNextToNextMonth);
      return month ? transformedDate.months[month] : '';
    }

    const nextMonth = monthName(this.showNextMonth);
    return nextMonth ? transformedDate.months[nextMonth] : '';
  }

  get nextYear() {
    return this.multiMonth ? this.showNextToNextYear : this.showNextYear;
  }

  get monthIsSelected() {
    return this.deriveRange(this.selected);
  }

  get firstDatePickerAccessibilityLabelPrefix() {
    return this.allowRange
      ? 'Start of range'
      : this.dayAccessibilityLabelPrefix;
  }

  public secondDatePickerAccessibilityLabelPrefix = 'End of range';

  get accessibilityLabelPrefixes(): [string | undefined, string] {
    return [
      this.firstDatePickerAccessibilityLabelPrefix,
      this.secondDatePickerAccessibilityLabelPrefix,
    ];
  }

  get previousMonthAccessibilityLabel() {
    return `Show previous month, ${this.previousMonthName} ${this.showPreviousYear}`;
  }

  get nextMonthAccessibilityLabel() {
    return `Show next month, ${this.nextMonth} ${this.nextYear}`;
  }

  public onMonthChange(month: number, year: number) {
    /**
    * Callback when month is changed
    */
    this.$emit('month-change', { month, year });
  }

  public handleMonthChangeClick(month: number, year: number) {
    this.focusDate = null;
    this.onMonthChange(month, year);
  }

  public handleFocus(date: Date) {
    this.focusDate = date;
  }

  public handleHover(date: Date) {
    this.hoverDate = date;
  }

  public setFocusDateAndHandleMonthChange(date: Date) {
    this.onMonthChange(date.getMonth(), date.getFullYear());
    this.hoverDate = date;
    this.focusDate = date;
  }

  public handleDateSelection(range: Range) {
    const { end } = range;
    this.hoverDate = end;
    this.focusDate = new Date(end);

    /**
    * Callback when date is selected
    */
    this.$emit('change', range);
  }

  public handleKeyUp(event: KeyboardEvent) {
    const { key } = event;

    const range = this.deriveRange(this.selected);
    const focusedDate = this.focusDate || (range && range.start);

    if (!focusedDate) {
      return;
    }

    if (key === 'ArrowUp') {
      const previousWeek = new Date(focusedDate);
      previousWeek.setDate(focusedDate.getDate() - 7);
      if (
        !(
          this.disableDatesBefore && isDateBefore(previousWeek, this.disableDatesBefore)
        )
      ) {
        this.setFocusDateAndHandleMonthChange(previousWeek);
      }
    }

    if (key === 'ArrowDown') {
      const nextWeek = new Date(focusedDate);
      nextWeek.setDate(focusedDate.getDate() + 7);
      if (!(this.disableDatesAfter && isDateAfter(nextWeek, this.disableDatesAfter))) {
        this.setFocusDateAndHandleMonthChange(nextWeek);
      }
    }

    if (key === 'ArrowRight') {
      const tomorrow = new Date(focusedDate);
      tomorrow.setDate(focusedDate.getDate() + 1);
      if (!(this.disableDatesAfter && isDateAfter(tomorrow, this.disableDatesAfter))) {
        this.setFocusDateAndHandleMonthChange(tomorrow);
      }
    }

    if (key === 'ArrowLeft') {
      const yesterday = new Date(focusedDate);
      yesterday.setDate(focusedDate.getDate() - 1);
      if (
        !(this.disableDatesBefore && isDateBefore(yesterday, this.disableDatesBefore))
      ) {
        this.setFocusDateAndHandleMonthChange(yesterday);
      }
    }
  }

  public handleKeyDown = (event: KeyboardEvent) => {
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

  public deriveRange = (selected?: Date | Range) => (selected instanceof Date
    ? { start: selected, end: selected }
    : selected
  );
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/DatePicker/DatePicker.scss';
</style>
