<template lang="pug">
li(
  v-bind="sectionAttributes",
  tabIndex="-1",
  data-listbox-option,
  ref="listItemRef",
  :id="domId",
  :class="className",
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
  @mousedown="handleMouseDown",
)
  UnstyledLink(
    v-if="url",
    :url="url",
    :external="external",
  )
    slot(
      v-if="hasSlot(slots.default)",
    )
    TextOption(
      v-else,
      :selected="selected",
      :disabled="disabled",
    )
      slot
  template(v-else)
    slot(
      v-if="hasSlot(slots.default)",
    )
    TextOption(
      v-else,
      :selected="selected",
      :disabled="disabled",
    )
      slot
</template>

<script setup lang="ts">
import { inject, ref, computed, type VNode } from 'vue';
import { classNames } from '@/utilities/css';
import useId from '@/use/useId';
import { useHasSlot } from '@/use/useHasSlot';
import { listboxWithinSectionDataSelector } from '@polaris/components/Listbox/components/Section/selectors';
import TextOption from '../TextOption/TextOption.vue';
import { UnstyledLink } from '@/components';
import styles from '@polaris/components/Listbox/components/Option/Option.module.scss';
import type { VueNode } from '@/utilities/types';
import type { MappedActionContextType } from '@/utilities/auto-complete';
import type { ListboxContextType } from '@/utilities/types';

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

const props = withDefaults(defineProps<OptionProps>(), {
  disabled: false,
});
const slots = defineSlots<{
  // Children. When a string, children are rendered in a styled TextOption
  default?: (_?: VueNode) => VNode[];
}>();

//- Inject
const mappedActionContext = inject<MappedActionContextType>('mappedActionContext', {});
const sectionId = inject<string>('sectionContext', '');
const listboxContext = inject<ListboxContextType>('listboxContext', {
  onOptionSelect() { return },
  setLoading() { return },
});
const isAction = inject<boolean>('isAction', false);

const { role, url, external, onAction, destructive } = mappedActionContext;
const { onOptionSelect } = listboxContext;
const { hasSlot } = useHasSlot();

const listItemRef = ref<HTMLElement | null>(null);
const domId = String(useId());

const isWithinSection = computed(() => Boolean(sectionId));
const legacyRoleSupport = computed(() => role || 'option');
const className = computed(() => classNames(
  styles.Option,
  props.divider && styles.divider,
));

const sectionAttributes = {
  [listboxWithinSectionDataSelector.attribute]: isWithinSection.value,
};

const handleOptionSelect = (event: MouseEvent | KeyboardEvent) => {
  event.preventDefault();
  event.stopPropagation();
  onAction && onAction();
  if (listItemRef.value && !onAction) {
    onOptionSelect({
      domId,
      value: props.value,
      element: listItemRef.value,
      disabled: props.disabled,
    });
  }
};

const handleMouseDown = (event: MouseEvent): void => {
  event.preventDefault();
};
</script>
