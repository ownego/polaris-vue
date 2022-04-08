<template lang="pug">
ul(:class="styles.ExceptionList")
  slot
</template>

<script setup lang="ts">
import styles from '@/classes/ExceptionList.json';
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/ExceptionList/ExceptionList.scss';
</style>
