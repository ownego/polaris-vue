<template lang="pug">
span(:class="className")
  <!-- Slot for content that will be hide -->
  slot
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import styles from '@/classes/VisuallyHidden.json';

/**
 * <br/>
 * <h4 class="desc">
 * Use when an element needs to be available to assistive
 * technology (for example, a screen reader) but otherwise hidden.
 * </h4>
 */
@Component
export default class VisuallyHidden extends Vue {
  public className: string = styles.VisuallyHidden;
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/VisuallyHidden/VisuallyHidden.scss';
</style>
