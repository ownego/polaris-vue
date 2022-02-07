<template lang="pug">
div(:class="wrapperClassName")
  div(:class="contentClassName")
    div(
      v-if="allowMultiple && !isAction",
      :class="checkboxClassName",
    )
      Checkbox(:checked="selected")
        template(slot="label")
          slot(name="label")
    slot(v-else)
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Inject } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import { ComboboxListboxOptionType } from 'polaris-react/src/utilities/combobox/context';
import styles from '@/classes/Listbox-TextOption.json';
import { Checkbox } from '../../../Checkbox';

@Component({
  components: {
    Checkbox,
  },
})
export default class TextOption extends Vue {
  @Inject({ default: {} }) ComboboxListboxOptionContext!: ComboboxListboxOptionType;

  @Inject({ default: false }) ActionContext!: boolean;

  /**
   * Whether the option is selected
   */
  @Prop({ type: Boolean })
  public selected?: boolean;

  /**
   * Whether the option is disabled
   */
  @Prop({ type: Boolean })
  public disabled?: boolean;

  public contentClassName = styles.Content;

  public checkboxClassName = styles.Checkbox;

  get allowMultiple(): boolean {
    return Boolean(this.ComboboxListboxOptionContext.allowMultiple);
  }

  get isAction(): boolean {
    return this.ActionContext;
  }

  get wrapperClassName(): string {
    return classNames(
      styles.TextOption,
      this.selected && !this.allowMultiple && styles.selected,
      this.disabled && styles.disabled,
      this.allowMultiple && styles.allowMultiple,
      this.isAction && styles.isAction,
    );
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Listbox/components/TextOption/TextOption.scss';
</style>
