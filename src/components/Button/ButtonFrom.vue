<template lang="pug">
Button(
  :key="key",
  :tone="tone",
  :variant="plainVariant || destructiveVariant",
  v-bind="bindProps",
  @click="handleClick",
)
  template(v-if="action.content") {{ action.content }}
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
const tone = computed(() => !props.overrides?.tone && props.action.destructive ? 'critical' : props.overrides?.tone);
const bindProps = computed(() => {
  if (!props.action) {
    return {};
  }

  const { onAction, content, plain, destructive, ...other } = props.action;

  return { ...other, ...props.overrides };
});

const handleClick = () => {
  if (props.action && props.action.onAction) {
    props.action.onAction();
  }
};
</script>
