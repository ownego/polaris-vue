<template lang="pug">
div(:class="styles.FooterHelp")
  div(:class="styles.Text")
    slot
</template>

<script setup lang="ts">
import styles from '@/classes/FooterHelp.json';
</script>

<style lang="scss">
@import 'polaris-react/src/components/FooterHelp/FooterHelp.scss';
</style>
