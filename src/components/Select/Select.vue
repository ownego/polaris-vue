<template lang="pug">
Labelled(
  :id="selectId",
  :error="error",
  :action="labelAction",
  :label-hidden="selectLabelHidden",
  :required-indicator="requiredIndicator",
)
  template(
    v-if="!labelInline",
    slot="label",
  )
    <!-- @slot Label for the select -->
    slot(name="label")
  template(slot="help-text")
    <!-- @slot Slot for additional text to aide in use -->
    slot(name="help-text")
  div(:class="className")
    select(
      :id="selectId",
      :name="name",
      :class="classInput",
      :disabled="disabled",
      v-model="selectValue",
      @focus="$emit('focus')",
      @blur="$emit('blur')",
      :aria-invalid="error",
      :aria-describedby="describedBy",
      :aria-required="requiredIndicator",
    )
      template(
        v-for="option in optionsMarkup",
      )
        optgroup(
          v-if="isGroup(option)",
          :label="option.title",
          :key="option.title",
        )
          template(
            v-for="option, index in option.options",
          )
            option(
              :key="option.value",
              :value="option.value",
              :disabled="option.disabled",
            ) {{ option.label }}
        option(
          :key="option.value",
          :value="option.value",
          :disabled="option.disabled",
        ) {{ option.label }}

    div(
      :class="classContent",
      aria-hidden,
      :aria-disabled="disabled",
    )
      span(
        v-if="labelInline",
        :class="classInlineLabel"
      )
        slot(name="label")
      div(
        v-if="$slots[`prefix-${selectedOption.id}`]",
        :class="classPrefix",
      )
        slot(:name="`prefix-${selectedOption.id}`")
      span(:class="classSelectedOption")
        slot(
          v-if="$slots[`label-${selectedOption.id}`]",
          :name="`label-${selectedOption.id}`"
        )
        template(v-else) {{ selectedOption.label }}
      span(:class="classIcon")
        Icon(:source="iconSelectMinor")
    div(:class="classBackdrop")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import type { Action } from 'types/type';
import { classNames } from 'polaris-react/src/utilities/css';
import SelectMinor from '@icons/SelectMinor.svg';
import { useUniqueId } from '@/utilities/unique-id';
import styles from '@/classes/Select.json';
import { StrictOption, SelectOption, SelectGroup } from './utils';
import { Icon } from '../Icon';
import { Labelled } from '../Labelled';
import { helpTextID } from '../Labelled/utils';

interface HideableStrictOption extends StrictOption {
  hidden?: boolean;
}

interface StrictGroup {
  /** Title for the group */
  title: string;
  /** List of options */
  options: StrictOption[];
}

@Component({
  components: {
    Icon,
    Labelled,
  },
})
export default class Select extends Vue {
  /** Disable input */
  @Prop({ type: Boolean })
  disabled!: boolean;

  /** List of options or option groups to choose from */
  @Prop({ type: Array })
  options!: (SelectOption | SelectGroup)[];

  /** Adds an action to the label */
  @Prop({ type: [String, Array, Object, Function] })
  labelAction?: Action;

  /** Visually hide the label */
  @Prop({ type: Boolean })
  labelHidden?: boolean;

  /** Show the label to the left of the value, inside the control */
  @Prop({ type: Boolean })
  labelInline?: boolean;

  /** Example text to display as placeholder */
  @Prop({ type: String })
  placeholder?: string;

  /** ID for form input */
  @Prop({ type: String })
  id?: string;

  /** Name for form input */
  @Prop({ type: String })
  name!: string;

  /** Value for form input */
  @Prop({ type: [String, Object, Array, Boolean, Number] })
  value?: string | object | boolean | number;

  /**
   * Display an error state
   * @type {Boolean}
  */
  @Prop({ type: [String, Array, Object, Function] })
  error?: Error | boolean;

  /** Visual required indicator, add an asterisk to label */
  @Prop({ type: Boolean })
  requiredIndicator?: boolean;

  iconSelectMinor = SelectMinor;

  selected: string | object | boolean | number | undefined = '';

  selectId = '';

  optionsMarkup: (HideableStrictOption | StrictGroup)[] = [];

  describedBy: string[] = [];

  classInput = classNames(styles.Input);

  classContent = classNames(styles.Content);

  classInlineLabel = classNames(styles.InlineLabel);

  classPrefix = classNames(styles.Prefix);

  classSelectedOption = classNames(styles.SelectedOption);

  classIcon = classNames(styles.Icon);

  classBackdrop = classNames(styles.Backdrop);

  normalizedOptions: (StrictOption | StrictGroup)[] = [];

  get selectLabelHidden() {
    return this.labelInline ? true : this.labelHidden;
  }

  get className() {
    return classNames(
      styles.Select,
      this.error && styles.error,
      this.disabled && styles.disabled,
    );
  }

  get selectValue() {
    return this.selected;
  }

  set selectValue(value) {
    this.selected = value;
    /**
    * Callback when selection is changed
    * @property {string} value the value of the selected option
    */
    this.$emit('change', value);

    /**
    * Callback when input is triggered
    * @property {string} value the value of the selected option
    */
    this.$emit('input', value);
  }

  /**
   * Ungroups an options array
   */
  get flattenOptions() {
    let flatOptions: HideableStrictOption[] = [];

    this.normalizedOptions.forEach((optionOrGroup) => {
      if (this.isGroup(optionOrGroup)) {
        const optionGroup = optionOrGroup as StrictGroup;
        flatOptions = flatOptions.concat(optionGroup.options);
      } else {
        flatOptions.push(optionOrGroup as HideableStrictOption);
      }
    });

    return flatOptions;
  }

  /**
   * Gets the text to display in the UI, for the currently selected option
   */
  get selectedOption() {
    const selectedOption = this.flattenOptions.find((option) => this.value === option.value);
    return selectedOption || { value: '', label: '' };
  }

  created() {
    this.selected = this.value;

    this.selectId = useUniqueId('Select', this.id);

    if (this.$slots['help-text']) {
      this.describedBy.push(helpTextID(this.id || ''));
    }

    if (this.error) {
      this.describedBy.push(`${this.id}Error`);
    }

    this.normalizedOptions = this.options.map(this.normalizeOption);

    // Add placeholder option to the first of the list
    if (this.placeholder) {
      this.normalizedOptions.unshift({
        label: this.placeholder,
        value: '',
        disabled: true,
      });
    }

    this.optionsMarkup = this.normalizedOptions.map((opt) => this.normalizeOption(opt));
  }

  isString = (option: SelectOption | SelectGroup): boolean => typeof option === 'string';

  isGroup = (option: SelectOption | SelectGroup): boolean => (
    typeof option === 'object'
      && 'options' in option
      && option.options != null
  );

  normalizeStringOption = (option: string): StrictOption => ({
    label: option,
    value: option,
  });

  /**
   * Converts a string option (and each string option in a Group) into
   * an Option object.
   */
  normalizeOption = (
    option: SelectOption | SelectGroup,
  ): HideableStrictOption | StrictGroup => {
    if (this.isString(option)) {
      return this.normalizeStringOption(option as string);
    }

    if (this.isGroup(option)) {
      const { title, options } = option as SelectGroup;
      return {
        title,
        options: options.map((opt) => (
          this.isString(opt)
            ? this.normalizeStringOption(opt as string)
            : opt
        )) as StrictOption[],
      };
    }

    return option as StrictOption;
  }
}
</script>
<style lang="scss">
@import 'polaris-react/src/components/Select/Select.scss';
</style>
