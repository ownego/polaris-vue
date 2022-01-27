<template lang="pug">
div(
  :class="className",
  ref="huePicker",
)
  Slidable(
    :draggerY="draggerY",
    :draggerX="0",
    @change="handleChange",
    @dragger-height="setDraggerHeight",
  )
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import { calculateDraggerY, hueForDraggerY } from 'polaris-react/src/components/ColorPicker/components/HuePicker/utilities';
import styles from '@/classes/ColorPicker.json';
import { Slidable } from '../Slidable';

@Component({
  components: {
    Slidable,
  },
})
export default class HuePicker extends Vue {
  @Prop({ type: Number, required: true })
  public hue!: number;

  public sliderHeight = 0;

  public draggerHeight = 0;

  public className = classNames(styles.HuePicker);

  get draggerY() {
    return calculateDraggerY(this.hue, this.sliderHeight, this.draggerHeight);
  }

  mounted() {
    this.setSliderHeight();
  }

  setSliderHeight() {
    const huePicker = this.$refs.huePicker as HTMLElement;

    if (!huePicker) return;

    this.sliderHeight = huePicker.clientHeight;
  }

  setDraggerHeight(height: number) {
    this.draggerHeight = height;
  }

  handleChange({ y }: { y: number }) {
    const hue = hueForDraggerY(y, this.sliderHeight);
    this.$emit('change', hue);
  }
}
</script>
