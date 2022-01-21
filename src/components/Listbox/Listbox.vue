<template lang="pug">
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Component,
  Prop,
  Inject,
} from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/Listbox.json';
import { useUniqueId } from '@/utilities/unique-id';
import type { NavigableOption } from 'polaris-react/src/utilities/listbox';
import { closestParentMatch } from 'polaris-react/src/utilities/closest-parent-match';
import { ListboxContext, WithinListboxContext } from 'polaris-react/src/utilities/listbox';
import {
  listboxSectionDataSelector,
} from 'polaris-react/src/components/Listbox/components/Section/selectors';
import { ComboboxListboxType } from 'polaris-react/src/utilities/combobox/context';
import { KeypressListener } from '../KeypressListener';
import { VisuallyHidden } from '../VisuallyHidden';
import {
  Option,
  Section,
  Header,
  Action,
  Loading,
  TextOption,
} from './components';

export type ArrowKeys = 'up' | 'down';

export const scrollable = {
  props: { 'data-polaris-scrollable': true },
  selector: '[data-polaris-scrollable]',
};

const LISTBOX_OPTION_SELECTOR = '[data-listbox-option]';
const LISTBOX_OPTION_VALUE_ATTRIBUTE = 'data-listbox-option-value';

const DATA_ATTRIBUTE = 'data-focused';

@Component({
  components: {
    KeypressListener,
    VisuallyHidden,
  },
})
export default class Listbox extends Vue {
  @Inject({ default: {} }) comboboxListboxContext?: ComboboxListboxType;

  /**
   * Explicitly enable keyboard control
   */
  @Prop({ type: Boolean })
  public enableKeyboardControl?: boolean;

  /**
   * Visually hidden text for screen readers
   */
  @Prop({ type: String })
  public accessibilityLabel?: string;

  public currentActiveOption!: NavigableOption;

  public listboxClassName = classNames(styles.Listbox);

  public listId = useUniqueId('Listbox');

  get inCombobox(): boolean {
    return Boolean(
      this.comboboxListboxContext
      && this.comboboxListboxContext.setActiveOptionId,
    );
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Listbox/Listbox.scss';
</style>
