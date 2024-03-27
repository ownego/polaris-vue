<template lang="pug">
th(
  :aria-label="label",
  scope="col",
  :class="className",
) {{ title }}
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from '@/utilities/css';
import styles from '@polaris/components/DatePicker/DatePicker.module.css';

export type WeekdayProps = {
  label: string;
  title: string;
  current: boolean;
}

const props = defineProps<WeekdayProps>();

const className = computed(() => classNames(
  styles.Weekday,
  props.current && styles['Weekday-current'],
));
</script>
