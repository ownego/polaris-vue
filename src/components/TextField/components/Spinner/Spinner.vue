<template lang="pug">
div(
  ref="spinnerRef",
  :class="styles.Spinner",
  aria-hidden,
  @click="onClick",
)
  div(
    role="button",
    :class="styles.Segment",
    tabindex="-1",
    @click="handleStep(1)",
    @mousedown="handleMouseDown($event, 1)",
    @mouseup="onMouseUp",
    @blur="onBlur",
  )
    div(:class="styles.SpinnerIcon")
      Icon(:source="ChevronUpIcon")
  div(
    role="button",
    :class="styles.Segment",
    tabindex="-1",
    @click="handleStep(-1)",
    @mousedown="handleMouseDown($event, -1)",
    @mouseup="onMouseUp",
    @blur="onBlur",
  )
    div(:class="styles.SpinnerIcon")
      Icon(:source="ChevronDownIcon")
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@/components';
import ChevronDownIcon from '@icons/ChevronDownIcon.svg';
import ChevronUpIcon from '@icons/ChevronUpIcon.svg';
import styles from '@polaris/components/TextField/TextField.module.scss';

export type SpinnerEvents = {
  'change': [step: number];
  'click': [e: Event];
  'mousedown': [step: number];
  'mouseup': [];
  'blur': [e: FocusEvent];
}

const emits = defineEmits<SpinnerEvents>();

// const styles = useCssModule();

const spinnerRef = ref<HTMLDivElement | null>(null);

const handleStep = (step: number) => {
  emits('change', step);
};

const handleMouseDown = (e: MouseEvent, step: number) => {
  if (e.button !== 0) return;
  emits('mousedown', step);
};

const onClick = (e: MouseEvent) => {
  emits('click', e);
};

const onMouseUp = () => {
  emits('mouseup');
};

const onBlur = (e: FocusEvent) => {
  emits('blur', e);
};

defineExpose({
  spinnerWrapperRef: spinnerRef,
  handleStep,
});
</script>
