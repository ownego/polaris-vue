<template lang="pug">
span(:class="styles.VisuallyHidden")
  <!-- Slot for content that will be hide -->
  slot
</template>

<script setup lang="ts">
import styles from '@/classes/VisuallyHidden.json';
</script>

<style lang="scss">
@import 'polaris-react/src/components/VisuallyHidden/VisuallyHidden.scss';
</style>
