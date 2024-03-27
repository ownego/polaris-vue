<template lang="pug">
div(:class="styles.Container")
  slot
</template>

<script setup lang="ts">
import { type VNode } from 'vue';
import type { VueNode } from '@/utilities/types';
import styles from '@polaris/components/IndexFilters/components/Container/Container.module.css';

const slots = defineSlots<{
  default?: (_?: VueNode) => VNode[];
}>();
</script>
