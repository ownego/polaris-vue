<template lang="pug">
Button(
  :key="key",
  :tone="tone",
  :variant="plainVariant || destructiveVariant",
  v-bind="bindProps",
  @click="handleClick",
) {{ action.content }}
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Button from './Button.vue';
import type { ComplexAction, ButtonProps } from './types';


interface Props {
  action: ComplexAction;
  overrides?: Partial<ButtonProps>,
  key?: string;
}

const props = defineProps<Props>();

const plainVariant = computed(() => props.action.plain ? 'plain' : undefined);
const destructiveVariant = computed(() => props.action.destructive ? 'primary' : undefined);
const tone = computed(() => {
  console.log('!props.overrides && props.action.destructive => ', !props.overrides, props.action.destructive);
  return !props.overrides && props.action.destructive ? 'critical' : props.overrides?.tone;
});
const bindProps = computed(() => {
  if (!props.action) {
    return {};
  }

  const { onAction, content, plain, destructive, ...other } = props.action;
  console.log('destructive => ', destructive);

  return { ...other, ...props.overrides };
});

const handleClick = () => {
  if (props.action && props.action.onAction) {
    props.action.onAction();
  }
};
</script>
