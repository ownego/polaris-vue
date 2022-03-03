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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onOptionSelect(option: NavigableOption): void {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLoading(label?: string): void {},
});

const props = defineProps<LoadingProps>();

watch(
  () => props.accessibilityLabel,
  () => {
    listboxContext.setLoading(props.accessibilityLabel);
    return () => {
      listboxContext.setLoading(undefined);
    };
  },
)
</script>

<style lang="scss">
@import 'polaris-react/src/components/Listbox/components/Loading/Loading.scss';
</style>
