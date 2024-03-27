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
import { watch, useSlots } from 'vue';
import { Spinner } from '@/components';
import { useListbox } from '@/use/useListbox';
import styles from '@polaris/components/Listbox/components/Loading/Loading.module.css';

interface LoadingProps {
  accessibilityLabel: string;
}

const props = defineProps<LoadingProps>();
const slots = useSlots();

const listboxContext = useListbox();

const { setLoading } = listboxContext;

watch(
  () => props.accessibilityLabel,
  () => {
    setLoading(props.accessibilityLabel);
    return () => setLoading(undefined);
  },
)
</script>
