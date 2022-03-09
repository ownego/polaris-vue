<template lang="pug">
img(
  v-if="finalSourceSet",
  :src="source",
  :srcSet="sourceSet",
  :crossOrigin="crossOrigin",
)
img(
  v-else,
  :src="source",
  :crossOrigin="crossOrigin",
)
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface SourceSet {
  source: string;
  descriptor?: string;
}

type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined;

interface Props {
  source: string;
  crossOrigin?: CrossOrigin;
  sourceSet?: SourceSet[];
}

const props = defineProps<Props>();

const finalSourceSet = computed(() => props.sourceSet
  ? props.sourceSet
    .map(({ source: subSource, descriptor }) => `${subSource} ${descriptor}`).join(',')
  : null,
);
</script>
