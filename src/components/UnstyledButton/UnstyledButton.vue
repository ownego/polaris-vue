<template lang="pug">
a(v-if="url && disabled", v-bind="commonProps")
  slot
UnstyledLink(
  v-else-if="url && !disabled",
  v-bind="interactiveProps",
  :url="url",
  :external="external",
  :download="download",
  v-on="linkListeners",
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
  v-on="buttonListeners",
)
  slot
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { UnstyledLink } from '@/components/UnstyledLink';
import { handleMouseUpByBlurring } from '@/utilities/focus';
import { capitalize } from 'lodash';

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

const attrs = useAttrs();

const getEventList = (events) => {
  const eventBindings = { mouseup: handleMouseUpByBlurring };
  events.forEach((event) => {
    const eventName = `on${capitalize(event)}`;
    if (attrs[eventName]) {
      eventBindings[event] = attrs[eventName];
    }
  });
  return eventBindings;
}

const buttonListeners = getEventList(
  ['blur', 'click', 'focus', 'keydown', 'keypress', 'keyup', 'mouseover', 'touchstart'],
);

const linkListeners = getEventList(['blur', 'click', 'focus', 'mouseover', 'touchstart']);

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
