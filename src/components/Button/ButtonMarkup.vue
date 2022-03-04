<template lang="pug">
UnstyledButton(
  v-bind="{...commonProps, ...linkProps, ...actionProps}",
  v-on="events",
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

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from 'polaris-react/src/utilities/css';
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
import type { IconSource } from 'types/type';

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

const props = defineProps<Props>();

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
  };
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
