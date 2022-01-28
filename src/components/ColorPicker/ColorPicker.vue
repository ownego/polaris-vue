<template lang="pug">
div(
  :id="id",
  :class="className",
  @mousedown="handlePickerDrag",
)
  div(
    ref="mainColor",
    :class="classMainColor",
  )
    div(
      :class="classColorLayer",
      :style="{ backgroundColor: colorString }",
    ) &nbsp;
    Slidable(
      :draggerX="draggerX",
      :draggerY="draggerY",
      @change="handleDraggerMove",
    )
  HuePicker(
    :hue="colorHsb.hue",
    @change="handleHueChange",
  )
  AlphaPicker(
    v-if="allowAlpha",
    :alpha="alpha",
    :color="colorHsb",
    @change="handleAlphaChange",
  )
  EventListener(
    event="resize",
    :handler="handleResize",
  )
</template>

<script lang="ts">
import Vue from 'vue';
import debounce from 'lodash/debounce';
import { Component, Prop } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import { clamp } from 'polaris-react/src/utilities/clamp';
import type { HSBColor, HSBAColor, RGBAColor } from 'polaris-react/src/utilities/color-types';
import {
  hsbToRgb,
  hsbToHex,
  hexToRgb,
  rgbToHsb,
} from '@/utilities/color-transformers';
import styles from '@/classes/ColorPicker.json';
import { AlphaPicker, HuePicker, Slidable } from './components';
import { EventListener } from '../EventListener';

interface Color extends HSBColor {
  /** Level of transparency */
  alpha?: HSBAColor['alpha'];
}

const RESIZE_DEBOUNCE_TIME_MS = 200;

@Component({
  components: {
    AlphaPicker,
    HuePicker,
    Slidable,
    EventListener,
  },
})
export default class ColorPicker extends Vue {
  /** ID for the element */
  @Prop({ type: String })
  id?: string;

  /** The currently selected color.
   * The color can be HSB object (same with Shopify) or RGB, Hex string
   */
  @Prop({ type: [Object, String], required: true })
  color!: Color | string;

  /** Allow user to select an alpha value */
  @Prop({ type: Boolean })
  allowAlpha?: boolean;

  /** Allow HuePicker to take the full width */
  @Prop({ type: Boolean })
  fullWidth?: boolean;

  /** Color output format */
  @Prop({ type: String })
  outputType?: 'hsb' | 'rgb' | 'hex';

  // Default input color
  public colorHsb: Color = {
    hue: 0,
    saturation: 0,
    brightness: 0,
    alpha: 1,
  };

  public pickerSize = { width: 0, height: 0 };

  public classMainColor = classNames(styles.MainColor);

  public classColorLayer = classNames(styles.ColorLayer);

  public handlePickerDrag = (event: MouseEvent) => {
    // prevents external elements from being selected
    event.preventDefault();
  };

  get className() {
    return classNames(
      styles.ColorPicker,
      this.fullWidth && styles.fullWidth,
    );
  }

  get alpha() {
    return this.colorHsb.alpha !== undefined && this.allowAlpha ? this.colorHsb.alpha : 1;
  }

  get colorString() {
    const { red, green, blue } = hsbToRgb({ hue: this.colorHsb.hue, saturation: 1, brightness: 1 });
    return `rgba(${red}, ${green}, ${blue}, ${this.alpha})`;
  }

  get draggerX() {
    return clamp(this.colorHsb.saturation * this.pickerSize.width, 0, this.pickerSize.width);
  }

  get draggerY() {
    return clamp(
      this.pickerSize.height - this.colorHsb.brightness * this.pickerSize.height,
      0,
      this.pickerSize.height,
    );
  }

  get outputColor() {
    if (this.outputType === 'hex') {
      return hsbToHex(this.colorHsb);
    }

    if (this.outputType === 'rgb') {
      const rgbColor = hsbToRgb(this.colorHsb);
      return `rgba(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue}, ${this.alpha})`;
    }

    return this.colorHsb;
  }

  private handleResize = debounce(
    () => {
      const mainColorEl = this.$refs.mainColor as HTMLElement;

      if (!mainColorEl) return;

      this.pickerSize = {
        width: mainColorEl.clientWidth,
        height: mainColorEl.clientHeight,
      };
    },
    RESIZE_DEBOUNCE_TIME_MS,
    { leading: true, trailing: true, maxWait: RESIZE_DEBOUNCE_TIME_MS },
  );

  created() {
    /**
     * Set the initial color
     * The input color maybe Hex or RGB
     * Convert it to hsb
     */

    // Default hsb
    if (typeof this.color === 'object') {
      this.colorHsb = this.color;
    }

    // Hex or RGB
    if (typeof this.color === 'string') {
      let colorRgb: RGBAColor;

      // Convert from hex to rgba object
      if (/#[0-9abcdef]{3,6}/.test(this.color)) {
        colorRgb = { ...hexToRgb(this.color), alpha: 1 };
      } else { // Conver from rgba string to object
        const colorRgbArr = this.color.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
        colorRgb = {
          red: parseInt(colorRgbArr[0], 10),
          green: parseInt(colorRgbArr[1], 10),
          blue: parseInt(colorRgbArr[2], 10),
          alpha: colorRgbArr[2] ? parseFloat(colorRgbArr[3]) : 1,
        };
      }

      this.colorHsb = { ...rgbToHsb(colorRgb), alpha: colorRgb.alpha };
    }
  }

  mounted() {
    const mainColorEl = this.$refs.mainColor as HTMLElement;
    if (!mainColorEl) return;

    this.pickerSize = {
      width: mainColorEl.clientWidth,
      height: mainColorEl.clientHeight,
    };
  }

  handleHueChange(hue: number) {
    this.colorHsb.hue = hue;
    this.$emit('change', this.outputColor);
  }

  handleAlphaChange(alpha: number) {
    this.colorHsb.alpha = alpha;
    this.$emit('change', this.outputColor);
  }

  handleDraggerMove({ x, y }: { x: number, y: number }): void {
    this.colorHsb.saturation = clamp(x / this.pickerSize.width, 0, 1);
    this.colorHsb.brightness = clamp(1 - y / this.pickerSize.height, 0, 1);
    this.$emit('change', this.outputColor);
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/ColorPicker/ColorPicker.scss';
</style>
