<template lang="pug">
div(
  aria-hidden,
  :class="styles.Resizer",
)
  div(
    ref="contentNode",
    :class="styles.DummyInput",
    v-html="getFinalContents(contents)"
  )
  div(
    v-if="minimumLines",
    ref="minimumLinesNode",
    :class="styles.DummyInput",
    v-html="getContentsForMinimumLines(minimumLines)"
  )
</template>

<script setup lang="ts">
import { ref, useCssModule } from 'vue';
import { useEventListener } from '@/utilities/use-event-listener';

export type ResizerProps = {
  contents?: string;
  currentHeight?: number | null;
  minimumLines?: number;
  onHeightChange(height: number): void;
};

type ResizerEvents = {
  'height-change': [height: number];
}

const props = defineProps<ResizerProps>();

const emits = defineEmits<ResizerEvents>();

const styles = useCssModule();

useEventListener('resize', handleHeightCheck);

const contentNode = ref<HTMLDivElement | null>(null);
const minimumLinesNode = ref<HTMLDivElement | null>(null);
const animationFrame = ref<number>();
const currentHeight = ref<number | null>(props.currentHeight ?? null);

if (props.currentHeight !== currentHeight.value) {
  currentHeight.value = props.currentHeight;
}


const getFinalContents = (contents?: string) => {
  return contents
    ? `${contents.replace(REPLACE_REGEX, replaceEntity)}<br>`
    : '<br>';
};

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

function replaceEntity(entity: keyof typeof ENTITIES_TO_REPLACE) {
  return ENTITIES_TO_REPLACE[entity];
}

function getContentsForMinimumLines(minimumLines: number) {
  let content = '';

  for (let line = 0; line < minimumLines; line++) {
    content += '<br>';
  }

  return content;
}
</script>

<style lang="scss" module>
@import '@polaris/components/TextField/TextField.scss';
</style>
