<template lang="pug">
div(
  v-if="hasSlot(slots.activator)"
  ref="activatorRef",
)
  slot(name="activator")
Portal(v-if="isMounted", idPrefix="sheet")
  transition(
    name="custom-sheet-transition",
    @after-enter="onTransitionAfterEnter",
    @before-enter="onTransitionBeforeEnter",
    @enter="onTransitionEnter",
    @before-leave="onTransitionBeforeLeave",
    @leave="onTransitionLeave",
  )
    div(
      v-if="open",
      :class="styles.Container",
      v-bind="{...layer.props, ...overlay.props}",
      ref="container",
    )
      TrapFocus(:trapping="open")
        div(
          role="dialog",
          aria-modal,
          tabindex="-1",
          :class="styles.Sheet",
          :aria-label="accessibilityLabel",
        )
          slot
  KeypressListener(:keyCode="Key.Escape", :handler="handleClose")
  Backdrop(
    v-if="open",
    transparent,
    @click="handleClose",
  )
</template>
<script setup lang="ts">
import { computed, ref, inject, useSlots, onMounted } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import { tokens } from '@shopify/polaris-tokens';
import { focusFirstFocusableNode } from '@/utilities/focus';
import { UseMediaQuery } from '@/utilities/media-query';
import { hasSlot } from '@/utilities/has-slot';
import { Key } from '@/components/KeypressListener/utils';
import { layer, overlay } from 'polaris/polaris-react/src/components/shared';
import { Backdrop, TrapFocus, Portal, KeypressListener } from '@/components';

import styles from '@/classes/Sheet.json';

interface SheetProps {
  /** Whether or not the sheet is open */
  open: boolean;
  /** ARIA label for sheet */
  accessibilityLabel: string;
}

const props = defineProps<SheetProps>();
const slots = useSlots();

const { useMediaQuery } = UseMediaQuery();
const { isNavigationCollapsed } = useMediaQuery();

const container = ref<HTMLDivElement | null>(null);
const activatorRef = ref<HTMLDivElement | null>(null);
const isMounted = ref(false);

const emits = defineEmits<{
  (e: 'close'): void;
  (e: 'entered'): void;
  (e: 'exit'): void;
}>();

onMounted(() => {
  isMounted.value = true;
});

const handleClose = () => {
  emits('close');

  const activatorElement =
    slots.activator && hasSlot(slots.activator)
      ? (slots.activator()[0].children as any)
      : activatorRef.value;

  if (activatorElement) {
    requestAnimationFrame(() => focusFirstFocusableNode(activatorElement));
  }
};

const transitionClasses = {
  enter: classNames(isNavigationCollapsed ? styles.enterBottom : styles.enterRight),
  enterActive: classNames(isNavigationCollapsed ? styles.enterBottomActive : styles.enterRightActive),
  enterDone: classNames(isNavigationCollapsed ? styles.enterBottomActive : styles.enterRightActive),
  exit: classNames(isNavigationCollapsed ? styles.exitBottom : styles.exitBottom),
  exitActive: classNames(isNavigationCollapsed ? styles.exitBottomActive : styles.exitRightActive),
};

const onTransitionBeforeEnter = (el: Element) => {
  el.classList.add(classNames(isNavigationCollapsed ? styles.Bottom : styles.Right));
  el.classList.add(transitionClasses.enter);
};

const onTransitionEnter = (el: Element, done) => {
  el.classList.remove(transitionClasses.enter);
  el.classList.add(transitionClasses.enterDone);

  setTimeout(done, parseInt(tokens.motion['duration-300'].value, 10));
};

const onTransitionAfterEnter = (el: Element) => {
  el.classList.remove(transitionClasses.enterDone, classNames(isNavigationCollapsed ? styles.Bottom : styles.Right));
  emits('entered');
}

const onTransitionBeforeLeave = (el: Element) => {
  el.classList.add(classNames(isNavigationCollapsed ? styles.Bottom : styles.Right));
  el.classList.add(transitionClasses.exitActive);
};

const onTransitionLeave = (el: Element, done) => {
  el.classList.add(transitionClasses.exit);

  emits('exit');
  setTimeout(done, parseInt(tokens.motion['duration-300'].value, 10));
};
</script>
<style lang="scss">
@import 'polaris/polaris-react/src/components/Sheet/Sheet.scss';
</style>
