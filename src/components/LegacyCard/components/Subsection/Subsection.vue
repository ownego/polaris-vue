<template lang="pug">
div(:class="styles.Subsection")
  slot
</template>

<script setup lang="ts">
import type { VueNode } from '@/utilities/types';
import styles from '@polaris/components/LegacyCard/LegacyCard.module.css';

defineSlots<{
  default: (_?: VueNode) => any;
}>();
</script>
