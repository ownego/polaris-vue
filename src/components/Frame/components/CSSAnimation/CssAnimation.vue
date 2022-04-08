<template lang="pug">
div(
  :class="wrapperClassName",
  ref="frameCssAnimationRef",
  @transitionend="handleTransitionEnd",
)
  slot(v-if="transitionStatus !== TransitionStatus.Exited || props.in")
</template>
<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import { classNames, variationName } from 'polaris/polaris-react/src/utilities/css';
import styles from '@/classes/Frame-CssAnimation.json';

type AnimationType = 'fade';

interface CSSAnimationProps {
  in: boolean;
  type: AnimationType;
}

const TransitionStatus = {
  Entering: 'entering',
  Entered: 'entered',
  Exiting: 'exiting',
  Exited: 'exited',
}

const props = defineProps<CSSAnimationProps>();

const frameCssAnimationRef = ref<HTMLElement | null>(null);

const transitionStatus = ref(props.in ? TransitionStatus.Entering : TransitionStatus.Exited);

const wrapperClassName = computed(() => classNames(
  styles[variationName('start', props.type)],
  props.in && styles[variationName('end', props.type)],
));

watch(
  () => transitionStatus.value,
  () => {
    transitionStatus.value === TransitionStatus.Entering && changeTransitionStatus(TransitionStatus.Entered);
  },
);

watch(
  () => props.in,
  () => {
    props.in && changeTransitionStatus(TransitionStatus.Entering);
    !props.in && changeTransitionStatus(TransitionStatus.Exiting);
  },
);

/**
 * Methods
 */
const handleTransitionEnd = () => {
  transitionStatus.value === TransitionStatus.Exiting && changeTransitionStatus(TransitionStatus.Exited);
}

const changeTransitionStatus = (transitionStatusNew: string) => {
  transitionStatus.value = transitionStatusNew;

  // Forcing a reflow to enable the animation
  if (transitionStatusNew === TransitionStatus.Entering) {
    frameCssAnimationRef.value && frameCssAnimationRef.value.getBoundingClientRect();
  }
}
</script>
<style lang="scss">
@import 'polaris/polaris-react/src/components/Frame/components/CSSAnimation/CSSAnimation.scss';
</style>
