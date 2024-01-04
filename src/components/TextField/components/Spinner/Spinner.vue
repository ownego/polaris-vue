<template lang="pug">
div(
  :class="styles.Spinner",
  @click="onClick",
  aria-hidden="",
)
  div(
    role="button",
    :class="styles.Segment",
    tabindex="-1",
    @click="handleStep(1)",
    @mousedown="handleMouseDown(handleStep(1))",
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
    @mousedown="handleMouseDown(handleStep(-1))",
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

type HandleStepFn = (step: number) => void;

type SpinnerEvents = {
  'change': [fn: HandleStepFn];
  'click': [e: Event];
  'mousedown': [fn: HandleStepFn];
  'mouseup': [];
  'blur': [e: FocusEvent];
}

const emits = defineEmits<SpinnerEvents>();

const styles = useCssModule();

const handleStep = (step: number) => {
  return () => {
    emits('change', step);
  };
};

const handleMouseDown = (onChange: HandleStepFn) => {
  return (e: MouseEvent) => {
    if (e.button !== 0) return;

    emits('mousedown', onChange);
  };
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
</script>

<style lang="scss" module>
@import '@polaris/components/TextField/TextField.scss';
</style>
