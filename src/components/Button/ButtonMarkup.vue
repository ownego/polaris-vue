<template lang="pug">
UnstyledButton(
  v-bind="{...commonProps, ...linkProps, ...actionProps}",
  v-on="$listeners",
)
  span(:class="contentClass")
    span(
      v-if="loading",
      :class="spinnerClass",
    )
      Spinner(size="small", accessibilityLabel="Loading")
    span(
      v-if="icon",
      :class="iconClass",
    )
      Icon(:source="loading ? 'placeholder': icon")
    span(
      v-if="children",
      :class="childrenClass",
      :key="actionProps.disabled ? 'text-disabled' : 'text'",
    )
      slot
    span(
      v-if="disclosure",
      :class="disclosureClass",
    )
      div
        Icon(:source="loading ? 'placeholder' :  getDisclosureIconSource()")
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import SelectMinor from '@icons/SelectMinor.svg';
import CaretUpMinor from '@icons/CaretUpMinor.svg';
import CaretDownMinor from '@icons/CaretDownMinor.svg';
import {
  ButtonProps, CommonButtonProps, LinkButtonProps, ActionButtonProps,
} from './utils';
import { UnstyledButton } from '../UnstyledButton';
import { Icon } from '../Icon';
import { Spinner } from '../Spinner';
import styles from '@/classes/Button.json';

@Component({
  components: {
    UnstyledButton,
    Icon,
    Spinner,
  },
})
export default class ButtonMarkup extends Vue {
  @Prop() public commonProps?: CommonButtonProps;

  @Prop() public linkProps?: LinkButtonProps;

  @Prop() public actionProps?: ActionButtonProps;

  @Prop() public removeUnderline?: ButtonProps['removeUnderline'];

  @Prop() public children?: ButtonProps['children'];

  @Prop() public disclosure?: ButtonProps['disclosure'];

  @Prop() public loading?: ButtonProps['loading'];

  @Prop() public icon?: ButtonProps['icon'];

  public contentClass = styles.Content;

  public spinnerClass = styles.Spinner;

  public disclosureClass = styles.Icon;

  get iconClass() {
    return classNames(styles.Icon, this.loading && styles.hidden);
  }

  get childrenClass() {
    return classNames(
      styles.Text,
      this.removeUnderline && styles.removeUnderline,
    );
  }

  public getDisclosureIconSource() {
    if (this.disclosure === 'select') {
      return SelectMinor;
    }

    return this.disclosure === 'up' ? CaretUpMinor : CaretDownMinor;
  }
}
</script>
