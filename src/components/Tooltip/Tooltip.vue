<template lang="pug">
component(
  :is="activatorWrapper",
  :ref="setActivator",
  :class="wrapperClassName",
  @focus="() => { handleFocus(); handleOpen(); }",
  @blur="() => { handleBlur(); handleClose(); }",
  @mouseLeave="handleMouseLeave",
  @mouseEntered="handleMouseEnterFix",
  @mouseDown="persistOnClick ? togglePersisting() : undefined",
  @keyUp="handleKeyUp",
)
  slot
  Portal(v-if="activatorNode", id-prefix="tooltip")
    TooltipOverlay(
      :id="(String(id))",
      :preferredPosition="preferredPosition"
      :activator="activatorNode"
      :active="active"
      :accessibilityLabel="accessibilityLabel"
      :preventInteraction="dismissOnMouseOut"
      :width="width"
      :padding="padding"
      :borderRadius="borderRadius"
      :zIndexOverride="zIndexOverride"
      :instant="!shouldAnimate",
    )
      slot(name="content")
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { classNames } from '@/utilities/css';
import { findFirstFocusableNode } from '@/utilities/focus';
import { useEphemeralPresenceManagerContext } from '@/use/useEphemeralPresenceManager';
import useId from '@/use/useId';
import { useToggle } from '@/use/useToggle';
import { Portal } from '../Portal';
import { TooltipOverlay } from './components';
import type { TooltipOverlayProps } from './components/TooltipOverlay/TooltipOverlay.vue';
import type { Width, Padding, BorderRadius } from './types';
import styles from '@polaris/components/Tooltip/Tooltip.module.scss';

const HOVER_OUT_TIMEOUT = 150;

export interface TooltipProps {
  /** Toggle whether the tooltip is visible */
  active?: boolean;
  /** Delay in milliseconds while hovering over an element before the tooltip is visible */
  hoverDelay?: number;
  /** Dismiss tooltip when not interacting with its children */
  dismissOnMouseOut?: TooltipOverlayProps['preventInteraction'];
  /**
   * The direction the tooltip tries to display
   * @default 'above'
   */
  preferredPosition?: TooltipOverlayProps['preferredPosition'];
  /**
   * The element type to wrap the activator in
   * @default 'span'
   */
  activatorWrapper?: string;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /**
   * Width of content
   * @default 'default'
   */
  width?: Width;
  /**
   * Padding of content
   * @default 'default'
   */
  padding?: Padding;
  /**
   * Border radius of the tooltip
   * @default '200'
   */
  borderRadius?: BorderRadius;
  /** Override on the default z-index of 400 */
  zIndexOverride?: number;
  /** Whether to render a dotted underline underneath the tooltip's activator */
  hasUnderline?: boolean;
  /** Whether the tooltip's content remains open after clicking the activator */
  persistOnClick?: boolean;
}

const props = withDefaults(defineProps<TooltipProps>(), {
  preferredPosition: 'above',
  activatorWrapper: 'span',
  width: 'default',
  padding: 'default',
});

const emits = defineEmits<{
  /* Callback fired when the tooltip is activated */
  open: [];
  /* Callback fired when the tooltip is dismissed */
  close: [];
}>();

const { presenceList, addPresence, removePresence } = useEphemeralPresenceManagerContext();
const id = useId();
const {
  value: active,
  setTrue: setActiveTrue,
  setFalse: handleBlur,
} = useToggle(Boolean(props.active));

const {
  value: persist,
  toggle: togglePersisting
} = useToggle(Boolean(props.active) && Boolean(props.persistOnClick));

const activatorNode = ref<HTMLElement | null>(null);
const activatorContainer = ref<HTMLElement | null>(null);
const mouseEntered = ref(false);
const shouldAnimate = ref(!props.active);
const hoverDelayTimeout = ref<NodeJS.Timeout | null>(null);
const hoverOutTimeout = ref<NodeJS.Timeout | null>(null);

const wrapperClassName = computed(() =>
  classNames(
    props.activatorWrapper === 'div' && styles.TooltipContainer,
    props.hasUnderline && styles.hasUnderline,
  ),
);

const handleFocus = () => {
  if (props.active !== false) {
    setActiveTrue();
  }
};

const handleOpen = () => {
  shouldAnimate.value = !presenceList.value.tooltip && active.value;
  emits('open');
  addPresence('tooltip');
};

const handleClose = () => {
  emits('close');
  shouldAnimate.value = false;
  hoverOutTimeout.value = setTimeout(() => {
    removePresence('tooltip');
  }, HOVER_OUT_TIMEOUT);
};

const handleKeyUp = (event: KeyboardEvent) => {
  if (event.key !== 'Escape') return;
  emits('close');
  handleBlur();
  props.persistOnClick && togglePersisting();
};

function setActivator(node: HTMLElement | null) {
  const activatorContainerRef: any = activatorContainer;

  if (node == null) {
    activatorContainerRef.current = null;
    activatorNode.value = null;
    return;
  }

  node.firstElementChild instanceof HTMLElement && (activatorNode.value = node.firstElementChild);

  activatorContainerRef.current = node;
}

function handleMouseEnter() {
  mouseEntered.value = true;

  if (props.hoverDelay && !presenceList.value.tooltip) {
    hoverDelayTimeout.value = setTimeout(() => {
      handleOpen();
      handleFocus();
    }, props.hoverDelay);
  } else {
    handleOpen();
    handleFocus();
  }
}

function handleMouseLeave() {
  if (hoverDelayTimeout.value) {
    clearTimeout(hoverDelayTimeout.value);
    hoverDelayTimeout.value = null;
  }

  mouseEntered.value = false;
  handleClose();

  if (!persist.value) {
    handleBlur();
  }
}

// https://github.com/facebook/react/issues/10109
// Mouseenter event not triggered when cursor moves from disabled button
function handleMouseEnterFix() {
  !mouseEntered.value && handleMouseEnter();
}

onMounted(
  () => {
    // Set accesibility attributes on activator
    const firstFocusable = activatorContainer.value
      ? findFirstFocusableNode(activatorContainer.value)
      : null;
    const accessibilityNode = firstFocusable || activatorContainer.value;

    if (!accessibilityNode) return;

    accessibilityNode.tabIndex = 0;
    accessibilityNode.setAttribute('aria-describedby', String(id));
    accessibilityNode.setAttribute('data-polaris-tooltip-activator', 'true');

    // Clear timeouts
    if (hoverDelayTimeout.value) {
      clearTimeout(hoverDelayTimeout.value);
      hoverDelayTimeout.value = null;
    }
    if (hoverOutTimeout.value) {
      clearTimeout(hoverOutTimeout.value);
      hoverOutTimeout.value = null;
    }
  }
);

watch([props.active, active.value],
  () => {
    if (props.active === false && active.value) {
      handleClose();
      handleBlur();
    }
  }
);
</script>
