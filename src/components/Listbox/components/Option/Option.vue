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
  @click="handleOptionSelect",
  @keydown="handleOptionSelect",
  @mousedown="handleMouseDown",
)
  UnstyledLink(
    v-if="url",
    :url="url",
    :external="external",
  )
    slot(
      v-if="isSlotContainHTMLTag",
    )
    TextOption(
      v-else,
      :selected="selected",
      :disabled="disabled",
    )
      slot
  template(v-else)
    TextOption(
      v-if="!isSlotContainHTMLTag",
      :selected="selected",
      :disabled="disabled",
    )
      slot
    slot(
      v-else,
    )
</template>

<script setup lang="ts">
import { inject, ref, computed, type VNode } from 'vue';
import { classNames } from '@/utilities/css';
import useId from '@/use/useId';
import { listboxWithinSectionDataSelector } from '@polaris/components/Listbox/components/Section/selectors';
import TextOption from '../TextOption/TextOption.vue';
import { UnstyledLink } from '@/components';
import styles from '@polaris/components/Listbox/components/Option/Option.module.scss';
import { useListbox, useSection, useAction } from '@/use/useListbox';
import type { VueNode } from '@/utilities/types';
import type { MappedActionContextType } from '@/utilities/auto-complete';

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

const props = defineProps<OptionProps>();
const slots = defineSlots<{
  // Children. When a string, children are rendered in a styled TextOption
  default?: (_?: VueNode) => VNode[];
}>();

//- Inject
const mappedActionContext = inject<MappedActionContextType>('mapped-action-context', {});
const sectionId = useSection();
const listboxContext = useListbox();

const isAction = useAction();

const { role, url, external, onAction, destructive } = mappedActionContext;
const { onOptionSelect } = listboxContext;

const listItemRef = ref<HTMLElement | null>(null);
const domId = String(useId());

const isWithinSection = computed(() => Boolean(sectionId));
const legacyRoleSupport = computed(() => role || 'option');
const className = computed(() => classNames(
  styles.Option,
  props.divider && styles.divider,
));
const isSlotContainHTMLTag = computed(() => {
  return Boolean(
    slots.default
      && (slots.default().length >= 2
        || (slots.default()[0]
          && (slots.default()[0].type.toString() !== 'Symbol(Text)'
          && slots.default()[0].type.toString() !== 'Symbol()'
          && slots.default()[0].type.toString() !== 'Symbol(v-txt)')
        )),
  );
});

const sectionAttributes = {
  [listboxWithinSectionDataSelector.attribute]: isWithinSection.value,
};

const handleOptionSelect = (event: MouseEvent | KeyboardEvent) => {
  if (props.disabled) return;

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
