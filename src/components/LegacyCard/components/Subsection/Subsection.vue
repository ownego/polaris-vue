<template lang="pug">
div(:className="styles.Subsection")
  slot
</template>

<script setup lang="ts">
import styles from '@polaris/components/LegacyCard/LegacyCard.module.scss';

defineSlots<{
  default: (_?: VueNode) => any;
}>();
</script>
