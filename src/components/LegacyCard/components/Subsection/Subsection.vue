<template lang="pug">
div(:class="styles.Subsection")
  slot
</template>

<script setup lang="ts">
import type { VueNode } from '@/utilities/types';
import styles from '@polaris/components/LegacyCard/LegacyCard.module.scss';

defineSlots<{
  default: (_?: VueNode) => any;
}>();
</script>
