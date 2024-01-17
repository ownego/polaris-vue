<template lang="pug">
//- TittleMarkup
template(v-if="slots.title || section.title")
  Box(
    v-if="section.title && !slots.title",
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
      v-for="(item, index) in section.items",
      :key="`${item.content}-${index}`",
      :role="actionRole === 'menuitem' ? 'presentation' : undefined",
    )
      InlineStack(:wrap="false")
        Item(
          :content="item.content",
          :help-text="item.helpText",
          :role="actionRole",
          :url="item.url",
          :disabled="item.disabled",
          :icon="item.icon",
          :image="item.image",
          :prefix="item.prefix",
          :badge="item.badge",
          :truncate="item.truncate",
          :ellipsis="item.ellipsis",
          :active="item.active",
          :external="item.external",
          :target="item.target",
          :accessibility-label="item.accessibilityLabel",
          :variant="item.variant",
          @action="handleAction(item.onAction)",
        )

</template>

<script setup lang="ts">
import { VNode, computed } from 'vue';
import {
  Box,
  Text,
  InlineStack,
  BlockStack,
} from '@/components';
import Item from '../Item/Item.vue';
import type { ActionListItemDescriptor, ActionListSection, VueNode } from '../../../../utilities/types';

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
const slots = defineSlots<{
  title?: (_?: VueNode) => VNode[];
}>()
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
