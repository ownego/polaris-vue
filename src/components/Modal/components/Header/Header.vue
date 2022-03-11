<template lang="pug">
div(:class="className")
  div(
    :id="id",
    :class="styles.Title",
  )
    DisplayText(element="h2", size="small")
      slot
  CloseButton(@click="emit('close')")
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { DisplayText } from '@/components/DisplayText';
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
@import 'polaris-react/src/components/Modal/components/Header/Header.scss';
</style>
