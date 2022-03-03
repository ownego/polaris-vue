<template lang="pug">
label(
  :id="labelID(id)",
  :for="id",
  :class="className",
)
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/Label.json';
import { labelID } from './utils';

interface LabelProps {
  /** A unique identifier for the label */
  id: string;
  /** Visually hide the label */
  hidden?: boolean;
  /** Visual required indicator for the label */
  requiredIndicator?: boolean;
}

const props = defineProps<LabelProps>();

const className = computed(() => classNames(
  styles.Label,
  props.hidden && styles.hidden,
));

</script>

<style lang="scss">

</style>
