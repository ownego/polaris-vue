<template lang="pug">
UnstyledButton(
  :key="key",
  v-bind="bindProps",
  @click="action.onAction",
) {{ action.content }}
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ComplexAction } from '@/interface';
import { UnstyledButtonProps } from './utils';
import UnstyledButton from './UnstyledButton.vue';

interface Props {
  action: ComplexAction;
  overrides?: Partial<UnstyledButtonProps>;
  key?: any;
}

const props = defineProps<Props>();

const bindProps = computed(() => {
  const { content, onAction, ...rest } = props.action;
  return {
    ...rest,
    ...props.overrides,
  };
});
</script>
