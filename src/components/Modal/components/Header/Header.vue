<template lang="pug">
div(:class="className")
  div(
    :id="id",
    :class="styles.Title",
  )
    Text(as="h2", variant="headingLg")
      slot
  CloseButton(
    :titleHidden="titleHidden",
    @click="emit('close')",
  )
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { Text } from '@/components';
import styles from '@/classes/Modal-Header.json';
import { CloseButton } from '../CloseButton';

interface Props {
  id?: string;
  titleHidden?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{ (event: 'close'): void }>();

const slots = useSlots();

const className = computed(() => {
  return props.titleHidden || !slots.default
    ? styles.titleHidden
    : styles.Header;
});
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Modal/components/Header/Header.scss';
</style>
