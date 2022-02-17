<template lang="pug">
li(
  v-bind="sectionAttributes",
  :id="domId",
  :class="className",
  ref="listItemRef",
  tabindex="-1",
  @mousedown="handleMouseDown",
  :data-within-section="isWithinSection",
  :data-listbox-option-value="value",
  :data-listbox-option-destructive="mappedActionContext.destructive",
  :aria-disabled="disabled",
  @click="handleOptionClick",
  :role="legacyRoleSupport",
  :aria-label="accessibilityLabel",
  :aria-selected="selected",
  data-listbox-option,
)
  UnstyledLink(
    v-if="mappedActionContext.url",
    :url="mappedActionContext.url",
    :external="mappedActionContext.external",
  )
    TextOption(
      v-if="!isSlotContainHTMLTag",
      :selected="selected",
      :disabled="disabled",
    )
      slot
    slot(v-else)
  template(v-else)
    TextOption(
      v-if="!isSlotContainHTMLTag",
      :selected="selected",
      :disabled="disabled",
    )
      slot
    slot(v-else)
</template>

<script lang="ts">
import {
  Component,
  Mixins,
  Prop,
  Inject,
  Ref,
} from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import {
  listboxWithinSectionDataSelector,
} from 'polaris-react/src/components/Listbox/components/Section/selectors';
import { ListboxContextType } from 'polaris-react/src/utilities/listbox';
import { UseUniqueId } from '@/mixins';
import styles from '@/classes/Listbox-Option.json';
import { TextOption } from '../TextOption';
import { UnstyledLink } from '../../../UnstyledLink';
import { MappedActionContextType, OptionProps } from './utils';

@Component({
  components: {
    TextOption,
    UnstyledLink,
  },
})
export default class ListBox extends Mixins(UseUniqueId) {
  @Inject({ default: {} }) mappedActionContext!: MappedActionContextType;

  @Inject({ default: '' }) sectionContext!: string;

  @Inject({ default: {} }) listboxContext!: ListboxContextType;

  @Ref() listItemRef!: HTMLLIElement

  /**
   * Unique item values
   */
  @Prop({ type: String, required: true })
  public value!: OptionProps['value'];

  /**
   * Visually hidden text for screen readers
   */
  @Prop({ type: String })
  public accessibilityLabel?: OptionProps['accessibilityLabel'];

  /**
   * Option is selected
   */
  @Prop({ type: Boolean })
  public selected?: OptionProps['selected'];

  /**
   * Option is disabled
   * @default false
   */
  @Prop({ type: Boolean, default: false })
  public disabled?: OptionProps['disabled'];

  /**
   * Adds a border-bottom to the Option
   */
  @Prop({ type: Boolean })
  public divider?: OptionProps['divider'];

  public isWithinSection = Boolean(this.sectionContext);

  public sectionAttributes = {
    [listboxWithinSectionDataSelector.attribute]: this.isWithinSection,
  }

  get className(): string {
    return classNames(
      styles.Option,
      this.divider && styles.divider,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  get domId(): string {
    return this.useUniqueId('ListboxOption');
  }

  get legacyRoleSupport(): string {
    return this.mappedActionContext.role || 'option';
  }

  get isSlotContainHTMLTag(): boolean {
    return Boolean(
      this.$slots.default
      && this.$slots.default.length < 2
      && this.$slots.default[0]?.tag,
    );
  }

  public handleOptionClick(event: MouseEvent): void {
    event.preventDefault();

    if (this.disabled) return;

    if (this.mappedActionContext.onAction) {
      this.mappedActionContext.onAction();
    }

    if (this.listItemRef && !this.mappedActionContext.onAction) {
      const params = {
        domId: this.domId,
        value: this.value,
        element: this.listItemRef,
        disabled: this.disabled || false,
      };

      if (this.listboxContext.onOptionSelect) {
        this.listboxContext.onOptionSelect(params);
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  public handleMouseDown(event: MouseEvent): void {
    event.preventDefault();
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Listbox/components/Option/Option.scss';
</style>
