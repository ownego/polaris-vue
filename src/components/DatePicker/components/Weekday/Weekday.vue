<template lang="pug">
th(
  :aria-label="label",
  scope="col",
  :class="className",
) {{ title }}
</template>
<script setup lang="ts">
import { computed } from 'vue';
import styles from '@/classes/DatePicker.json';
import { classNames } from 'polaris-react/src/utilities/css';

interface Props {
  label: string;
  title: string;
  current: boolean;
}

const props = defineProps<Props>();

const className = computed(() => {
  return classNames(
    styles.Weekday,
    props.current && styles['Weekday-current'],
  );
});
</script>
