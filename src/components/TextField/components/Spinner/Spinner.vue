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
      Icon(:source="ChevronUpMinor")
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
      Icon(:source="ChevronDownMinor")
</template>

<script setup lang="ts">
import { ref, useCssModule } from 'vue';
import { Icon } from '@/components';
import ChevronDownMinor from '@icons/ChevronDownMinor.svg';
import ChevronUpMinor from '@icons/ChevronUpMinor.svg';

export type SpinnerEvents = {
  'change': [step: number];
  'click': [e: Event];
  'mousedown': [step: number];
  'mouseup': [];
  'blur': [e: FocusEvent];
}

const emits = defineEmits<SpinnerEvents>();

const styles = useCssModule();

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

<style lang="scss" module>
@import '@polaris/components/TextField/TextField.scss';
</style>
