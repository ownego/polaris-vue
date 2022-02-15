<template lang="pug">
  PolarisTextField(
    v-bind="$props",
    :id="textFieldId",
    @focus="handleFocus",
    @blur="handleBlur",
    @change="handleChange",
    autoComplete="list",
    aria-haspopup="listbox",
    :ariaActiveDescendant="comboboxTextFieldContext.activeOptionId",
    :ariaControls="comboboxTextFieldContext.listboxId",
    :ariaExpanded="comboboxTextFieldContext.expanded",
  )
    template(slot="label")
      slot(name="label")
    template(slot="help-text")
      slot(name="help-text")
    template(slot="prefix")
      slot(name="prefix")
    template(slot="suffix")
      slot(name="suffix")
    template(slot="connected-left")
      slot(name="connected-left")
    template(slot="connected-right")
      slot(name="connected-right")
</template>

<script lang="ts">
import { UseUniqueId } from '@/mixins';
import {
  Inject,
  Prop,
  Component,
  Mixins,
} from 'vue-property-decorator';
import type { ComboboxTextFieldType } from 'polaris-react/src/utilities/combobox/context';
import { labelID } from '../../../Label';
import { TextField as PolarisTextField, TextFieldProps } from '../../../TextField';

@Component({
  components: {
    PolarisTextField,
  },
})
export default class TextField extends Mixins(UseUniqueId) {
  @Inject() comboboxTextFieldContext!: ComboboxTextFieldType;

  @Prop({ type: String })
  public placeholder?: TextFieldProps['placeholder'];

  @Prop({ type: String })
  public value?: TextFieldProps['value'];

  @Prop({ type: Object })
  public labelAction?: TextFieldProps['labelAction'];

  @Prop({ type: Boolean })
  public labelHidden?: TextFieldProps['labelHidden'];

  @Prop({ type: Boolean })
  public disabled?: TextFieldProps['disabled'];

  @Prop({ type: Boolean })
  public clearButton?: TextFieldProps['clearButton'];

  @Prop({ type: Boolean })
  public readOnly?: TextFieldProps['readOnly'];

  @Prop({ type: Boolean })
  public autoFocus?: TextFieldProps['autoFocus'];

  @Prop({ type: Boolean })
  public focused?: TextFieldProps['focused'];

  @Prop({ type: [Boolean, Number] })
  public multiline?: TextFieldProps['multiline'];

  @Prop({ type: [String, Boolean, Array, Object, Function] })
  public error?: TextFieldProps['error'];

  @Prop({ type: String })
  public type?: TextFieldProps['type'];

  @Prop({ type: String })
  public name?: TextFieldProps['name'];

  @Prop({ type: String })
  public id?: TextFieldProps['id'];

  @Prop({ type: String })
  public role?: TextFieldProps['role'];

  @Prop({ type: Number })
  public step?: TextFieldProps['step'];

  @Prop({ type: [Number, String] })
  public max?: TextFieldProps['max'];

  @Prop({ type: Number })
  public maxLength?: TextFieldProps['maxLength'];

  @Prop({ type: [Number, String] })
  public maxHeight?: TextFieldProps['maxHeight'];

  @Prop({ type: [Number, String] })
  public min?: TextFieldProps['min'];

  @Prop({ type: Number })
  public minLength?: TextFieldProps['minLength'];

  @Prop({ type: String })
  public pattern?: TextFieldProps['pattern'];

  @Prop({ type: String })
  public inputMode?: TextFieldProps['inputMode'];

  @Prop({ type: Boolean })
  public spellCheck?: TextFieldProps['spellCheck'];

  @Prop({ type: String })
  public ariaOwns?: TextFieldProps['ariaOwns'];

  @Prop({ type: String })
  ariaAutocomplete?: TextFieldProps['ariaAutocomplete'];

  @Prop({ type: Boolean })
  showCharacterCount?: TextFieldProps['showCharacterCount'];

  @Prop({ type: String })
  align?: TextFieldProps['align'];

  @Prop({ type: Boolean })
  requiredIndicator?: TextFieldProps['requiredIndicator'];

  @Prop({ type: Boolean })
  monospaced?: TextFieldProps['monospaced'];

  public uniqueId = this.useUniqueId('ComboboxTextField');

  get textFieldId(): string {
    return this.id || this.uniqueId;
  }

  get labelId(): string {
    return labelID(this.id || this.uniqueId);
  }

  created(): void {
    if (!this.comboboxTextFieldContext) {
      throw new Error('No Combobox was provided. Your component must be wrapped in a <Combobox> component.');
    }
  }

  mounted(): void {
    if (this.comboboxTextFieldContext.setTextFieldLabelId) {
      this.comboboxTextFieldContext.setTextFieldLabelId(this.labelId);
    }
  }

  public handleFocus(): void {
    this.$emit('focus');

    if (this.comboboxTextFieldContext.onTextFieldFocus) {
      this.comboboxTextFieldContext.onTextFieldFocus();
    }

    if (this.comboboxTextFieldContext.setTextFieldFocused) {
      this.comboboxTextFieldContext.setTextFieldFocused(true);
    }
  }

  public handleBlur(): void {
    this.$emit('blur');

    if (this.comboboxTextFieldContext.onTextFieldBlur) {
      this.comboboxTextFieldContext.onTextFieldBlur();
    }

    if (this.comboboxTextFieldContext.setTextFieldFocused) {
      this.comboboxTextFieldContext.setTextFieldFocused(false);
    }
  }

  public handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;

    this.$emit('input', target.value);
    this.$emit('change', event);

    if (this.comboboxTextFieldContext.onTextFieldChange) {
      this.comboboxTextFieldContext.onTextFieldChange();
    }
  }
}
</script>
