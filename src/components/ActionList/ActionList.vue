<template lang="pug">
component(
  :is="element",
  ref="actionListRef",
  :role="elementRole",
  :class="classNames(styles.ActionList)",
  :tabIndex="elementTabIndex",
)
  template(v-for="section, index in finalSections")
    Section(
      v-if="section.items && section.items.length > 0",
      :key="section.title || index",
      :firstSection="index === 0",
      :section="section",
      :hasMultipleSections="hasMultipleSections",
      :actionRole="actionRole",
      @action-any-item="emit('action-any-item')",
    )
      template(v-for="{prefixId} in section.items" #[`prefix-${prefixId}`])
        slot(:name="`prefix-${prefixId}`")
      template(v-for="{suffixId} in section.items" #[`suffix-${suffixId}`])
        slot(:name="`suffix-${suffixId}`")
  template(v-if="actionRole === 'menuitem'")
    KeypressListener(
      keyEvent="keydown",
      :keyCode="Key.ArrowDown",
      :handler="handleFocusNextItem",
    )
    KeypressListener(
      keyEvent="keydown",
      :keyCode="Key.ArrowUp",
      :handler="handleFocusPreviousItem",
    )
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import { wrapFocusPreviousFocusableMenuItem, wrapFocusNextFocusableMenuItem } from '@/utilities/focus';
import { KeypressListener } from '@/components/KeypressListener';
import { Key } from '@/components/KeypressListener/utils';
import styles from '@/classes/ActionList.json';
import { Section } from './components/Section';
import type { ActionListItemDescriptor, ActionListSection } from './utils';

interface ActionListProps {
  /** Collection of actions for list */
  items?: readonly ActionListItemDescriptor[];
  /** Collection of sectioned action items */
  sections?: readonly ActionListSection[];
  /** Defines a specific role attribute for each action in the list */
  actionRole?: string | 'menuitem';
}

const props = withDefaults(defineProps<ActionListProps>(), {
  sections: () => [],
  items: undefined,
  actionRole: undefined,
});

const emit = defineEmits<{ (event: 'action-any-item'): void }>();

const actionListRef = ref<HTMLElement | null>(null);

const finalSections = computed((): readonly ActionListSection[] => {
  if (props.items) {
    return [{ items: props.items }, ...props.sections];
  }

  if (props.sections) {
    return props.sections;
  }

  return [];
});

const hasMultipleSections = computed((): boolean => finalSections.value.length > 1);

const element = computed((): string => (hasMultipleSections.value ? 'ul' : 'div'));

const elementRole = computed((): string | undefined =>
  hasMultipleSections.value && props.actionRole === 'menuitem' ? 'menu' : undefined,
);

const elementTabIndex = computed((): number | undefined =>
  hasMultipleSections.value && props.actionRole === 'menuitem' ? -1 : undefined,
);

const handleFocusPreviousItem = (evt: KeyboardEvent) => {
  evt.preventDefault();
  const target = evt.target as HTMLElement;
  if (actionListRef.value && target) {
    if (actionListRef.value.contains(target)) {
      wrapFocusPreviousFocusableMenuItem(actionListRef.value, target);
    }
  }
};

const handleFocusNextItem = (evt: KeyboardEvent) => {
  evt.preventDefault();
  const target = evt.target as HTMLElement;
  if (actionListRef.value && target) {
    if (actionListRef.value.contains(target)) {
      wrapFocusNextFocusableMenuItem(actionListRef.value, target);
    }
  }
};
</script>
<style lang="scss">
@import 'polaris/polaris-react/src/components/ActionList/ActionList.scss';
</style>
