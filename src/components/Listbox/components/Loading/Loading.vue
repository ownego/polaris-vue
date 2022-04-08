<template lang="pug">
li(:class="styles.ListItem", role="presentation")
  slot(v-if="$slots.default")
  div(v-else, :class="styles.Loading")
    Spinner(
      size="small",
      :accessibilityLabel="accessibilityLabel",
    )
</template>

<script setup lang="ts">
import { inject, watch } from 'vue';
import type { ListboxContextType, NavigableOption } from '@/utilities/interface';
import styles from '@/classes/Listbox-Loading.json';
import { Spinner } from '../../../Spinner';

export interface LoadingProps {
  accessibilityLabel: string;
}

const listboxContext = inject<ListboxContextType>('listboxContext', {
  onOptionSelect(option: NavigableOption): void { return },
  setLoading(label?: string): void { return },
});

const { setLoading } = listboxContext;

const props = defineProps<LoadingProps>();

watch(
  () => props.accessibilityLabel,
  () => {
    setLoading(props.accessibilityLabel);
    return () => setLoading(undefined);
  },
)
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Listbox/components/Loading/Loading.scss';
</style>
