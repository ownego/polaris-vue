<template lang="pug">
a(v-if="url && disabled", v-bind="commonProps")
  slot
UnstyledLink(
  v-else-if="url && !disabled",
  v-bind="interactiveProps",
  :url="url",
  :external="external",
  :download="download",
  :target="target",
  @click="handleClick",
  v-on="linkListeners",
)
  slot
button(
  v-else,
  v-bind="interactiveProps",
  :aria-disabled="disabled",
  :disabled="disabled",
  :type="submit ? 'submit' : 'button'",
  :aria-busy="loading ? true : undefined",
  :aria-controls="ariaControls",
  :aria-expanded="ariaExpanded",
  :aria-describedby="ariaDescribedBy",
  :aria-checked="ariaChecked",
  :aria-pressed="pressed",
  :tabindex="disabled ? '-1' : undefined",
  @click="handleClick",
  v-on="buttonListeners",
)
  slot
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { handleMouseUpByBlurring } from '@/utilities/focus';
import { useDisableClick } from '@/utilities/use-disable-interaction';
import { UnstyledLink } from '../UnstyledLink';

type Target = '_blank' | '_self' | '_parent' | '_top';

export type UnstyledButtonProps = {
  /** A custom class name to apply styles to button */
  className?: string;
  /** A unique identifier for the button */
  id?: string;
  /** A destination to link to, rendered in the href attribute of a link */
  url?: string;
  /** Forces url to open in a new tab */
  external?: boolean;
  /** Where to display the url */
  target?: Target;
  /** Tells the browser to download the url instead of opening it. Provides a hint for the downloaded filename if it is a string value */
  download?: string | boolean;
  /** Allows the button to submit a form */
  submit?: boolean;
  /** Disables the button, disallowing merchant interaction */
  disabled?: boolean;
  /** Replaces button text with a spinner while a background action is being performed */
  loading?: boolean;
  /** Sets the button in a pressed state */
  pressed?: boolean;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** A valid WAI-ARIA role to define the semantic value of this element */
  role?: string;
  /** Id of the element the button controls */
  ariaControls?: string;
  /** Tells screen reader the controlled element is expanded */
  ariaExpanded?: boolean;
  /** Indicates the ID of the element that describes the button */
  ariaDescribedBy?: string;
  /** Indicates the current checked state of the button when acting as a toggle or switch */
  ariaChecked?: 'false' | 'true';
  others?: Record<string, unknown>;
}

const props = defineProps<UnstyledButtonProps>();

const attrs = useAttrs();

const getEventList = (events: string[]) => {
  const eventBindings: Record<string, any> = { mouseup: handleMouseUpByBlurring };

  for (const event of events) {
    const eventName = `on${capitalize(event)}`;
    if (attrs[eventName]) {
      eventBindings[event] = attrs[eventName];
    }
  }

  return eventBindings;
}

const buttonListeners = getEventList(
  ['blur', 'focus', 'keydown', 'keypress', 'keyup', 'mouseover', 'touchstart'],
);

const handleClick = () => useDisableClick(props.disabled, attrs.onClick as any);
const commonProps = computed(() => ({
  id: props.id,
  class: props.className,
  'aria-label': props.accessibilityLabel,
}));

const interactiveProps = computed(() => ({
  ...commonProps.value,
  ...props.others,
  role: props.role,
}));

const linkListeners = getEventList(['blur', 'focus', 'mouseover', 'touchstart']);

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
</script>
