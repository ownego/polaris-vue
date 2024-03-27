<template lang="pug">
span(:class="styles.Truncate")
  slot
</template>

<script setup lang="ts">
import type { VueNode } from '@/utilities/types';
import styles from '@polaris/components/Truncate/Truncate.module.css';

defineSlots<{
  /** The content to display inside the link */
  default: (_: VueNode) => null;
}>();

</script>
