<template lang="pug">
li(:class="styles.ListItem", role="presentation")
  slot(v-if="slots.default")
  div(v-else, :class="styles.Loading")
    Spinner(
      size="small",
      :accessibilityLabel="accessibilityLabel",
    )
</template>

<script setup lang="ts">
import { inject, watch, useSlots } from 'vue';
import { Spinner } from '@/components';
import type { ListboxContextType } from '@/utilities/types';
import styles from '@polaris/components/ListBox/components/Loading/Loading.module.scss';

interface LoadingProps {
  accessibilityLabel: string;
}

const props = defineProps<LoadingProps>();
const slots = useSlots();

const listboxContext = inject<ListboxContextType>('listboxContext', {
  onOptionSelect(): void { return },
  setLoading(): void { return },
});

const { setLoading } = listboxContext;

watch(
  () => props.accessibilityLabel,
  () => {
    setLoading(props.accessibilityLabel);
    return () => setLoading(undefined);
  },
)
</script>
