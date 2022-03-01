<template lang="pug">
div(
  v-if="connectedDisclosure",
  :class="styles.ConnectedDisclosureWrapper"
)
  ButtonMarkup(
    v-on="{...$listeners, mouseup: handleMouseUpByBlurring}",
    v-bind="buttonMarkupProps",
  )
    slot
  Popover(
    :active="disclosureActive",
    preferredAlignment="right",
    @close="toggleDisclosureActive",
  )
    button(
      slot="activator",
      type="button",
      :class="connectedDisclosureClassName",
      :disabled="connectedDisclosureData.disabled",
      :aria-label="connectedDisclosureData.disclosureLabel",
      :aria-describedby="ariaDescribedBy",
      @click="toggleDisclosureActive",
      @mouseup="handleMouseUpByBlurring",
    )
      span
        Icon(:source="CaretDownMinor")
    ActionList(
      slot="content",
      :items="connectedDisclosure.actions",
      @action-any-item="toggleDisclosureActive",
    )
      template(v-for="{prefixId, suffixId} in connectedDisclosure.actions")
        slot(v-if="prefixId", :name="`prefix-${prefixId}`", :slot="`prefix-${prefixId}`")
        slot(v-if="suffixId", :name="`suffix-${suffixId}`", :slot="`suffix-${suffixId}`")
ButtonMarkup(
  v-else,
  v-on="{...$listeners, mouseup: handleMouseUpByBlurring}",
  v-bind="buttonMarkupProps",
)
  slot
</template>

<script setup lang="ts">
import {
  computed, ref, withDefaults, useSlots,
} from 'vue';
import { classNames, variationName } from 'polaris-react/src/utilities/css';
import CaretDownMinor from '@icons/CaretDownMinor.svg';
import { handleMouseUpByBlurring } from '@/utilities/focus';
import type { IconSource, BaseButton } from 'types/type';
import styles from '@/classes/Button.json';
import type { ConnectedDisclosure } from './utils';
import { VisuallyHidden } from '../VisuallyHidden';
import { Popover } from '../Popover';
import { ActionList } from '../ActionList';
import { Icon } from '../Icon';
import ButtonMarkup from './ButtonMarkup.vue';

interface Props extends BaseButton {
  children?: string | string[];
  primary?: boolean;
  destructive?: boolean;
  size?: 'slim' | 'medium' | 'large';
  textAlign?: 'left' | 'right' | 'center';
  outline?: boolean;
  fullWidth?: boolean;
  disclosure?: 'down' | 'up' | 'select' | boolean;
  plain?: boolean;
  monochrome?: boolean;
  removeUnderline?: boolean;
  icon?: IconSource;
  connectedDisclosure?: ConnectedDisclosure;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
});

const slots = useSlots();

const disclosureActive = ref<boolean>(false);

const children = ref<boolean>(!!slots.default);

const isDisabled = computed(() => props.disabled || props.loading);

const className = computed(() => {
  const textAlignVariation = props.textAlign
    && variationName('textAlign', props.textAlign) as keyof typeof styles;
  const sizeVariation = props.size && variationName('size', props.size) as keyof typeof styles;

  return classNames(
    styles.Button,
    props.primary && styles.primary,
    props.outline && styles.outline,
    props.destructive && styles.destructive,
    isDisabled.value && styles.disabled,
    props.loading && styles.loading,
    props.plain && styles.plain,
    props.pressed && !props.disabled && !props.url && styles.pressed,
    props.monochrome && styles.monochrome,
    props.size !== 'medium' && sizeVariation && styles[sizeVariation],
    textAlignVariation && styles[textAlignVariation],
    props.fullWidth && styles.fullWidth,
    props.icon && !props.children && styles.iconOnly,
    props.connectedDisclosure && styles.connectedDisclosure,
    props.removeUnderline && styles.removeUnderline,
  );
});

const connectedDisclosureClassName = computed(() => {
  const textAlignVariantion = props.textAlign
    && variationName('textAlign', props.textAlign) as keyof typeof styles;
  const sizeVariantion = props.size && variationName('size', props.size) as keyof typeof styles;

  return classNames(
    styles.Button,
    props.primary && styles.primary,
    props.outline && styles.outline,
    props.size !== 'medium' && sizeVariantion && styles[sizeVariantion],
    textAlignVariantion && styles[textAlignVariantion],
    props.destructive && styles.destructive,
    props.connectedDisclosure && props.connectedDisclosure.disabled && styles.disabled,
    styles.iconOnly,
    styles.ConnectedDisclosure,
    props.monochrome && styles.monochrome,
  );
});

const commonProps = computed(() => {
  const {
    id, accessibilityLabel, role, ariaDescribedBy,
  } = props;
  return {
    id, className: className.value, accessibilityLabel, role, ariaDescribedBy,
  };
});

const linkProps = computed(() => {
  const { url, external, download } = props;
  return { url, external, download };
});

const actionProps = computed(() => {
  const { submit, loading, pressed } = props;
  return {
    submit, loading, pressed, disabled: isDisabled.value,
  };
});

const buttonMarkupProps = computed(() => {
  const {
    removeUnderline, disclosure, loading, icon,
  } = props;
  return {
    commonProps: commonProps.value,
    linkProps: linkProps.value,
    actionProps: actionProps.value,
    removeUnderline,
    children: children.value,
    disclosure,
    loading,
    icon,
  };
});

const connectedDisclosureData = computed(() => {
  if (props.connectedDisclosure) {
    const {
      disabled,
      accessibilityLabel: disclosureLabel = 'Related actions',
    } = props.connectedDisclosure;

    return { disabled, disclosureLabel };
  }
  return {};
});

const toggleDisclosureActive = () => {
  disclosureActive.value = !disclosureActive.value;
};
</script>

<style lang="scss">
@import 'polaris-react/src/components/Button/Button.scss';
</style>
