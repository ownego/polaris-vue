<template lang="pug">
div(
  :class="className",
  ref="alphaPicker",
)
  div(
    :class="classColorLayer",
    :style="{ background }",
  ) &nbsp;
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
import type { HSBColor } from 'polaris-react/src/utilities/color-types';
import { hsbToRgb } from '@/utilities/color-transformers';
import { calculateDraggerY, alphaForDraggerY } from 'polaris-react/src/components/ColorPicker/components/AlphaPicker/utilities';
import styles from '@/classes/ColorPicker.json';
import { Slidable } from '../Slidable';

@Component({
  components: {
    Slidable,
  },
})
export default class AlphaPicker extends Vue {
  @Prop({ type: Object, required: true })
  public color!: HSBColor;

  @Prop({ type: Number, required: true })
  public alpha!: number;

  public className = classNames(styles.AlphaPicker);

  public classColorLayer = classNames(styles.ColorLayer);

  public sliderHeight = 0;

  public draggerHeight = 0;

  get draggerY() {
    return calculateDraggerY(this.alpha, this.sliderHeight, this.draggerHeight);
  }

  get background() {
    const { red, green, blue } = hsbToRgb(this.color);
    const rgb = `${red}, ${green}, ${blue}`;
    return `linear-gradient(to top, rgba(${rgb}, 0) 18px, rgba(${rgb}, 1) calc(100% - 18px))`;
  }

  mounted() {
    this.setSliderHeight();
  }

  setSliderHeight() {
    const alphaPicker = this.$refs.alphaPicker as HTMLElement;

    if (!alphaPicker) return;

    this.sliderHeight = alphaPicker.clientHeight;
  }

  setDraggerHeight(height: number) {
    this.draggerHeight = height;
  }

  handleChange({ y }: { y: number }) {
    const alpha = alphaForDraggerY(y, this.sliderHeight);
    this.$emit('change', alpha);
  }
}
</script>
