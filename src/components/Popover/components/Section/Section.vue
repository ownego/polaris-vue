<template lang="pug">
div(:class="styles.Section")
  Box(
    padding-inline-start="300",
    padding-inline-end="300",
    padding-block-start="200",
    padding-block-end="150",
  )
    slot
</template>

<script setup lang="ts">
import { useCssModule } from 'vue';
import { Box } from '@/components';

const styles = useCssModule();
</script>

<style lang="scss" module>
@import '@polaris/components/Box/Box.scss';
</style>


