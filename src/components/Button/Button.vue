<template lang="pug">
UnstyledButton(
  v-bind="{...commonProps, ...linkProps, ...actionProps}",
  v-on="listeners",
  @mouseup="handleMouseUpByBlurring",
)
  span(:class="styles.Content")
    span(
      v-if="loading",
      :class="styles.Spinner",
    )
      Spinner(
        size="small"
        :accessibility-label="i18n.translate('Polaris.Button.spinnerAccessibilityLabel')"
      )
    span(
      v-if="icon",
      :class="iconClassName",
    )
      Icon(
        :source="loading ? 'placeholder' : icon",
      )
    span(
      v-if="hasChildren",
      :class="textClassName",
      :key="disabled ? 'text-disabled' : 'text'"
    )
      slot
    span(
      v-if="disclosure",
      :class="styles.Icon",
    )
      div(
        :class="disclosureClassName",
      )
        Icon(
          :source="loading ? 'placeholder' : getDisclosureIconSource(disclosure, ChevronUpMinor, ChevronDownMinor)"
        )
</template>

<script setup lang="ts">
import { computed, useCssModule, useSlots, useAttrs } from 'vue';
import { capitalize } from '@polaris/utilities/capitalize';
import { classNames, variationName } from '@/utilities/css';
import type { IconSource, VueNode } from '@/utilities/types';
import useI18n from '@/use/useI18n';
import type { ButtonProps, ButtonEmits } from './types';
import { Spinner, Icon } from '@/components';
import { UnstyledButton } from '../UnstyledButton';
import SelectMinor from '@icons/SelectMinor.svg';
import ChevronDownMinor from '@icons/ChevronDownMinor.svg';
import ChevronUpMinor from '@icons/ChevronUpMinor.svg';
import { handleMouseUpByBlurring } from '@/utilities/focus';

const DEFAULT_SIZE = 'medium';

defineSlots<{
  /** The content to display inside the button */
  default: (_: VueNode) => any;
}>();

defineEmits<ButtonEmits>();

const styles = useCssModule();
const slots = useSlots();
const attrs = useAttrs();
const i18n = useI18n();

const props = defineProps<ButtonProps>();

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

const hasChildren = computed(() => !!slots.default);
const isDisabled = computed(() => props.disabled || props.loading);
const className = computed(() => classNames(
  styles.Button,
  props.fullWidth && styles.fullWidth,
  props.icon && styles.iconOnly,
  isDisabled.value && styles.disabled,
  props.loading && styles.loading,
  props.pressed && !props.disabled && !props.url && styles.pressed,
  props.removeUnderline && styles.removeUnderline,
  props.size && props.size !== DEFAULT_SIZE && styles[variationName('size', props.size)],
  props.textAlign && styles[variationName('textAlign', props.textAlign)],
  props.tone && styles[variationName('tone', props.tone)],
  props.variant && styles[variationName('variant', props.variant)],
));
const iconClassName = computed(() => classNames(styles.Icon, props.loading && styles.hidden));
const textClassName = computed(() => classNames(styles.Text, props.removeUnderline && styles.removeUnderline));
const disclosureClassName = computed(() => classNames(styles.DisclosureIcon, props.loading && styles.hidden));
const commonProps = computed(() => {
  const { id, accessibilityLabel, ariaDescribedBy, role } = props;

  return {
    id,
    class: className.value,
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

function getDisclosureIconSource(
  disclosure: NonNullable<ButtonProps['disclosure']>,
  upIcon: IconSource,
  downIcon: IconSource,
) {
  if (disclosure === 'select') {
    return SelectMinor;
  }

  return disclosure === 'up' ? upIcon : downIcon;
}

</script>

<style lang="scss" module>
@import '@polaris/components/Button/Button.scss';
</style>
