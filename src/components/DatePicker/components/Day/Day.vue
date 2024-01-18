<template lang="pug">
td(v-if="day", :class="dayCellClassName")
  button(
    ref="dayNode",
    :tabindex="tabIndex",
    :class="dayClassName",
    :aria-label="ariaLabel",
    :aria-disabled="disabled",
    :aria-pressed="selected",
    @mouseover="handleHover",
    @click="handleClick",
  )
    | {{ date }}
td(
  v-else,
  :class="styles.EmptyDayCell",
  @mouseover="handleHover",
)
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { classNames } from '@/utilities/css';
import { isSameDay } from '@polaris/utilities/dates';
import useI18n from '@/use/useI18n';
import { monthName } from '@polaris/components/DatePicker/utilities';
import styles from '@polaris/components/DatePicker/DatePicker.module.scss';

export type DayProps = {
  focused?: boolean;
  day?: Date;
  selected?: boolean;
  inRange?: boolean;
  inHoveringRange?: boolean;
  disabled?: boolean;
  lastDayOfMonth?: any;
  isLastSelectedDay?: boolean;
  isFirstSelectedDay?: boolean;
  isHoveringRight?: boolean;
  rangeIsDifferent?: boolean;
  weekday?: string;
  selectedAccessibilityLabelPrefix?: string;
}

type DayEvents = {
  'click': [day: Date];
  'hover': [day?: Date];
  'focus': [day: Date];
}

const props = defineProps<DayProps>();
const emits = defineEmits<DayEvents>();

const i18n = useI18n();

const dayNode = ref<HTMLButtonElement | null>(null);

const hoverValue = computed(() => (props.lastDayOfMonth || props.day));
const today = computed(() => props.day ? isSameDay(new Date(), props.day) : null);
const date = computed(() => props.day?.getDate());
const tabIndex = computed(() => (
  (props.focused || props.selected || today.value || date.value === 1) && !props.disabled ? 0 : -1
));

const ariaLabel = computed(() => (
  [
    props.selected && props.selectedAccessibilityLabelPrefix
      ? `${props.selectedAccessibilityLabelPrefix} `
      : '',
    `${today.value ? i18n.translate('Polaris.DatePicker.today') : ''}`,
    `${props.weekday ? props.weekday : ''} `,
    `${props.day ? i18n.translate(
      `Polaris.DatePicker.months.${monthName(props.day.getMonth())}`,
    ) : null} `,
    `${date.value} `,
    `${props.day?.getFullYear()}`,
  ].join('')
));

const dayCellClassName = computed(() => classNames(
  styles.DayCell,
  props.selected && styles['DayCell-selected'],
  (props.inRange || props.inHoveringRange) && !props.disabled && styles['DayCell-inRange'],
  props.isLastSelectedDay && styles['DayCell-lastInRange'],
  props.isFirstSelectedDay && styles['DayCell-firstInRange'],
  props.isHoveringRight && styles['DayCell-hoverRight'],
  props.rangeIsDifferent && styles['DayCell-hasRange'],
));

const dayClassName = computed(() => classNames(
  styles.Day,
  props.selected && styles['Day-selected'],
  props.disabled && styles['Day-disabled'],
  today.value && styles['Day-today'],
  (props.inRange || props.inHoveringRange) && !props.disabled && styles['Day-inRange'],
  props.isLastSelectedDay && styles['Day-lastInRange'],
  props.isFirstSelectedDay && styles['Day-firstInRange'],
  props.isHoveringRight && styles['Day-hoverRight'],
  props.rangeIsDifferent && styles['Day-hasRange'],
));

watch(
  () => props.focused,
  () => {
    if (props.focused && dayNode.value) {
      dayNode.value.focus();
    }
  },
);

const handleClick = () => {
  if (props.disabled || !props.day) {
    return;
  }

  emits('click', props.day);
};

const handleHover = () => {
  emits('hover', hoverValue.value);
}
</script>
