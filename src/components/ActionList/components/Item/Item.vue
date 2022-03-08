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
      template(#suffix)
        slot(name="suffix")
      template(#prefix)
        slot(name="prefix")
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
      template(#suffix)
        slot(name="suffix")
      template(#prefix)
        slot(name="prefix")
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from 'polaris-react/src/utilities/css';
import { ScrollTo } from '@/components/Scrollable';
import { UnstyledLink } from '@/components/UnstyledLink';
import styles from '@/classes/ActionList.json';
import { handleMouseUpByBlurring } from '@/utilities/focus';
import ContentElement from './ContentElement.vue';
import type { IconSource } from 'types/type';

interface Props {
  id?: string;
  content?: string;
  url?: string;
  external?: boolean;
  badge?: {
    status: 'new';
    content: string;
  };
  destructive?: boolean;
  disabled?: boolean;
  icon?: IconSource;
  accessibilityLabel?: string;
  helpText?: string;
  image?: string;
  prefixId?: string;
  suffixId?: string;
  ellipsis?: boolean;
  active?: boolean;
  role?: string;
  onAction?(): void;
  onMouseEnter?(): void;
  onTouchStart?(): void;
}

const props = defineProps<Props>();

const emit = defineEmits<{ (event: 'action'): void }>();

const className = computed(() =>
  classNames(
    styles.Item,
    props.disabled && styles.disabled,
    props.destructive && styles.destructive,
    props.active && styles.active,
  ),
);

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
