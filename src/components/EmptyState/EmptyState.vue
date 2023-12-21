<template lang="pug">
Box(
  padding-inline-start="0",
  padding-inline-end="0",
  padding-block-start="500",
  padding-block-end="1600",
)
  BlockStack(inline-align="center")
</template>

<script setup lang="ts">
import Box from '../Box/Box.vue';
</script>

<style lang="scss" module>
@import '@polaris/components/Box/Box.scss';
</style>
