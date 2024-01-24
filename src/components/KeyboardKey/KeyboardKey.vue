<template lang="pug">
kbd(
  :class="className",
)
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from '@/utilities/css';
import type { VueNode } from '@/utilities/types';
import styles from '@polaris/components/KeyboardKey/KeyboardKey.module.scss';

type Size = 'small';

export interface KeyboardKeyProps {
  size?: Size;
}

const props = defineProps<KeyboardKeyProps>();
const slots = defineSlots<{
  /** KeyboardKey content */
  default: (_: VueNode) => any;
}>();

const className = computed(() => 
  classNames(styles.KeyboardKey, props.size && styles[props.size]),
);

</script>
