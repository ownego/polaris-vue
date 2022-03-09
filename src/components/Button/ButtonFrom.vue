<template lang="pug">
template(v-if="action")
  Button(
    v-bind="bindProps",
    @click="handleClick",
  ) {{ action.content }}
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import type { ComplexAction } from '@/utilities/interface';
import { Button } from '@/components/Button';
import type { ButtonProps } from './utils';

interface Props {
  action: ComplexAction;
  overrides?: Partial<ButtonProps>;
}

const props = withDefaults(defineProps<Props>(), {
  overrides: () => ({}),
});

const handleClick = () => {
  if (props.action.onAction) {
    props.action.onAction();
  }
};

const bindProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onAction, content, ...other } = props.action;
  return { ...other, ...props.overrides };
});
</script>
