<template lang="pug">
Option(
  :value="value",
  :selected="selected",
  :disabled="disabled",
  :divider="divider",
)
  div(:class="className")
    TextOption(:selected="selected", :disabled="disabled")
      div(v-if="icon", :class="styles.Icon")
        Icon(color="subdued", :source="icon")
      slot
</template>

<script setup lang="ts">
import { provide, computed } from 'vue';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/Listbox-Action.json';
import type { IconSource } from 'types/type';
import type { OptionProps } from '../Option/utils';
import { Option } from '../Option';
import { TextOption } from '../TextOption';
import { Icon } from '../../../Icon';

interface ActionProps extends OptionProps {
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
@import 'polaris-react/src/components/Listbox/components/Action/Action.scss';
</style>
