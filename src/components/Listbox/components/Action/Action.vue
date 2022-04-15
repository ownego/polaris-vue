<template lang="pug">
Option(v-bind="props")
  div(:class="className")
    TextOption(:selected="selected", :disabled="disabled")
      div(v-if="icon", :class="styles.Icon")
        Icon(color="subdued", :source="icon")
      slot
</template>

<script setup lang="ts">
import { provide, computed } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import styles from '@/classes/Listbox-Action.json';
import type { IconSource } from '@/utilities/type';
import { Option } from '../Option';
import { TextOption } from '../TextOption';
import { Icon } from '../../../Icon';

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

<style lang="scss">
@import 'polaris/polaris-react/src/components/Listbox/components/Action/Action.scss';
</style>
