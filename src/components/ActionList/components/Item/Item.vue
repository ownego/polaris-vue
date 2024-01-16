<template lang="pug">
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { classNames } from '@/utilities/css';
import { handleMouseUpByBlurring } from '@/utilities/focus';
import {
  Icon,
  Scrollable,
  UnstyledLink,
  Badge,
  Text,
  InlineStack,
  Box,
  Tooltip,
} from '@/components';
import type { ActionListItemDescriptor } from '../../../../utilities/types';
import styles from '@polaris/components/ActionList/ActionList.module.scss';

type ItemProps = ActionListItemDescriptor;

const props = withDefaults(defineProps<ItemProps>(), {
  variant: 'default',
});

const className = computed(() => classNames(
  styles.Item,
  props.disabled && styles.disabled,
  props.destructive && styles.destructive,
  props.active && styles.active,
  props.variant === 'default' && styles.default,
  props.variant === 'indented' && styles.indented,
  props.variant === 'menu' && styles.menu,
))
</script>
