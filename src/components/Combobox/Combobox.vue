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
  public popoverActive = false;

  public activeOptionId = '';

  public listboxId = '';

  public textFieldFocused = false;

  public textFieldLabelId = '';

  @Prop({ type: Boolean })
  public allowMultiple?: boolean;

  @Prop({ type: String, default: 'below' })
  public preferredPosition?: PreferredPosition;

  @Provide() comboboxTextFieldContext = {
    activeOptionId: this.activeOptionId,
    expanded: this.popoverActive,
    listboxId: this.listboxId,
    setTextFieldFocus: () => { this.textFieldFocused = true; },
    setTextFieldLabelId: (id: string) => { this.textFieldLabelId = id; },
    onTextFieldFocus: this.handleFocus,
    onTextFieldChange: this.handleChange,
    onTextFieldBlur: this.handleBlur,
  }

  @Provide() comboboxListboxContext = {
    setActiveOptionId: (id: string) => { this.activeOptionId = id; },
    setListboxId: (id: string) => { this.listboxId = id; },
    listboxId: this.listboxId,
    textFieldLabelId: this.textFieldLabelId,
    onOptionSelected: this.onOptionSelected,
    textFieldFocused: this.textFieldFocused,
    onKeyToBottom: () => { this.$emit('scrolled-to-bottom'); },
  }

  @Provide() comboboxListboxOptionContext = {
    allowMultiple: this.allowMultiple,
  }

  public listboxClassName = styles.Listbox;

  get shouldOpen(): boolean {
    return Boolean(!this.popoverActive && this.$slots.default);
  }

  public onOptionSelected(): void {
    if (!this.allowMultiple) {
      this.popoverActive = false;
      this.activeOptionId = '';
    }
  }

  public handleClose(): void {
    this.popoverActive = false;
    this.activeOptionId = '';
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
      this.activeOptionId = '';
    }
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Combobox/Combobox.scss';
</style>
