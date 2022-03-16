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
  :class="styles.EmptyDayCell",
  @mouseover="onHover",
)
</template>
<script setup lang="ts">
import { computed, onUpdated, ref } from 'vue';
import { classNames } from 'polaris-react/src/utilities/css';
import { isSameDay } from 'polaris-react/src/utilities/dates';
import styles from '@/classes/DatePicker.json';
import { transformedDate, monthName } from '../../utils';

interface DayProps {
  focused?: boolean;
  day?: Date;
  selected?: boolean;
  inRange?: boolean;
  inHoveringRange?: boolean;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lastDayOfMonth?: any;
  isLastSelectedDay?: boolean;
  isFirstSelectedDay?: boolean;
  isHoveringRight?: boolean;
  rangeIsDifferent?: boolean;
  weekday?: string;
  selectedAccessibilityLabelPrefix?: string;
}

const props = defineProps<DayProps>();

const dayRef = ref(null);

const emits = defineEmits<{
  (event: 'focus', value: Date | undefined): void,
  (event: 'hover', value: Date | undefined): void,
  (event: 'click', value: Date): void,
}>();

const hoverValue = computed(() => {
  return props.lastDayOfMonth || props.day;
});

const today = computed(() => {
  return props.day ? isSameDay(new Date(), props.day) : null;
})

const date = computed(() => {
  return props.day ? props.day.getDate() : null;
})

const tabIndex = computed(() => {
  if ((props.focused || props.selected || today.value || date.value === 1)
    && !props.disabled) {
    return 0;
  }

  return -1;
});

const dayCellClassName = computed(() => {
  return classNames(
    styles.DayCell,
    props.selected && styles['DayCell-selected'],
    (props.inRange || props.inHoveringRange) && !props.disabled && styles['DayCell-inRange'],
    props.isLastSelectedDay && styles['DayCell-lastInRange'],
    props.isFirstSelectedDay && styles['DayCell-firstInRange'],
    props.isHoveringRight && styles['DayCell-hoverRight'],
    props.rangeIsDifferent && styles['DayCell-hasRange'],
  );
});

const dayClassName = computed(() => {
  return classNames(
    styles.Day,
    props.selected && styles['Day-selected'],
    props.disabled && styles['Day-disabled'],
    today.value && styles['Day-today'],
    (props.inRange || props.inHoveringRange) && !props.disabled && styles['Day-inRange'],
    props.isLastSelectedDay && styles['Day-lastInRange'],
    props.isFirstSelectedDay && styles['Day-firstInRange'],
    props.isHoveringRight && styles['Day-hoverRight'],
    props.rangeIsDifferent && styles['Day-hasRange'],
  );
});

const monthRealName = computed(() => {
  if (!props.day) {
    return null;
  }
  const name = monthName(props.day.getMonth());
  return name ? transformedDate.months[name] : '';
});

const ariaLabel = computed(() => {
  return [
    props.selected && props.selectedAccessibilityLabelPrefix
      ? `${props.selectedAccessibilityLabelPrefix} `
      : '',
    `${today.value ? 'Today ' : ''}`,
    `${props.weekday ? props.weekday : ''} `,
    `${monthRealName.value} `,
    `${date.value} `,
    `${props.day ? props.day.getFullYear() : (new Date()).getFullYear()}`,
  ].join('');
});

onUpdated(() => {
  if (props.focused && dayRef.value) {
    setTimeout(() => {
      (dayRef.value as unknown as HTMLElement).focus();
    }, 10);
  }
});

const onFocus = () => {
  emits('focus', props.day);
};

const onHover = () => {
  emits('hover', hoverValue.value);
};

const handleClick = () => {
  if (!props.disabled && props.day) {
    emits('click', props.day);
  }
};
</script>
