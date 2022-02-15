<template lang="pug">
div(
  :class="className",
  @click="$emit('click')",
  @touchstart="$emit('touchstart')",
)
  ScrollLock
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/Backdrop.json';
import { ScrollLock } from '../ScrollLock';

@Component({
  components: {
    ScrollLock,
  },
})
export default class Backdrop extends Vue {
  @Prop({ type: Boolean }) public belowNavigation!: boolean;

  @Prop({ type: Boolean }) public transparent!: boolean;

  get className() {
    return classNames(
      styles.Backdrop,
      this.belowNavigation && styles.belowNavigation,
      this.transparent && styles.transparent,
    );
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Backdrop/Backdrop.scss';
</style>
