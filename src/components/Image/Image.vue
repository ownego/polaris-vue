<template lang="pug">
img(
  :src="source",
  :src-set="finalSourceSet ? finalSourceSet : undefined",
  :crossOrigin="crossOrigin",
  @load="handleLoad",
)
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { SourceSetImage } from './utils';

type CrossOrigin = 'anonymous' | 'use-credentials' | '';

interface Props {
  source: string;
  crossOrigin?: CrossOrigin;
  sourceSet?: SourceSetImage[];
}

const props = defineProps<Props>();
const emits = defineEmits<{
  (e: 'load'): void;
}>();

const finalSourceSet = computed(() => props.sourceSet
  ? props.sourceSet
    .map(({ source: subSource, descriptor }) => `${subSource} ${descriptor}`).join(',')
  : null,
);

const handleLoad = () => {
  emits('load');
};
</script>
