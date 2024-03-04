<template lang="pug">
div(
  role="tabpanel",
  tabIndex="-1",
  :class="className",
  :id="id",
  :aria-labelledby="tabID",
)
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { VueNode } from '@/utilities/types';
import { classNames } from '@/utilities/css';
import styles from '@polaris/components/Tabs/Tabs.module.scss';

export interface PanelProps {
  hidden?: boolean;
  id: string;
  tabID: string;
}

defineSlots<{
  /** Elements to display inside the tag*/
  default: (_?: VueNode) => any;
}>();

const props = defineProps<PanelProps>();

const className = computed(() => classNames(
  styles.Panel,
  props.hidden && styles['Panel-hidden'],
));
</script>
