<template lang="pug">
ButtonGroupItem(v-if="action")
  Button(
    v-bind="bindProps",
    @click="action.onAction",
  ) {{ action.content }}
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue';
import type { ComplexAction } from '@/utilities/interface';
// import { ButtonGroupItem } from '@/components/ButtonGroup';
import { Button } from '@/components/Button';
import type { ButtonProps } from './utils';

interface Props {
  action: ComplexAction;
  overrides?: Partial<ButtonProps>;
}

const props = withDefaults(defineProps<Props>(), {
  overrides: () => ({}),
});

const bindProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onAction, content, ...other } = props.action;
  return { ...other, ...props.overrides };
});
</script>
