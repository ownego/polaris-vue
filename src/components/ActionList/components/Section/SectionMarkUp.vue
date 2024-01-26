<template lang="pug">
//- TittleMarkup
template(v-if="slots.title || section.title")
  Box(
    v-if="section.title",
    paddingBlockStart="300"
    paddingBlockEnd="100"
    paddingInlineStart="300"
    paddingInlineEnd="300"
  )
    Text(
      as="p",
      variant="headingSm"
    ) {{ section.title }}
  Box(
    v-else,
    padding="200",
    paddingInlineEnd="150",
  )
    slot(name="title")
//- End TittleMarkup
Box(
  as="div",
  padding="150",
  :padding-block-stack="hasMultipleSections ? '0' : undefined",
  :tabIndex="!hasMultipleSections ? -1 : undefined",
)
  BlockStack(
    gap="150",
    as="ul",
    :role="sectionRole || undefined",
  )
    Box(
      as="li",
      v-for="({content, helpText, onAction, ...item}, index) in section.items",
      :key="`${content}-${index}`",
      :role="actionRole === 'menuitem' ? 'presentation' : undefined",
    )
      InlineStack(:wrap="false")
        Item(
          v-bind="item",
          :content="content",
          :help-text="helpText",
          :role="actionRole",
          @action="handleAction(onAction)",
        )
          template(v-if="item.prefixId", #prefix)
            slot(:name="`prefix-${item.prefixId}`")
          template(v-if="item.suffixId", #suffix)
            slot(:name="`suffix-${item.suffixId}`")
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import {
  Box,
  Text,
  InlineStack,
  BlockStack,
} from '@/components';
import Item from '../Item/Item.vue';
import type { ActionListItemDescriptor, ActionListSection } from '../../../../utilities/types';

interface Props {
    /** Section of action items */
  section: ActionListSection;
  /** Should there be multiple sections */
  hasMultipleSections: boolean;
  /** Defines a specific role attribute for each action in the list */
  actionRole?: 'option' | 'menuitem' | string;
  /** Callback when any item is clicked or keypressed */
  onActionAnyItem?: ActionListItemDescriptor['onAction'];
  /** Whether it is the first in a group of sections */
  isFirst?: boolean;
}

const props = defineProps<Props>();
const slots = useSlots();
const emit = defineEmits<{
  'action-any-item': [];
}>();

const handleAction = (itemOnAction: ActionListItemDescriptor['onAction']) => {
  return () => {
    if (itemOnAction) {
      itemOnAction();
    }

    emit('action-any-item');
  };
};

const sectionRole = computed(() => {
  if (props.actionRole) {
    if (props.actionRole === 'option') {
      return 'presentation';
    }

    if (props.actionRole === 'menuitem') {
      return !props.hasMultipleSections ? 'menu' : 'presentation';
    }

    return undefined;
  }

  return undefined
})
</script>