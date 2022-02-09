<template lang="pug">
kbd(:class="className") {{ keyString }}
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import styles from '@/classes/KeyboardKey.json';

@Component
export default class KeyboardKey extends Vue {
  public className = styles.KeyboardKey;

  get keyString() {
    const slotText = this.$slots.default && this.$slots.default[0].text
      ? this.$slots.default[0].text
      : '';
    return slotText.length > 1
      ? slotText.toLowerCase()
      : slotText.toUpperCase();
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/KeyboardKey/KeyboardKey.scss';
</style>
