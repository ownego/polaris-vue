<template lang="pug">
div
  template(v-if="keyboardEventsEnabled || comboboxListboxContext.textFieldFocused")
    KeypressListener(
      keyEvent="keydown",
      :keyCode="keyDownArrow",
      :handler="handleDownArrow",
    )
    KeypressListener(
      keyEvent="keydown",
      :keyCode="keyUpArrow",
      :handler="handleUpArrow",
    )
    KeypressListener(
      keyEvent="keydown",
      :keyCode="keyEnter",
      :handler="handleEnter",
    )
  VisuallyHidden
    div(aria-live="polite") {{ loading ? loading : null }}
  ul(
    v-if="$slots.default",
    tabindex="0",
    role="listbox",
    :class="listboxClassName",
    :aria-label="inCombobox ? undefined : accessibilityLabel",
    :aria-labelledby="comboboxListboxContext.textFieldLabelId || ''",
    :aria-busy="Boolean(loading)",
    :id="listId",
    @focus="handleFocus",
    @blur="handleBlur",
    ref="listboxRef",
  )
    slot
</template>

<script lang="ts">
import {
  Mixins,
  Component,
  Prop,
  Provide,
  Inject,
  Ref,
  Watch,
} from 'vue-property-decorator';
import debounce from 'lodash/debounce';
import { classNames } from 'polaris-react/src/utilities/css';
import { scrollIntoView } from 'polaris-react/src/utilities/scroll-into-view';
import { scrollable } from 'polaris-react/src/components/shared';
import type {
  ListboxContextType, NavigableOption,
} from 'polaris-react/src/utilities/listbox';
import { closestParentMatch } from 'polaris-react/src/utilities/closest-parent-match';
import {
  listboxSectionDataSelector,
} from 'polaris-react/src/components/Listbox/components/Section/selectors';
import { ComboboxListboxType } from 'polaris-react/src/utilities/combobox/context';
import styles from '@/classes/Listbox.json';
import { UseUniqueId } from '@/mixins';
import { Key, KeypressListener } from '../KeypressListener';
import { VisuallyHidden } from '../VisuallyHidden';

export type ArrowKeys = 'up' | 'down';

const LISTBOX_OPTION_SELECTOR = '[data-listbox-option]';
const LISTBOX_OPTION_VALUE_ATTRIBUTE = 'data-listbox-option-value';

const DATA_ATTRIBUTE = 'data-focused';
const ARIA_ATTRIBUTE = 'aria-activedescendant';

@Component({
  components: {
    KeypressListener,
    VisuallyHidden,
  },
})
export default class Listbox extends Mixins(UseUniqueId) {
  @Inject({ default: {} }) comboboxListboxContext!: ComboboxListboxType;

  @Provide() listboxContext: ListboxContextType = {
    onOptionSelect: this.onOptionSelect,
    setLoading: this.setLoading,
  };

  @Provide() withinListboxContext = true;

  @Ref() listboxRef!: HTMLUListElement;

  @Ref() scrollableRef!: HTMLElement;

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

  public listId = this.useUniqueId('Listbox');

  public currentActiveOption?: NavigableOption;

  public listboxClassName: string = classNames(styles.Listbox);

  public keyboardEventsEnabled = false;

  public keyDownArrow = Key.ArrowDown;

  public keyUpArrow = Key.ArrowUp;

  public keyEnter = Key.Enter;

  public loading = '';

  get inCombobox(): boolean {
    return Boolean(this.comboboxListboxContext.setActiveOptionId);
  }

  get listBoxId() {
    return this.comboboxListboxContext.listboxId || '';
  }

  @Watch('currentActiveOption', { deep: true })
  onCurrentActiveOptionChanged(): void {
    if (!this.currentActiveOption) return;

    if (this.comboboxListboxContext.setActiveOptionId) {
      this.comboboxListboxContext.setActiveOptionId(this.currentActiveOption.domId);
    }
  }

  @Watch('listboxId')
  @Watch('listId')
  onIdChanged() {
    if (
      this.comboboxListboxContext.setListboxId
      && !this.comboboxListboxContext.listboxId
    ) {
      this.comboboxListboxContext.setListboxId(this.listId);
    }
  }

  mounted(): void {
    if (this.listboxRef) {
      this.$refs.scrollableRef = this.listboxRef.closest(scrollable.selector) as HTMLElement;
    }
  }

  public setLoading(value: string): void {
    this.loading = value;
  }

  public handleScrollIntoView(option: NavigableOption, first: boolean): void {
    debounce(() => {
      if (this.scrollableRef) {
        const { element } = option;
        const focusTarget = first
          ? closestParentMatch(element, listboxSectionDataSelector.selector)
            || element
          : element;

        scrollIntoView(focusTarget, this.scrollableRef);
      }
    }, 15);
  }

  public handleChangeActiveOption(nextOption?: NavigableOption) {
    if (this.currentActiveOption) {
      this.currentActiveOption.element.removeAttribute(DATA_ATTRIBUTE);
    }

    if (nextOption) {
      nextOption.element.setAttribute(DATA_ATTRIBUTE, 'true');

      this.listboxRef.setAttribute(ARIA_ATTRIBUTE, nextOption.domId);

      if (this.scrollableRef) {
        const first = this.getNavigableOptions().findIndex(
          (element) => element.id === nextOption.element.id,
        ) === 0;

        this.handleScrollIntoView(nextOption, first);
      }

      this.currentActiveOption = nextOption;
    }
  }

  public onSelect(value: string): void {
    this.$emit('select', value);
  }

  public onOptionSelect(option: NavigableOption): void {
    this.handleChangeActiveOption(option);

    if (this.comboboxListboxContext.onOptionSelected) {
      this.comboboxListboxContext.onOptionSelected();
    }

    this.onSelect(option.value);
  }

  public findNextValidOption(type: ArrowKeys) {
    const isUp = type === 'up';
    const navItems = this.getNavigableOptions();
    let nextElement: HTMLElement | null | undefined = this.currentActiveOption?.element;
    let count = -1;

    // eslint-disable-next-line no-plusplus
    while (count++ < navItems.length) {
      let nextIndex;
      if (nextElement) {
        const currentId = nextElement?.id;
        const currentIndex = navItems.findIndex(
          (currentNavItem) => currentNavItem.id === currentId,
        );

        let increment = isUp ? -1 : 1;
        if (currentIndex === 0 && isUp) {
          increment = navItems.length - 1;
        } else if (currentIndex === navItems.length - 1 && !isUp) {
          increment = -(navItems.length - 1);
        }

        nextIndex = currentIndex + increment;
        nextElement = navItems[nextIndex];
      } else {
        nextIndex = isUp ? navItems.length - 1 : 0;
        nextElement = navItems[nextIndex];
      }

      // eslint-disable-next-line no-continue
      if (nextElement?.getAttribute('aria-disabled') === 'true') continue;

      if (
        nextIndex === navItems.length - 1
        && this.comboboxListboxContext.onKeyToBottom
      ) {
        this.comboboxListboxContext.onKeyToBottom();
      }
      return nextElement;
    }

    return null;
  }

  public handleArrow(type: ArrowKeys, evt: KeyboardEvent): void {
    evt.preventDefault();

    const nextValidElement = this.findNextValidOption(type);

    if (!nextValidElement) return;

    const nextOption = {
      domId: nextValidElement.id,
      value: nextValidElement
        .getAttribute(LISTBOX_OPTION_VALUE_ATTRIBUTE) || '',
      element: nextValidElement,
      disabled: nextValidElement.getAttribute('aria-disabled') === 'true',
    };

    this.handleChangeActiveOption(nextOption);
  }

  public handleDownArrow(evt: KeyboardEvent) {
    this.handleArrow('down', evt);
  }

  public handleUpArrow(evt: KeyboardEvent) {
    this.handleArrow('up', evt);
  }

  public handleEnter(evt: KeyboardEvent) {
    evt.preventDefault();
    evt.stopPropagation();

    if (this.currentActiveOption) {
      this.onOptionSelect(this.currentActiveOption);
    }
  }

  public handleFocus() {
    if (this.enableKeyboardControl || this.inCombobox) return;
    this.enableKeyboardControl = true;
  }

  public handleBlur(event: FocusEvent) {
    event.stopPropagation();

    if (this.enableKeyboardControl) {
      this.handleChangeActiveOption();
    }

    if (this.enableKeyboardControl || this.inCombobox) return;
    this.enableKeyboardControl = false;
  }

  public getNavigableOptions() {
    return [
      ...new Set(
        this.listboxRef.querySelectorAll<HTMLElement>(
          LISTBOX_OPTION_SELECTOR,
        ),
      ),
    ];
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Listbox/Listbox.scss';
</style>
