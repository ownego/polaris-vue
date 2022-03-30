<template lang="pug">
Popover(
  fixed,
  :active="open",
  :full-height="isFullHeight",
  preferredAlignment="right",
  :color-scheme="colorScheme",
  @close="$emit('close')",
)
  template(#activator)
    div(:class="styles.ActivatorWrapper")
      button(
        type="button",
        :class="styles.Activator",
        :aria-label="accessibilityLabel",
        @click="$emit('open')",
      )
        slot(name="activatorContent")
  template(#content)
    ActionList(
      :sections="actions",
      @action-any-item="$emit('close')",
    )
    Message(
      v-if="message && message.action && message.link",
      :title="message.title",
      :description="message.description",
      :action="{ onClick: message.action.onClick, content: message.action.content }",
      :link="{ to: message.link.to, content: message.link.content }",
      :badge="badgeProps",
    )
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import styles from '@/classes/TopBar-Menu.json';
import type { ActionListProps } from '@/components/ActionList/utils';
import type { PopoverProps } from '@/components/Popover/utils';
import type { MessageProps } from './components/Message/utils';
import { Popover, ActionList } from '@/components';
import { Message } from './components';

interface MenuProps {
  /** An array of action objects that are rendered inside of a popover triggered by this menu */
  actions: ActionListProps['sections'];
  /** Accepts a message that facilitates direct, urgent communication with the merchant through the menu */
  message?: MessageProps;
  /** A boolean property indicating whether the menu is currently open */
  open: boolean;
  /** Accepts a color scheme for the contents of the menu */
  colorScheme?: PopoverProps['colorScheme'];
  /** A string that provides the accessibility labeling */
  accessibilityLabel?: string;
}

const props = defineProps<MenuProps>();

const isFullHeight = computed(() => !!props.message);

const badgeProps = props.message && props.message.badge && {
  content: props.message.badge.content,
  status: props.message.badge.status,
};
</script>

<style lang="scss">
@import 'polaris-react/src/components/TopBar/components/Menu/Menu.scss';
</style>
