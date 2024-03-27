<template lang="pug">
li(
  v-bind="sectionAttributes",
  tabindex="-1",
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
    slot(v-if="isSlotContainHtmlTags")
    TextOption(
      v-else,
      v-model="model",
      :disabled="disabled",
    )
      slot
  template(v-else)
    slot(v-if="isSlotContainHtmlTags")
    TextOption(
      v-else,
      v-model="model",
      :disabled="disabled",
    )
      slot
</template>

<script setup lang="ts">
import { inject, ref, computed, type VNode, onMounted, watch, type ComputedRef } from 'vue';
import { classNames } from '@/utilities/css';
import useId from '@/use/useId';
import { listboxWithinSectionDataSelector } from '@polaris/components/Listbox/components/Section/selectors';
import TextOption from '../TextOption/TextOption.vue';
import { UnstyledLink } from '@/components';
import styles from '@polaris/components/Listbox/components/Option/Option.module.css';
import { useAction, useListbox, useSection } from '@/use/useListbox';
import { useHasSlot } from '@/use/useHasSlot';
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

const model = defineModel<boolean>();

onMounted(() => {
  model.value = props.selected;
});

watch(
  () => props.selected,
  (newVal) => {
    model.value = newVal;
  }, { immediate: true },
);

//- Inject
const mappedActionContext = inject<ComputedRef<MappedActionContextType>>('mapped-action', computed(() => ({})));
const sectionId = useSection();
const listboxContext = useListbox();

const { isSlotContainHtml } = useHasSlot();
const isAction = useAction();

const { role, url, external, onAction, destructive } = mappedActionContext.value;
const { onOptionSelect } = listboxContext;

const listItemRef = ref<HTMLElement | null>(null);
const domId = String(useId());

const isWithinSection = computed(() => Boolean(sectionId));
const legacyRoleSupport = computed(() => role || 'option');
const className = computed(() => classNames(
  styles.Option,
  props.divider && styles.divider,
));

const sectionAttributes = computed(() => ({
  [listboxWithinSectionDataSelector.attribute]: isWithinSection.value,
}));

const isSlotContainHtmlTags = computed(() => {
  return isSlotContainHtml(slots.default);
});

const handleOptionSelect = (event: MouseEvent | KeyboardEvent) => {
  if (props.disabled) return;

  event.preventDefault();
  event.stopPropagation();

  model.value = !model.value;
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
