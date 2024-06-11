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
import { createVar } from '@shopify/polaris-tokens';
import type { VueNode } from '@/utilities/types';
import { classNames } from '@/utilities/css';
import styles from '@polaris/components/Collapsible/Collapsible.module.css';

export type CollapsibleProps = {
  /** Assign a unique ID to the collapsible. For accessibility, pass this ID as the value of the triggering component’s aria-controls prop. */
  id?: string;
  /** Option to show collapsible content when printing */
  expandOnPrint?: boolean;
  /** Toggle whether the collapsible is expanded or not. */
  open: boolean;
  /** The direction the collapsible collapses in.
   * @default 'block'
   */
   variant?: 'block' | 'inline';
  /** Override transition properties. When set to false, disables transition completely.
   * @default :transition="{duration: 'var(--p-motion-duration-150)', timingFunction: 'var(--p-motion-ease-in-out)'}"
   */
  transition?: boolean | Transition;
}

const slot = defineSlots<{
  /** Elements to display inside the collapsible */
  default: (_?: VueNode) => any;
}>()

const props = withDefaults(defineProps<CollapsibleProps>(), {
  transition: true,
  variant: 'block',
});

const emits = defineEmits<{
  /** Callback when the animation completes */
  'animation-end': [];
}>();

const size = ref<number>(0);
const isOpen = ref<boolean>(props.open);
const animationState = ref<AnimationState>('idle');
const collapsibleContainer = ref<HTMLDivElement | null>(null);

const vertical = computed(() => props.variant === 'block');
const isFullyOpen = computed(() =>
  animationState.value === 'idle' && props.open && isOpen.value,
);

const isFullyClosed = computed(() =>
  animationState.value === 'idle' && !props.open && !isOpen.value,
);

const animateIn = computed(() => typeof props.transition === 'object' && props.transition.animateIn);

const wrapperClassName = computed(() => {
  return classNames(
    styles.Collapsible,
    isFullyClosed.value && styles.isFullyClosed,
    props.expandOnPrint && styles.expandOnPrint,
    props.variant === 'inline' && styles.inline,
    animateIn.value && styles.animateIn,
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
    transitionDelay: createVar(`motion-duration-${props.transition.delay ?? '0'}`),
    transitionDuration: props.transition.duration,
    transitionTimingFunction: props.transition.timingFunction,
});

const collapsibleStyles = computed(() => {
  return {
    ...transitionStyles.value,
    ...(vertical.value
    ? {
        maxHeight: isFullyOpen.value ? 'none' : `${size.value}px`,
        overflow: isFullyOpen.value ? 'visible' : 'hidden',
      }
    : {
        maxWidth: isFullyOpen.value ? 'none' : `${size.value}px`,
        overflow: isFullyOpen.value ? 'visible' : 'hidden',
      })
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
      size.value = vertical.value
        ? collapsibleContainer.value.scrollHeight
        : collapsibleContainer.value.scrollWidth;
    } else {
      size.value = 0;
    }
  } else {
    animationState.value = 'measuring';
  }
}

onMounted(() => {
  if (!props.open || !collapsibleContainer.value) return;

  // If collapsible defaults to open, set an initial height
  size.value = vertical.value
    ? collapsibleContainer.value.scrollHeight
    : collapsibleContainer.value.scrollWidth;
});

watch(
  () => props.open,
  (newVal, oldVal) => {
    // startAnimation should only be fired if the open state changes.
    startAnimation();
  },
  { immediate: true },
);

watch(
  () => [animationState.value, props.open],
  () => {
    if (!collapsibleContainer.value) return;

    switch (animationState.value) {
      case 'idle':
        break;
      case 'measuring':
        size.value = vertical.value
          ? collapsibleContainer.value.scrollHeight
          : collapsibleContainer.value.scrollWidth;
        setTimeout(() => {
          animationState.value = 'animating';
        }, 0);
        break;
      case 'animating':
        size.value = props.open
          ? vertical.value
            ? collapsibleContainer.value.scrollHeight
            : collapsibleContainer.value.scrollWidth
          : 0;
        break;
    }
  },
);
</script>
