<template lang="pug">
span(:class="className")
  <!-- Slot for content that will be hide -->
  slot
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import styles from '@/classes/VisuallyHidden.json';

@Component
export default class VisuallyHidden extends Vue {
  public className: string = styles.VisuallyHidden;
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/VisuallyHidden/VisuallyHidden.scss';
</style>
