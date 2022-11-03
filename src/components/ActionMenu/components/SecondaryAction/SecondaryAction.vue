<template lang="pug">
span(
  :class="className",
  ref="secondaryActionsRef",
)
  Tooltip(
    v-if="helpText || hasSlot(slots.helpText)",
    :content="helpText || ''",
  )
    template(
      v-if="hasSlot(slots.helpText)",
      #content,
    )
      slot(name="helpText")

    Button(
      v-bind="props",
      @click="$emit('click')",
    )
      slot
  Button(
    v-else,
    v-bind="props",
    @click="$emit('click')",
  )
    slot
</template>

<script setup lang="ts">
import { computed, ref, onMounted, useSlots } from 'vue';
import { classNames } from '@/utilities/css';
import styles from '@/classes/ActionMenu-SecondaryAction.json';
import { Button, Tooltip } from '@/components';
import { hasSlot } from '@/utilities/has-slot';
import type { IconSource } from '@/utilities/type';
import type { ConnectedDisclosure } from '@/components/Button/utils';

interface ButtonProps {
  id?: string;
  url?: string;
  external?: boolean;
  download?: string | boolean;
  submit?: boolean;
  disabled?: boolean;
  loading?: boolean;
  pressed?: boolean;
  accessibilityLabel?: string;
  role?: string;
  ariaControls?: string;
  ariaExpanded?: boolean;
  ariaDescribedBy?: string;
  primary?: boolean;
  destructive?: boolean;
  helpText?: string;
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

const props = defineProps<ButtonProps>();

const emits = defineEmits<{
  (e: 'click'): void;
  (e: 'get-offset-width', width: number): void;
}>();

const secondaryActionsRef = ref<HTMLSpanElement | null>(null);

const slots = useSlots();

const className = computed(() => {
  return classNames(
    styles.SecondaryAction,
    props.destructive && styles.destructive,
  );
});

onMounted(() => {
  onGetOffsetWidth(secondaryActionsRef.value?.offsetWidth || 0);
})

const onGetOffsetWidth = (width: number) => {
  if (secondaryActionsRef.value) {
    emits('get-offset-width', width);
  }
};
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/ActionMenu/components/SecondaryAction/SecondaryAction.scss';
</style>
