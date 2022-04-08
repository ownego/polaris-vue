<template lang="pug">
Portal(
  v-if="isMounted",
)
  EventListener(
    event="resize",
    :handler="updateToasts",
  )
  div(
    :class="styles.ToastManager",
    aria-live="assertive",
  )
    transition-group(
      name="custom-classes",
      @after-enter="onAfterEnter",
      @before-enter="onBeforeEnter",
      @enter="onEnter",
      @leave="onLeave",
    )
      template(
        v-if="toastMessages.length > 0"
        v-for="toast, index in toastMessages",
        :key="toast.id",
      )
        div(
          :ref="el => { toastRefs[index] = el }",
          :class="styles.ToastWrapper",
        )
          Toast(v-bind="toast")
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import styles from '@/classes/Frame-ToastManager.json';
import { Portal, EventListener } from '@/components';
import type { ToastPropsWithID } from '@/utilities/frame';
import { Toast } from '../Toast';

interface ToastManagerProps {
  toastMessages: ToastPropsWithID[];
}

const TOAST_ANIMATION_DURATION = 400;

const props = defineProps<ToastManagerProps>();

const toastRefs = ref<any[]>([]);

const isMounted = ref(false);

const updateToasts = () => {
  let targetInPos = 0;
  props.toastMessages.forEach((_, index) => {
    const currentToast = toastRefs.value[index];

    if (!currentToast) {
      return;
    }

    targetInPos += currentToast.clientHeight;
    currentToast.style.setProperty(
      '--pc-toast-manager-translate-y-in',
      `-${targetInPos}px`,
    );
    currentToast.style.setProperty(
      '--pc-toast-manager-translate-y-out',
      `${-targetInPos + 150}px`,
    );
  });
};

const onAfterEnter = (el: Element) => {
  el.classList.add(toastClasses.enterDone);
}

const onBeforeEnter = (el: Element) => {
  el.classList.add(toastClasses.enter);
};

const onEnter = (el: Element, done) => {
  el.classList.remove(toastClasses.enter);
  el.classList.add(toastClasses.enterDone);

  setTimeout(done, TOAST_ANIMATION_DURATION);
};

const onLeave = (el: Element, done) => {
  el.classList.remove(toastClasses.enterDone);
  el.classList.add(toastClasses.exit);

  setTimeout(done, TOAST_ANIMATION_DURATION);
};

watch(
  () => props.toastMessages,
  () => {
    setTimeout(updateToasts, 0);
  },
)

onMounted(() => {
  isMounted.value = true;
});

const toastClasses = {
  enter: classNames(styles['ToastWrapper-enter']),
  enterDone: classNames(styles['ToastWrapper-enter-done']),
  exit: classNames(styles['ToastWrapper-exit']),
};
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Frame/components/ToastManager/ToastManager.scss';
</style>
