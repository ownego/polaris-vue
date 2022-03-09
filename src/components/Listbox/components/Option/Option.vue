<template lang="pug">
li(
  v-bind="sectionAttributes",
  :id="domId",
  :class="className",
  ref="listItemRef",
  :role="legacyRoleSupport",
  :data-within-section="isWithinSection",
  :data-listbox-option-value="value",
  :data-listbox-option-destructive="destructive",
  :aria-disabled="disabled",
  :aria-label="accessibilityLabel",
  :aria-selected="selected",
  @click="handleOptionClick",
  @mousedown="handleMouseDown",
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
import { classNames } from 'polaris-react/src/utilities/css';
import {
  listboxWithinSectionDataSelector,
} from 'polaris-react/src/components/Listbox/components/Section/selectors';
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

const { role, url, external, onAction, destructive } = mappedActionContext;
const { onOptionSelect } = listboxContext;

const props = defineProps<OptionProps>();

const slots = useSlots();
const defaultSlot = computed(() => slots.default?.());

const listItemRef = ref<HTMLLIElement | null>(null);

const { useUniqueId } = UseUniqueId();
const domId = useUniqueId('ListboxOption');

const isWithinSection = computed(() => Boolean(sectionContext));

const sectionAttributes = {
  [listboxWithinSectionDataSelector.attribute]: isWithinSection.value,
};

const isSlotContainHTMLTag = computed(() => Boolean(
  defaultSlot.value
    && (defaultSlot.value.length >= 2
      || (defaultSlot.value[0]
        && defaultSlot.value[0].el?.nodeType !== 3)),
));

const legacyRoleSupport = computed(() => role || 'option');

const className = computed(() => classNames(
  styles.Option,
  props.divider && styles.divider,
));

const handleOptionClick = (event: MouseEvent) => {
  event.preventDefault();

  if (props.disabled) {
    return;
  }

  if (onAction) {
    onAction();
  }

  if (listItemRef.value && !onAction) {
    const params = {
      domId,
      value: props.value,
      element: listItemRef.value,
      disabled: props.disabled || false,
    };

    onOptionSelect(params);
  }  
}

const handleMouseDown = (event: MouseEvent): void => {
  event.preventDefault();
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Listbox/components/Option/Option.scss';
</style>
