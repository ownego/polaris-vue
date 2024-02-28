<template lang="pug">
UnstyledButton(
  :class="classes",
  @click="handleClick",
)
  Icon(
    tone="base",
    :source="iconSource",
  )
  span(:class="styles.Label")
    slot
</template>

<script setup lang="ts">
import { type VNode, computed } from 'vue';
import { classNames } from '@/utilities/css';
import { type VueNode } from '@/utilities/types';
import {
  UnstyledButton,
  Icon,
} from '@/components';
import ArrowDownIcon from '@icons/ArrowDownIcon.svg';
import ArrowUpIcon from '@icons/ArrowUpIcon.svg';
import styles from '@polaris/components/IndexFilters/components/SortButton/components/DirectionButton/DirectionButton.module.scss';

type DirectionButtonDirection = 'asc' | 'desc';

interface DirectionButtonProps {
  active: boolean;
  direction: DirectionButtonDirection;
  value: string;
}

const props = defineProps<DirectionButtonProps>();
const emits = defineEmits<{
  'click': [value: string[]];
}>();
const slots = defineSlots<{
  default?: (_?: VueNode) => VNode[];
}>();

const classes = computed(() => classNames(
  styles.DirectionButton,
  props.active && styles['DirectionButton-active'],
));
const iconSource = computed(() => props.direction === 'asc' ? ArrowUpIcon : ArrowDownIcon);

const handleClick = () => {
  emits('click', [props.value]);
};
</script>
