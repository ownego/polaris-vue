<template lang="pug">
img(
  :src="source",
  :src-set="finalSourceSet ? finalSourceSet : undefined",
  :crossOrigin="crossOrigin",
  :class="className",
  @load="handleLoad",
)
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import styles from '@/classes/Image.json';
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

const status = ref('loading');

const finalSourceSet = computed(() => props.sourceSet
  ? props.sourceSet
    .map(({ source: subSource, descriptor }) => `${subSource} ${descriptor}`).join(',')
  : null,
);

const className = computed(() => {
  return classNames(
    styles.Image,
    status.value === 'loading' && styles.isLoading,
  );
});

const handleLoad = () => {
  status.value = 'loaded';
  emits('load');
};
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Image/Image.scss';
</style>
