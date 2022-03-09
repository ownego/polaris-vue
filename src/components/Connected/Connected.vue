<template lang="pug">
div(:class="styles.Connected")
  Item(v-if="$slots.left", position="left")
    slot(name="left")
  Item(v-if="$slots.default", position="primary")
    slot
  Item(v-if="$slots.right", position="right")
    slot(name="right")
</template>

<script setup lang="ts">
import styles from '@/classes/Connected.json';
import { Item } from './components';
</script>

<style lang="scss">
@import 'polaris-react/src/components/Connected/Connected.scss';
</style>
