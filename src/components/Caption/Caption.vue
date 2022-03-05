<template lang="pug">
p(:class="styles.Caption")
  slot
</template>

<script setup lang="ts">
import styles from '@/classes/Caption.json';
</script>

<style lang="scss">
@import 'polaris-react/src/components/Caption/Caption.scss';
</style>
