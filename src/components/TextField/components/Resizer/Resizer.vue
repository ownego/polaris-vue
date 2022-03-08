<template lang="pug">
div(
  aria-hidden="true",
  :class="styles.Resizer",
)
  EventListener(
    event="resize",
    :handler="handleHeightCheck",
  )
  div(
    ref="contentNode",
    :class="styles.DummyInput",
    v-html="getFinalContents(contents)",
  )
  div(
    v-if="minimumLines",
    ref="minimumLinesNode",
    :class="styles.DummyInput",
    v-html="getContentsForMinimumLines(minimumLines)",
  )
</template>

<script setup lang="ts">
import { ref, onMounted, onUpdated } from 'vue';
import styles from '@/classes/TextField.json';
import { EventListener } from '../../../EventListener';

interface ResizerProps {
  contents?: string;
  currentHeight?: number | null;
  minimumLines?: number;
}

const ENTITIES_TO_REPLACE = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '\n': '<br>',
  '\r': '',
};

const REPLACE_REGEX = new RegExp(
  `[${Object.keys(ENTITIES_TO_REPLACE).join()}]`,
  'g',
);

const props = defineProps<ResizerProps>();

const emits = defineEmits<{
  (event: 'height-change', value: number): void
}>();

const contentNode = ref<HTMLDivElement | null>(null);
const minimumLinesNode = ref<HTMLDivElement | null>(null);

const animationFrame = ref<number>();
const currentHeight = ref<number | null | undefined>(props.currentHeight);

const replaceEntity = (entity: string) => {
  return ENTITIES_TO_REPLACE[entity as keyof typeof ENTITIES_TO_REPLACE];
};

const getFinalContents = (contents?: string): string => {
  return contents
    ? `${contents.replace(REPLACE_REGEX, replaceEntity)}<br>`
    : '<br>';
};

const getContentsForMinimumLines = (minimumLines: number): string => {
  let content = '';

  for (let line = 0; line < minimumLines; line++) {
    content += '<br>';
  }

  return content;
};

const handleHeightCheck = (): void => {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value);
  }

  animationFrame.value = requestAnimationFrame(() => {
    if (!contentNode.value || !minimumLinesNode.value) {
      return;
    }

    const newHeight = Math.max(
      contentNode.value.offsetHeight,
      minimumLinesNode.value.offsetHeight,
    );

    if (newHeight !== currentHeight.value) {
      emits('height-change', newHeight);
    }
  });
};

onMounted(() => {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value);
  }
});

onUpdated(() => {
  handleHeightCheck();
});
</script>

