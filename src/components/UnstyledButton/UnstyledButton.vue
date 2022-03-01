<template lang="pug">
a(v-if="url && disabled", v-bind="commonProps")
  slot
UnstyledLink(
  v-else-if="url && !disabled",
  v-bind="interactiveProps",
  :url="url",
  :external="external",
  :download="download",
  @click="emit('click')",
  @focus="emit('focus')",
  @blur="emit('blur')",
  @mouseup="handleMouseUpByBlurring",
  @mouseover="emit('mouseover')",
  @touchstart="emit('touchstart')",
)
  slot
button(
  v-else,
  v-bind="commonProps",
  :role="role",
  :type="submit ? 'submit' : 'button'",
  :disabled="disabled",
  :aria-busy="loading ? true : undefined",
  :aria-controls="ariaControls",
  :aria-expanded="ariaExpanded",
  :aria-describedby="ariaDescribedBy",
  :aria-pressed="pressed",
  v-on="emit",
)
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { UnstyledLink } from '@/components/UnstyledLink';
import { handleMouseUpByBlurring } from '@/utilities/focus';
import type { BaseButton } from 'types/type';

interface UnstyledButtonProps extends BaseButton {
  /** A custom class name to apply styles to button */
  className?: string;
  others?: Record<string, unknown>;
}

const props = defineProps<UnstyledButtonProps>();

const emit = defineEmits<{(...args: [event: 'click']
  | [event: 'mouseover']
  | [event: 'focus']
  | [event: 'touchstart']
  | [event: 'blur']
  ): void;}>();

const commonProps = computed(() => ({
  id: props.id,
  class: props.className,
  'aria-label': props.accessibilityLabel,
}));

const interactiveProps = computed(() => ({
  ...commonProps,
  ...props.others,
  role: props.role,
}));
</script>
