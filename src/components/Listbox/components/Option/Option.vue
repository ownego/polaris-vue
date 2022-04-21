<template lang="pug">
li(
  v-bind="sectionAttributes",
  :id="domId",
  :class="className",
  ref="listItemRef",
  :role="legacyRoleSupport",
  :data-within-section="isWithinSection",
  :data-listbox-option-value="value",
  :data-listbox-option-action="isAction",
  :data-listbox-option-destructive="destructive",
  :aria-disabled="disabled",
  :aria-label="accessibilityLabel",
  :aria-selected="selected",
  @click="disabled ? undefined : handleOptionSelect",
  @keydown="disabled ? undefined : handleOptionSelect",
  @mousedown="handleOptionSelect",
  tabindex="-1",
  data-listbox-option,
)
  UnstyledLink(
    v-if="url",
    :url="url",
    :external="external",
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

<script setup lang="ts">
import { inject, ref, computed, useSlots } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import {
  listboxWithinSectionDataSelector,
} from 'polaris/polaris-react/src/components/Listbox/components/Section/selectors';
import type { ListboxContextType, NavigableOption } from '@/utilities/interface';
import type { MappedActionContextType } from '@/utilities/autocomplete';
import { UseUniqueId } from '@/use';
import styles from '@/classes/Listbox-Option.json';
import { TextOption } from '../TextOption';
import { UnstyledLink } from '../../../UnstyledLink';

interface OptionProps {
  // Unique item value
  value: string;
  // Visually hidden text for screen readers
  accessibilityLabel?: string;
  // Option is selected
  selected?: boolean;
  // Option is disabled
  disabled?: boolean;
  // Adds a border-bottom to the Option
  divider?: boolean;
}

const mappedActionContext = inject<MappedActionContextType>('mappedActionContext', {});
const sectionContext = inject<string>('sectionContext', '');
const listboxContext = inject<ListboxContextType>('listboxContext', {
  onOptionSelect(option: NavigableOption) { return },
  setLoading(label?: string) { return },
});
const isAction = inject<boolean>('isAction', false);

const { role, url, external, onAction, destructive } = mappedActionContext;
const { onOptionSelect } = listboxContext;

const props = defineProps<OptionProps>();

const slots = useSlots();

const listItemRef = ref<HTMLLIElement | null>(null);

const { useUniqueId } = UseUniqueId();
const domId = useUniqueId('ListboxOption');

const isWithinSection = computed(() => Boolean(sectionContext));

const sectionAttributes = {
  [listboxWithinSectionDataSelector.attribute]: isWithinSection.value,
};

const isSlotContainHTMLTag = computed(() => {
  return Boolean(
    slots.default
      && (slots.default().length >= 2
        || (slots.default()[0]
          && (slots.default()[0].type.toString() !== 'Symbol(Text)'
          && slots.default()[0].type.toString() !== 'Symbol()')
        )),
  );
});

const legacyRoleSupport = computed(() => role || 'option');

const className = computed(() => classNames(
  styles.Option,
  props.divider && styles.divider,
));

const handleOptionSelect = (event: MouseEvent | KeyboardEvent): void => {
  event.preventDefault();
  onAction && onAction();

  if (listItemRef.value && !onAction) {
    onOptionSelect({
      domId,
      value: props.value,
      element: listItemRef.value,
      disabled: props.disabled || false,
    })
  }
};

const handleMouseDown = (event: MouseEvent): void => {
  event.preventDefault();
};
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Listbox/components/Option/Option.scss';
</style>
