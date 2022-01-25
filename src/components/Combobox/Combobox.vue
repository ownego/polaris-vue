<template lang="pug">
Popover(
  :active="popoverActive",
  autofocusTarget="none",
  preventFocusOnClose=true,
  fullWidth=true,
  preferInputActivator=false,
  :preferredPosition="preferredPosition",
  @close="handleClose",
)
  template(slot="activator")
    slot(name="activator")
  template(slot="content")
    Pane(@scrolled-to-bottom="$emit('scrolled-to-bottom')")
      div(:class="listboxClassName")
        slot
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Component,
  Prop,
  Provide,
} from 'vue-property-decorator';
import styles from '@/classes/Combobox.json';
import type { PreferredPosition } from '../PositionedOverlay';
import { TextField } from '../TextField';
import { Popover, Pane } from '../Popover';

@Component({
  components: {
    Popover,
    Pane,
    TextField,
  },
})
export default class Combobox extends Vue {
  @Provide() comboboxTextFieldFocus = this.handleFocus;

  @Provide() comboboxTextFieldBlur = this.handleBlur;

  @Provide() comboboxTextFieldChange = this.handleChange;

  @Prop({ type: Boolean })
  public allowMultiple!: boolean;

  @Prop({ type: String, default: 'below' })
  public preferredPosition!: PreferredPosition;

  public popoverActive = false;

  public listboxClassName = styles.Listbox;

  get shouldOpen(): boolean {
    return Boolean(!this.popoverActive && this.$slots.default);
  }

  public handleClose(): void {
    this.popoverActive = false;
  }

  public handleFocus(): void {
    if (this.shouldOpen) {
      this.popoverActive = true;
    }
  }

  public handleChange(): void {
    if (this.shouldOpen) {
      this.popoverActive = true;
    }
  }

  public handleBlur(): void {
    if (this.popoverActive) {
      this.popoverActive = false;
    }
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Combobox/Combobox.scss';
</style>
