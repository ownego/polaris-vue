<template lang="pug">
li(:class="classItem")
  span(:class="styles.Icon")
    Icon(v-if="icon", :source="icon")
    span(v-else, :class="styles.Bullet")
  Truncate(v-if="truncate")
    span(
      v-if="title",
      :class="styles.Title",
    ) {{ title }}
    span(
      v-if="slots.default",
      :class="styles.Description",
    )
      slot
  template(v-else)
    span(
      v-if="title",
      :class="styles.Title",
    ) {{ title }}
    span(
      v-if="slots.default",
      :class="styles.Description",
    )
      slot
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { IconSource } from '@/utilities/type';
import { classNames, variationName } from 'polaris/polaris-react/src/utilities/css';
import styles from '@/classes/ExceptionList.json';
import { Icon } from '../Icon';
import { Truncate } from '../Truncate';

/**
 * Setup
 */
interface Props {
  /** Set the color of the icon and title for the given item. */
  status?: 'critical' | 'warning';
  /** Icon displayed by the list item */
  icon?: IconSource;
  /** Text displayed beside the icon */
  title?: string;
  /** Should the description be truncated at end of line */
  truncate?: boolean;
}

const props = defineProps<Props>();

const slots = useSlots();

/**
 * Computed
 */
const classItem = computed(() => {
  return classNames(
    styles.Item,
    props.status && styles[variationName('status', props.status) as keyof typeof styles],
  );
})
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/ExceptionList/ExceptionList.scss';
</style>
