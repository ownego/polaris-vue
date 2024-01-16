<template lang="pug">
div(
  ref="collapsibleContainer",
  :id="id",
  :style="collapsibleStyles",
  :class="wrapperClassName",
  :aria-hidden="!open",
  @transitionend="handleCompleteAnimation",
)
  template(v-if="expandOnPrint || !isFullyClosed")
    slot
</template>

<script setup lang="ts">
import { computed, watch, onMounted, ref } from 'vue';
import type { Transition, AnimationState } from './types';
import type { VueNode } from '@/utilities/types';
import { classNames } from '@/utilities/css';
import styles from '@polaris/components/Collapsible/Collapsible.module.scss';

export type CollapsibleProps = {
  /** Assign a unique ID to the collapsible. For accessibility, pass this ID as the value of the triggering component’s aria-controls prop. */
  id?: string;
  /** Option to show collapsible content when printing */
  expandOnPrint?: boolean;
  /** Toggle whether the collapsible is expanded or not. */
  open: boolean;
  /** Override transition properties. When set to false, disables transition completely.
   * @default transition={{duration: 'var(--p-motion-duration-150)', timingFunction: 'var(--p-motion-ease-in-out)'}}
   */
  transition?: boolean | Transition;
}

const slot = defineSlots<{
  /** Elements to display inside the collapsible */
  default: (_?: VueNode) => any;
}>()

const props = withDefaults(defineProps<CollapsibleProps>(), {
  transition: true,
});

const emits = defineEmits<{
  /** Callback when the animation completes */
  'animation-end': [];
}>();

const height = ref<number>(0);
const isOpen = ref<boolean>(props.open);
const animationState = ref<AnimationState>('idle');
const collapsibleContainer = ref<HTMLDivElement | null>(null);

const isFullyOpen = computed(() => 
  animationState.value === 'idle' && props.open && isOpen.value,
);

const isFullyClosed = computed(() =>
  animationState.value === 'idle' && !props.open && !isOpen.value,
);

const wrapperClassName = computed(() => {
  return classNames(
    styles.Collapsible,
    isFullyClosed.value && styles.isFullyClosed,
    props.expandOnPrint && styles.expandOnPrint,
  );
});

const zeroDurationRegex = /^0(ms|s)$/;

const isTransitionDisabled = (transitionProp: Transition | boolean) => {
  if (typeof transitionProp === 'boolean') {
    return !transitionProp;
  }

  const { duration } = transitionProp;
  if (duration && zeroDurationRegex.test(duration.trim())) {
    return true;
  }

  return false;
}

const transitionDisabled = computed(() => isTransitionDisabled(props.transition));

const transitionStyles = computed(() =>
  typeof props.transition === 'object' && {
    transitionDuration: props.transition.duration,
    transitionTimingFunction: props.transition.timingFunction,
});

const collapsibleStyles = computed(() => {
  return {
    ...transitionStyles.value,
    ...{
      maxHeight: isFullyOpen.value ? 'none' : `${height.value}px`,
      overflow: isFullyOpen.value ? 'visible' : 'hidden',
    },
  };
});

const handleCompleteAnimation = (event: Event) => {
  const target = event?.target;

  if (target === collapsibleContainer.value) {
    animationState.value = 'idle';
    isOpen.value = props.open;

    emits('animation-end');
  }
}

const startAnimation = () => {
  if (transitionDisabled.value) {
    isOpen.value = props.open;
    animationState.value = 'idle';

    if (props.open && collapsibleContainer.value) {
      height.value = collapsibleContainer.value.scrollHeight;
    } else {
      height.value = 0;
    }
  } else {
    animationState.value = 'measuring';
  }
}

onMounted(() => {
  if (!props.open || !collapsibleContainer.value) return;

  // If collapsible defaults to open, set an initial height
  height.value = collapsibleContainer.value.scrollHeight;
});

watch(
  () => [props.open, isOpen.value],
  () => {
    if (props.open === isOpen.value) {
      startAnimation();
    }
  },
  { immediate: true },
);

watch(
  () => [animationState.value, props.open, isOpen.value],
  () => {
    if (!collapsibleContainer.value) return;

    switch (animationState.value) {
      case 'idle':
        break;
      case 'measuring':
        height.value = collapsibleContainer.value.scrollHeight;
        animationState.value = 'animating';
        break;
      case 'animating':
        height.value = props.open ? collapsibleContainer.value.scrollHeight : 0;
    }
  },
);
</script>
