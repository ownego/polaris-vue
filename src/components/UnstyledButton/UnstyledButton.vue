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
  v-on="events",
)
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { UnstyledLink } from '@/components/UnstyledLink';
import { handleMouseUpByBlurring } from '@/utilities/focus';

interface Props {
  id?: string;
  url?: string;
  external?: boolean;
  download?: string | boolean;
  submit?: boolean;
  disabled?: boolean;
  loading?: boolean;
  pressed?: boolean;
  accessibilityLabel?: string;
  role?: string;
  ariaControls?: string;
  ariaExpanded?: boolean;
  ariaDescribedBy?: string;
  className?: string;
  others?: Record<string, unknown>;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: 'blur'): void;
  (event: 'click'): void;
  (event: 'focus'): void;
  (event: 'keydown'): void;
  (event: 'keypress'): void;
  (event: 'keyup'): void;
  (event: 'mouseover'): void;
  (event: 'touchstart'): void;
}>();

const events = computed(() => {
  return {
    blur: emit('blur'),
    click: emit('click'),
    focus: emit('focus'),
    keydown: emit('keydown'),
    keypress: emit('keypress'),
    keyup: emit('keyup'),
    mouseover: emit('mouseover'),
    touchstart: emit('touchstart'),
    mouseup: handleMouseUpByBlurring,
  };
});

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
