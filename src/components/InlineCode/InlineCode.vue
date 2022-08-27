<template lang="pug">
code(:class="styles.Code")
  slot
</template>

<script setup lang="ts">
import styles from '@/classes/InlineCode.json';
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/InlineCode/InlineCode.scss';
</style>
