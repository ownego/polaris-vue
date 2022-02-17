<template lang="pug">
td(
  v-if="day",
  :class="dayCellClassName",
)
  button(
    type="button",
    ref="dayRef",
    :tabIndex="tabIndex",
    :class="dayClassName",
    :aria-label="ariaLabel",
    :aria-disabled="disabled",
    :aria-pressed="selected",
    @focus="onFocus",
    @mouseover="onHover",
    @click="handleClick",
  ) {{ date }}
td(
  v-else,
  :class="emptyDayCellClassName",
  @mouseover="onHover",
)
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import styles from '@/classes/DatePicker.json';
import { classNames } from 'polaris-react/src/utilities/css';
import { isSameDay } from 'polaris-react/src/utilities/dates';
import { DayProps } from './utils';
import { transformedDate, monthName } from '../../utils';

@Component
export default class Day extends Vue {
  @Prop({ type: Date })
  public day?: DayProps['day'];

  @Prop({ type: Boolean })
  public focused?: DayProps['focused'];

  @Prop({ type: Boolean })
  public selected?: DayProps['selected'];

  @Prop({ type: Boolean })
  public inRange?: DayProps['inRange'];

  @Prop({ type: Boolean })
  public inHoveringRange?: DayProps['inHoveringRange'];

  @Prop({ type: Boolean })
  public disabled?: DayProps['disabled'];

  @Prop()
  public lastDayOfMonth?: DayProps['lastDayOfMonth'];

  @Prop({ type: Boolean })
  public isLastSelectedDay?: DayProps['isLastSelectedDay'];

  @Prop({ type: Boolean })
  public isFirstSelectedDay?: DayProps['isFirstSelectedDay'];

  @Prop({ type: Boolean })
  public isHoveringRight?: DayProps['isHoveringRight'];

  @Prop({ type: Boolean })
  public rangeIsDifferent?: DayProps['rangeIsDifferent'];

  @Prop({ type: String })
  public weekday?: DayProps['weekday'];

  @Prop({ type: String })
  public selectedAccessibilityLabelPrefix?: DayProps['selectedAccessibilityLabelPrefix'];

  public emptyDayCellClassName = styles.EmptyDayCell;

  get hoverValue() {
    return this.lastDayOfMonth || this.day;
  }

  get today() {
    if (!this.day) return null;

    return isSameDay(new Date(), this.day);
  }

  get date() {
    if (!this.day) return null;
    return this.day.getDate();
  }

  get tabIndex() {
    if ((this.focused || this.selected || this.today || this.date === 1)
      && !this.disabled) {
      return 0;
    }

    return -1;
  }

  get dayCellClassName() {
    return classNames(
      styles.DayCell,
      // this.selected && styles['DayCell-selected'],
      (this.inRange || this.inHoveringRange) && !this.disabled && styles['DayCell-inRange'],
      // this.isLastSelectedDay && styles['DayCell-lastInRange'],
      // this.isFirstSelectedDay && styles['DayCell-firstInRange'],
      // this.isHoveringRight && styles['DayCell-hoverRight'],
      // this.rangeIsDifferent && styles['DayCell-hasRange'],
    );
  }

  get dayClassName() {
    return classNames(
      styles.Day,
      this.selected && styles['Day-selected'],
      this.disabled && styles['Day-disabled'],
      this.today && styles['Day-today'],
      (this.inRange || this.inHoveringRange) && !this.disabled && styles['Day-inRange'],
      this.isLastSelectedDay && styles['Day-lastInRange'],
      this.isFirstSelectedDay && styles['Day-firstInRange'],
      this.isHoveringRight && styles['Day-hoverRight'],
      this.rangeIsDifferent && styles['Day-hasRange'],
    );
  }

  get monthName() {
    if (!this.day) return null;
    const name = monthName(this.day.getMonth());
    return name ? transformedDate.months[name] : '';
  }

  get ariaLabel() {
    return [
      this.selected && this.selectedAccessibilityLabelPrefix
        ? `${this.selectedAccessibilityLabelPrefix} `
        : '',
      `${this.today ? 'Today ' : ''}`,
      `${this.weekday ? this.weekday : ''} `,
      `${this.monthName} `,
      `${this.date} `,
      `${this.day ? this.day.getFullYear() : (new Date()).getFullYear()}`,
    ].join('');
  }

  mounted() {
    if (this.focused && this.$refs.dayRef) {
      (this.$refs.dayRef as HTMLElement).focus();
    }
  }

  onFocus() {
    this.$emit('focus', this.day);
  }

  onHover() {
    this.$emit('hover', this.hoverValue);
  }

  handleClick() {
    if (!this.disabled) {
      this.$emit('click', this.day);
    }
  }
}
</script>
