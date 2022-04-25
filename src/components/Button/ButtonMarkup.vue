<template lang="pug">
UnstyledButton(
  v-bind="{...commonProps, ...linkProps, ...actionProps}",
  v-on="listeners",
)
  span(:class="styles.Content")
    span(
      v-if="loading",
      :class="styles.Spinner",
    )
      Spinner(size="small", accessibilityLabel="Loading")
    span(
      v-if="icon",
      :class="iconClass",
    )
      Icon(:source="loading ? 'placeholder': icon")
    span(
      v-if="children",
      :class="childrenClass",
      :key="actionProps && actionProps.disabled ? 'text-disabled' : 'text'",
    )
      slot
    span(
      v-if="disclosure",
      :class="styles.Icon",
    )
      div
        Icon(:source="loading ? 'placeholder' : getDisclosureIconSource")
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import SelectMinor from '@icons/SelectMinor.svg';
import CaretUpMinor from '@icons/CaretUpMinor.svg';
import CaretDownMinor from '@icons/CaretDownMinor.svg';
import styles from '@/classes/Button.json';
import type {
  ButtonProps, CommonButtonProps, LinkButtonProps, ActionButtonProps,
} from './utils';
import { UnstyledButton } from '../UnstyledButton';
import { Icon } from '../Icon';
import { Spinner } from '../Spinner';
import type { IconSource } from '@/utilities/type';
import { capitalize } from '@/utilities/capitalize';

interface Props {
  commonProps?: CommonButtonProps;
  linkProps?: LinkButtonProps;
  actionProps?: ActionButtonProps;
  removeUnderline?: ButtonProps['removeUnderline'];
  children?: boolean;
  disclosure?: ButtonProps['disclosure'];
  loading?: ButtonProps['loading'];
  icon?: ButtonProps['icon'];
}

const props = defineProps<Props>();

const attrs = useAttrs();

const listeners = computed(() => {
  const events = ['blur', 'click', 'focus', 'keydown', 'keypress', 'keyup', 'mouseover', 'touchstart'];
  const eventBindings: Record<string, unknown> = {};
  events.forEach((event) => {
    const eventName = `on${capitalize(event)}`;
    if (attrs[eventName]) {
      eventBindings[event] = attrs[eventName];
    }
  });
  return eventBindings;
});

const iconClass = computed(() => {
  return classNames(styles.Icon, props.loading && styles.hidden);
});

const childrenClass = computed(() => {
  return classNames(
    styles.Text,
    props.removeUnderline && styles.removeUnderline,
  );
});

const getDisclosureIconSource = computed<IconSource>(() => {
  if (props.disclosure === 'select') {
    return SelectMinor;
  }

  return props.disclosure === 'up' ? CaretUpMinor : CaretDownMinor;
});
</script>
