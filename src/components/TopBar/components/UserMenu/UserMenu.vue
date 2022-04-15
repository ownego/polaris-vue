<template lang="pug">
Menu(
  :open="open",
  :actions="actions",
  :message="message",
  :color-scheme="colorScheme",
  :accessibilityLabel="accessibilityLabel",
  @open="$emit('toggle')",
  @close="$emit('toggle')",
)
  template(#activatorContent)
    MessageIndicator(:active="showIndicator")
      Avatar(
        size="small",
        :source="avatar",
        :initials="initials ? initials.replace(' ', '') : undefined",
      )
    span(:class="styles.Details")
      p(:class="styles.Name") {{ name }}
      p(:class="styles.Detail") {{ detail }}
</template>

<script setup lang="ts">
import { ref } from 'vue';
import styles from '@/classes/TopBar-UserMenu.json';
import type { IconableAction } from '@/utilities/type';
import { MessageIndicator, Avatar } from '@/components';
import type { AvatarProps } from '@/components/Avatar/utils';
import { Menu } from '../Menu';
import type{ MenuProps } from '../Menu/utils';

interface UserMenuProps {
  /** An array of action objects that are rendered inside of a popover triggered by this menu */
  actions: {items: IconableAction[]}[];
  /** Accepts a message that facilitates direct, urgent communication with the merchant through the user menu */
  message?: MenuProps['message'];
  /** A string detailing the merchant’s full name to be displayed in the user menu */
  name: string;
  /** A string allowing further detail on the merchant’s name displayed in the user menu */
  detail?: string;
  /** A string that provides the accessibility labeling */
  accessibilityLabel?: string;
  /** The merchant’s initials, rendered in place of an avatar image when not provided */
  initials: AvatarProps['initials'];
  /** An avatar image representing the merchant */
  avatar?: AvatarProps['source'];
  /** A boolean property indicating whether the user menu is currently open */
  open: boolean;
  /** Accepts a color scheme for the contents of the user menu */
  colorScheme?: MenuProps['colorScheme'];
}

const props = defineProps<UserMenuProps>();

const showIndicator = ref(!!props.message);
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/TopBar/components/UserMenu/UserMenu.scss';
</style>
