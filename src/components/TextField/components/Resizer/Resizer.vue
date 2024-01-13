<template lang="pug">
div(
  aria-hidden,
  :class="styles.Resizer",
)
  div(
    ref="contentNode",
    :class="styles.DummyInput",
    v-html="finalContents",
  )
  div(
    v-if="minimumLines",
    ref="minimumLinesNode",
    :class="styles.DummyInput",
    v-html="contentsForMinimumLines",
  )
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useCssModule } from 'vue';
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

const contentNode = ref<HTMLDivElement | null>(null);
const minimumLinesNode = ref<HTMLDivElement | null>(null);
const animationFrame = ref<number>();
const currentHeight = ref<number | null>(props.currentHeight ?? null);

if (props.currentHeight !== currentHeight.value) {
  currentHeight.value = props.currentHeight || null;
}

const finalContents = computed(() => {
  return props.contents
    ? `${props.contents.replace(REPLACE_REGEX, replaceEntity)}<br>`
    : '<br>';
});

const contentsForMinimumLines = computed(() => {
  if (!props.minimumLines) return '';
  let content = '';

  for (let line = 0; line < props.minimumLines; line++) {
    content += '<br>';
  }

  return content;
});

onMounted(() => {
  useEventListener('resize', handleHeightCheck);

  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value);
  }
});

const handleHeightCheck = () => {
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

function replaceEntity(entity: string) {
  return ENTITIES_TO_REPLACE[entity as keyof typeof ENTITIES_TO_REPLACE];
}
</script>

<style lang="scss" module>
@import '@polaris/components/TextField/TextField.module.scss';
</style>
