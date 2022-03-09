<template lang="pug">
component(:class="styles.Truncate")
  slot
</template>

<script setup lang="ts">
import styles from '@/classes/Truncate.json';
</script>

<style lang="scss">
@import 'polaris-react/src/components/Truncate/Truncate.scss';
</style>
