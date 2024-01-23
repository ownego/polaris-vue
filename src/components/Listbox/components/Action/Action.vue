<template lang="pug">
Option(v-bind="props")
  div(:class="className")
    TextOption(:selected="selected", :disabled="disabled")
      div(v-if="icon", :class="styles.Icon")
        Icon(tone="subdued", :source="icon")
      slot
</template>

<script setup lang="ts">
import { computed, provide } from 'vue';
import { classNames } from '@/utilities/css';
import type { IconSource } from '@/utilities/types';
import Option from '../Option/Option.vue';
import TextOption from '../TextOption/TextOption.vue';
import styles from '@polaris/components/Listbox/components/Action/Action.module.scss';

interface ActionProps {
  // Unique item value
  value: string;
  // Visually hidden text for screen readers
  accessibilityLabel?: string;
  // Option is selected
  selected?: boolean;
  // Option is disabled
  disabled?: boolean;
  // Adds a border-bottom to the Option
  divider?: boolean;
  // Display icon inside Action
  icon?: IconSource;
}

provide('actionContext', true);

const props = defineProps<ActionProps>();

const className = computed(() => classNames(
  styles.Action,
  props.divider && styles.ActionDivider,
));
</script>
