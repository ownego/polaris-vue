<template lang="pug">
UnstyledButton(
  v-bind="{...commonProps, ...linkProps, ...actionProps}",
  v-on="listeners",
  @mouseup="handleMouseUpByBlurring",
)
  span(v-if="loading", :class="styles.Spinner")
    Spinner(
      size="small",
      :accessibility-label="i18n.translate('Polaris.Button.spinnerAccessibilityLabel')",
    )
  span(
    v-if="icon",
    :class="loading ? styles.hidden : styles.Icon",
  )
    Icon(:source="loading ? 'placeholder' : icon")
  span(
    v-if="hasChildren",
    :class="removeUnderline ? styles.removeUnderline : ''",
    :key="disabled ? 'text-disabled' : 'text'"
  )
    slot
  span(
    v-if="disclosure",
    :class="loading ? styles.hidden : styles.Icon",
  )
    Icon(:source="disclosureIconSource")
</template>

<script setup lang="ts">
import { computed, useSlots, useAttrs } from 'vue';
import { capitalize } from '@polaris/utilities/capitalize';
import { classNames, variationName } from '@/utilities/css';
import type { VueNode } from '@/utilities/types';
import useI18n from '@/use/useI18n';
import { useHasSlot } from '@/use/useHasSlot';
import type { ButtonProps } from './types';
import { Spinner, Icon } from '@/components';
import { UnstyledButton } from '../UnstyledButton';
import SelectIcon from '@icons/SelectIcon.svg';
import ChevronDownIcon from '@icons/ChevronDownIcon.svg';
import ChevronUpIcon from '@icons/ChevronUpIcon.svg';
import { handleMouseUpByBlurring } from '@/utilities/focus';
import styles from '@polaris/components/Button/Button.module.scss';

defineSlots<{
  /** The content to display inside the button */
  default: (_: VueNode) => any;
}>();

const slots = useSlots();
const attrs = useAttrs();
const i18n = useI18n();
const { hasSlot } = useHasSlot();

const props = withDefaults(defineProps<ButtonProps>(), {
  size: 'medium',
  textAlign: 'center',
  variant: 'secondary',
});

const listeners = computed(() => {
  const events = ['blur', 'click', 'focus', 'keydown', 'keypress', 'keyup', 'mouseenter', 'touchstart', 'pointerdown'];
  const eventBindings: Record<string, unknown> = {};

  for (const event of events) {
    const eventName = `on${capitalize(event)}`;

    if (attrs[eventName]) {
      eventBindings[event] = attrs[eventName];
    }
  }

  return eventBindings;
});

const hasChildren = computed(() => hasSlot(slots.default));
const isDisabled = computed(() => props.disabled || props.loading);
const className = computed(() => classNames(
  styles.Button,
  styles.pressable,
  styles[variationName('variant', props.variant)],
  styles[variationName('size', props.size)],
  styles[variationName('textAlign', props.textAlign)],
  props.fullWidth && styles.fullWidth,
  props.disclosure && styles.disclosure,
  props.icon && hasSlot(slots.default) && styles.iconWithText,
  props.icon && !hasSlot(slots.default) && styles.iconOnly,
  isDisabled.value && styles.disabled,
  props.loading && styles.loading,
  props.pressed && !props.disabled && !props.url && styles.pressed,
  props.removeUnderline && styles.removeUnderline,
  props.tone && styles[variationName('tone', props.tone)],
));

const commonProps = computed(() => {
  const { id, accessibilityLabel, ariaDescribedBy, role } = props;

  return {
    id,
    className: className.value,
    role,
    accessibilityLabel,
    ariaDescribedBy,
    'data-primary-link': props.dataPrimaryLink,
  };
});
const linkProps = computed(() => {
  const { external, url, download } = props;

  return {
    url,
    external,
    download,
  };
});
const actionProps = computed(() => {
  const { submit, loading, ariaChecked, ariaControls, ariaExpanded, pressed } = props;

  return {
    submit,
    disabled: isDisabled.value,
    loading,
    ariaChecked,
    ariaControls,
    ariaExpanded,
    pressed,
  };
});

const disclosureIconSource = computed(() => {
  if (props.loading) {
    return 'placeholder';
  }

  if (props.disclosure === 'select') {
    return SelectIcon;
  }

  return props.disclosure === 'up' ? ChevronUpIcon : ChevronDownIcon;
})
</script>
