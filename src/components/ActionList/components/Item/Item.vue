<template lang="pug">
li(:role="roleName")
  ScrollTo(v-if="active")
  UnstyledLink(
    v-if="url",
    :id="id",
    :url="disabled ? undefined : url",
    :class="className",
    :external="external",
    :aria-label="accessibilityLabel",
    :role="role",
    @click="onClick",
  )
    ContentElement(v-bind="contentElementProps")
      slot(name="suffix", slot="suffix")
      slot(name="prefix", slot="prefix")
  button(
    v-else,
    :id="id",
    type="button",
    :class="className",
    :disabled="disabled",
    :aria-label="accessibilityLabel",
    :role="role",
    @click="onClick",
    @mouseup="handleMouseUpByBlurring",
  )
    ContentElement(v-bind="contentElementProps")
      slot(name="suffix", slot="suffix")
      slot(name="prefix", slot="prefix")
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from 'polaris-react/src/utilities/css';
import { ScrollTo } from '@/components/Scrollable';
import { UnstyledLink } from '@/components/UnstyledLink';
import styles from '@/classes/ActionList.json';
import { handleMouseUpByBlurring } from '@/utilities/focus';
import type {
  IconableAction, DisableableAction, BadgeAction, DestructableAction,
} from '@/interface';
import ContentElement from './ContentElement.vue';

interface ActionListItemDescriptor
  extends IconableAction,
  DisableableAction,
  BadgeAction,
  DestructableAction {
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** Additional hint text to display with item */
  helpText?: string;
  /** Image source */
  image?: string;
  /** Prefix source */
  prefixId?: string;
  /** Suffix source */
  suffixId?: string;
  /**  Add an ellipsis suffix to action content */
  ellipsis?: boolean;
  /** Whether the action is active or not */
  active?: boolean;
  /** Defines a role for the action */
  role?: string;
}

const props = defineProps<ActionListItemDescriptor>();

const emit = defineEmits<{(event: 'action'): void}>();

const className = computed(() => classNames(
  styles.Item,
  props.disabled && styles.disabled,
  props.destructive && styles.destructive,
  props.active && styles.active,
));

const contentElementProps = computed(() => ({
  badge: props.badge,
  content: props.content,
  helpText: props.helpText,
  icon: props.icon,
  prefixId: props.prefixId,
  suffixId: props.suffixId,
  image: props.image,
  disabled: props.disabled,
  ellipsis: props.ellipsis,
  role: props.role,
}));

const roleName = computed(() => (props.role === 'menuitem' ? 'presentation' : undefined));

const onClick = () => {
  if (!props.disabled) {
    emit('action');
  }
};
</script>
