<template lang="pug">
div(:class="className")
  p(v-if="section.title", :class="styles.Title") {{ section.title }}
  ul(
    :class="styles.Actions",
    :role="sectionRole",
    :tabIndex="!hasMultipleSections ? -1 : undefined"
  )
    li(
      v-for="{content, helpText, onAction, ...item}, index in section.items",
      :key="`${content}-${index}`",
      :role="actionRole === 'menuitem' ? 'presentation' : undefined",
    )
      Item(
        :content="content",
        :helpText="helpText",
        :role="actionRole",
        v-bind="{...item}",
        @action="handleAction(onAction)",
      )
        template(v-if="item.prefixId", #prefix)
          slot(:name="`prefix-${item.prefixId}`")
        template(v-if="item.suffixId", #suffix)
          slot(:name="`suffix-${item.suffixId}`")
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import styles from '@/classes/ActionList.json';
import { Item } from '../Item';
import type { ActionListItemDescriptor, ActionListSection } from '../../utils';

interface SectionProps {
  /** Section of action items */
  section: ActionListSection;
  /** Should there be multiple sections */
  hasMultipleSections: boolean;
  /** Defines a specific role attribute for each action in the list */
  actionRole?: 'option' | 'menuitem' | string;
}

const props = defineProps<SectionProps>();

const emit = defineEmits<{ (event: 'action-any-item'): void }>();

const className = computed(() => (props.section.title ? undefined : styles['Section-withoutTitle']));

const sectionRole = computed(() => {
  let sectionRoleValue;

  switch (props.actionRole) {
  case 'option':
    sectionRoleValue = 'presentation';
    break;
  case 'menuitem':
    sectionRoleValue = !props.hasMultipleSections ? 'menu' : 'presentation';
    break;
  default:
    sectionRoleValue = undefined;
    break;
  }

  return sectionRoleValue;
});

const handleAction = (onAction: ActionListItemDescriptor['onAction']) => {
  if (onAction) {
    onAction();
  }
  emit('action-any-item');
};
</script>
