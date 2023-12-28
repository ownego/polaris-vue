<template lang="pug">
div
  Box(
    padding-inline-start="300",
    padding-inline-end="300",
    padding-block-start="200",
    padding-block-end="150",
    :class="styles.Section",
  )
    slot
</template>

<script setup lang="ts">
import { useCssModule } from 'vue';
import { Box } from '../../../Box';

const styles = useCssModule();
</script>

<style scoped>
@import '@polaris/components/Popover/Popover.scss';
</style>
