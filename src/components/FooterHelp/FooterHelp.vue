<template lang="pug">
div(:class="styles.FooterHelp")
  div(:class="styles.Text")
    slot
</template>

<script setup lang="ts">
import { type VNode } from 'vue';
import { type VueNode } from '@/utilities/types';
import styles from '@polaris/components/FooterHelp/FooterHelp.module.css';

const slots = defineSlots<{
  /** The content to display inside the layout. */
  default?: (_?: VueNode) => VNode[];
}>();
</script>
