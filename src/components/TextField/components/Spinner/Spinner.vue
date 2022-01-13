<template lang="pug">
div(
  aria-hidden="true",
  :class="wrapperClassName",
  @click="$emit('click')",
)
  div(
    role="button",
    tabindex="-1",
    :class="segmentClassName",
    @click="handleStep(1)",
    @mousedown="$emit('mouse-down')",
    @mouseup="$emit('mouse-up')",
  )
    div(:class="iconClassName")
      Icon(:source="iconCaretUpMinor")
  div(
    role="button",
    tabindex="-1",
    :class="segmentClassName",
    @click="handleStep(-1)",
    @mousedown="$emit('mouse-down')",
    @mouseup="$emit('mouse-up')",
  )
    div(:class="iconClassName")
      Icon(:source="iconCaretDownMinor")
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import CaretDownMinor from '@shopify/polaris-icons/dist/svg/CaretDownMinor.svg';
import CaretUpMinor from '@shopify/polaris-icons/dist/svg/CaretUpMinor.svg';
import { Icon } from '@/components';
import styles from '@/classes/TextField.json';

@Component({
  components: {
    Icon,
  },
})
export default class Spinner extends Vue {
 public wrapperClassName = styles.Spinner;

 public segmentClassName = styles.Segment;

 public iconClassName = styles.SpinnerIcon;

 public iconCaretUpMinor = CaretUpMinor;

 public iconCaretDownMinor = CaretDownMinor;

 public handleStep(value: number): void {
   this.$emit('click');
   this.$emit('change', value);
 }
}
</script>
