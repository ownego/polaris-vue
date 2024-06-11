<template lang="pug">
th(
  :aria-label="label",
  scope="col",
  :class="styles.Weekday",
)
  Text(
    as="span",
    variant="bodySm",
    alignment="center",
    :font-weight="current ? 'bold' : 'regular'",
    :tone="!current ? 'subdued': undefined",
  ) {{ title }}
</template>

<script setup lang="ts">
import { Text } from '@/components';
import styles from '@polaris/components/DatePicker/DatePicker.module.css';

export type WeekdayProps = {
  label: string;
  title: string;
  current: boolean;
}

defineProps<WeekdayProps>();
</script>
