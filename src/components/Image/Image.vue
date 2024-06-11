<template lang="pug">
img(
  :ref="ref",
  :alt="alt",
  :src="source",
  :crossOrigin="crossOrigin",
  :src-set="finalSourceSet ? finalSourceSet : undefined",
  @load="handleLoad",
)
</template>

<script setup lang="ts">
import { computed, type Ref } from 'vue';

interface SourceSet {
  source?: string;
  descriptor?: string;
}

type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined;

export interface ImageProps {
  alt: string;
  source: string;
  crossOrigin?: CrossOrigin;
  sourceSet?: SourceSet[];
  ref?: Ref<HTMLImageElement>;
}

const props = defineProps<ImageProps>();
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
