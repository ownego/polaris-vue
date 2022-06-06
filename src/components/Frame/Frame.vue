<template lang="pug">
div(
  :class="frameClassName",
  v-bind="layer.props",
  :data-has-navigation="slots.navigation ? true : undefined",
)
  div(:class="skipClassName")
    a(
      :href="`#${skipTarget}`",
      @focus="handleFocus",
      @blur="handleBlur",
      @click="handleClick",
    )
      | {{ i18n.translate('Polaris.Frame.skipToContent') }}
  div(
    v-if="slots.topBar",
    :class="styles.TopBar",
    v-bind="{ ...layer.props, ...dataPolarisTopBar.props }",
    :id="APP_FRAME_TOP_BAR",
  )
    slot(name="topBar")
  TrapFocus(
    v-if="slots.navigation",
    :trapping="mobileNavShowing",
  )
    transition(
      name="custom-classes",
      @after-enter="onTransitionAfterEnter",
      @before-enter="onTransitionBeforeEnter",
      @enter="onTransitionEnter",
      @before-leave="onTransitionBeforeLeave",
      @leave="onTransitionLeave",
    )
      div(
        v-if="showMobileNavigation || !isNavigationCollapsed",
        v-bind="mobileNavAttributes",
        key="NavContent",
        :id="APP_FRAME_NAV",
        :aria-label="i18n.translate('Polaris.Frame.navigationLabel')",
        :class="navClassName",
        ref="navigationRef",
        @keydown="handleNavKeydown",
        :hidden="mobileNavHidden",
      )
        slot(name="navigation")
        button(
          type="button",
          :class="styles.NavigationDismiss",
          @click="handleNavigationDismiss",
          :aria-hidden="mobileNavHidden || (!isNavigationCollapsed && !showMobileNavigation)",
          :aria-label="i18n.translate('Polaris.Frame.Navigation.closeMobileNavigationLabel')",
          :tabIndex="tabIndex",
        )
          Icon(:source="MobileCancelMajor")
  CssAnimation(
    :in="showContextualSaveBar",
    :class="styles.ContextualSaveBar",
    type="fade",
  )
    ContextualSaveBar(v-bind="contextualSaveBar", v-if="contextualSaveBar")
      template(#contextControl, v-if="contextualSaveBarSlots.contextControl")
        component(
          v-for="el, index in contextualSaveBarSlots.contextControl",
          :key="index",
          :is="el",
        )
      template(#secondaryMenu, v-if="contextualSaveBarSlots.secondaryMenu")
        component(
          v-for="el, index in contextualSaveBarSlots.secondaryMenu",
          :key="index",
          :is="el",
        )
  div(
    v-if="loadingStack > 0",
    :class="styles.LoadingBar",
    :id="APP_FRAME_LOADING_BAR",
  )
    Loading
  Backdrop(
    v-if="showMobileNavigation && isNavigationCollapsed"
    belowNavigation,
    @click="handleNavigationDismiss",
    @touchstart="handleNavigationDismiss",
  )
  main(
    :class="styles.Main",
    :id="APP_FRAME_MAIN",
    :data-has-global-ribbon="!!slots.globalRibbon",
  )
    div(:class="styles.Content")
      slot
  ToastManager(:toast-messages="toastMessages")
  div(
    v-if="slots.globalRibbon",
    :class="styles.GlobalRibbonContainer",
    ref="globalRibbonContainerRef",
  )
    slot(name="globalRibbon")
  EventListener(
    event="resize",
    :handler="handleResize",
  )
</template>

<script setup lang="ts">
import { computed, onMounted, provide, ref, useSlots, watch } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import { dataPolarisTopBar, layer } from 'polaris/polaris-react/src/components/shared';
import { setRootProperty } from 'polaris/polaris-react/src/utilities/set-root-property';
import { tokens } from '@shopify/polaris-tokens';
import { UseI18n } from '@/use';
import styles from '@/classes/Frame.json';
import MobileCancelMajor from '@icons/MobileCancelMajor.svg';
import type {
  ContextualSaveBarProps,
  ToastID,
  ToastPropsWithID,
  Logo,
} from '@/utilities/frame';
import {
  Backdrop,
  TrapFocus,
  EventListener,
  Icon,
} from '@/components';
import {
  CssAnimation,
  ContextualSaveBar,
  Loading,
  ToastManager,
} from './components';
import { UseMediaQuery } from '@/utilities/media-query';

interface FrameProps {
  /** Sets the logo for the TopBar, Navigation, and ContextualSaveBar components */
  logo?: Logo;
  /** A horizontal offset that pushes the frame to the right, leaving empty space on the left */
  offset?: string;
  /** A boolean property indicating whether the mobile navigation is currently visible
   * @default false
   */
  showMobileNavigation?: boolean;
  /** Accepts a ref to the html anchor element you wish to focus when clicking the skip to content link */
  skipToContentTarget?: HTMLAnchorElement;
}

const APP_FRAME_MAIN = 'AppFrameMain';
const APP_FRAME_NAV = 'AppFrameNav';
const APP_FRAME_TOP_BAR = 'AppFrameTopBar';
const APP_FRAME_LOADING_BAR = 'AppFrameLoadingBar';

const CONTEXTUALSAVEBAR_FADE_DURATION = parseInt(tokens.motion['duration-400'].value, 10);
const NAVIGATION_ANIMATION_DURATION = parseInt(tokens.motion['duration-300'].value, 10);

const props = defineProps<FrameProps>();

const slots = useSlots();

const emits = defineEmits<{
  (e: 'navigation-dismiss'): void;
}>();

const i18n = UseI18n();

const skipFocused = ref(false);
const globalRibbonHeight = ref(0);
const loadingStack = ref(0);
const toastMessages = ref<ToastPropsWithID[]>([]);
const showContextualSaveBar = ref(false);
const contextualSaveBar = ref<ContextualSaveBarProps | null>(null);
const contextualSaveBarSlots = ref<{ contextControl?, secondaryMenu? }>({});
const navigationRef = ref(null);

const { useMediaQuery } = UseMediaQuery();
const { isNavigationCollapsed } = useMediaQuery();

const globalRibbonContainerRef = ref<HTMLDivElement | null>(null);

const setGlobalRibbonHeight = () => {
  if (globalRibbonContainerRef.value) {
    globalRibbonHeight.value = globalRibbonContainerRef.value.offsetHeight;
    setGlobalRibbonRootProperty();
  }
};

const navClassName = computed(() => {
  return classNames(
    styles.Navigation,
    props.showMobileNavigation && styles['Navigation-visible'],
  );
});

const navTransitionClasses = {
  enter: classNames(styles['Navigation-enter']),
  enterActive: classNames(styles['Navigation-enterActive']),
  enterDone: classNames(styles['Navigation-enterActive']),
  exit: classNames(styles['Navigation-exit']),
  exitActive: classNames(styles['Navigation-exitActive']),
};

const onTransitionAfterEnter = (el: Element) => {
  el.classList.add(navTransitionClasses.enterDone);
}

const onTransitionBeforeEnter = (el: Element) => {
  el.classList.add(navTransitionClasses.enter);
};

const onTransitionEnter = (el: Element, done) => {
  el.classList.remove(navTransitionClasses.enter);
  el.classList.add(navTransitionClasses.enterDone);

  setTimeout(done, NAVIGATION_ANIMATION_DURATION);
};

const onTransitionBeforeLeave = (el: Element) => {
  el.classList.remove(navTransitionClasses.enterActive);
  el.classList.add(navTransitionClasses.exitActive);
};

const onTransitionLeave = (el: Element, done) => {
  el.classList.add(navTransitionClasses.exit);

  setTimeout(done, NAVIGATION_ANIMATION_DURATION);
};

const mobileNavHidden = computed(() => isNavigationCollapsed && !props.showMobileNavigation);
const mobileNavShowing = computed(() => (isNavigationCollapsed && props.showMobileNavigation));

const tabIndex = mobileNavShowing.value ? 0 : -1;

const mobileNavAttributes = {
  ...(mobileNavShowing.value && {
    'aria-modal': true,
    role: 'dialog',
  }),
};

const frameClassName = computed(() => {
  return classNames(
    styles.Frame,
    slots.navigation && styles.hasNav,
    slots.topBar && styles.hasTopBar,
  );
});

const skipClassName = computed(() => {
  return classNames(
    styles.Skip,
    skipFocused.value && styles.focused,
  );
});

const skipTarget = computed(() => {
  return props.skipToContentTarget
    ? props.skipToContentTarget.id
    : APP_FRAME_MAIN;
});

onMounted(() => {
  handleResize();
  if (slots.globalRibbon) {
    return;
  }
  setGlobalRibbonRootProperty();
  setOffset();
});

watch(
  () => slots.globalRibbon,
  () => {
    setGlobalRibbonHeight();
    setOffset();
  },
);

const setOffset = () => {
  setRootProperty('--pc-frame-offset', props.offset || '0px');
};

const setGlobalRibbonRootProperty = () => {
  setRootProperty(
    '--pc-frame-global-ribbon-height',
    `${globalRibbonHeight.value}px`,
  );
};

const showToast = (toast: ToastPropsWithID) => {
  const hasToastById = toastMessages.value.find(({id}) => id === toast.id) != null;
  toastMessages.value = hasToastById ? toastMessages.value : [...toastMessages.value, toast];
};

const hideToast = ({ id }: ToastID) => {
  toastMessages.value = toastMessages.value.filter(({ id: toastId }) => id !== toastId);
};

const setContextualSaveBar = (saveBarProps: ContextualSaveBarProps) => {
  const { contextControl, secondaryMenu, ...rest } = saveBarProps;
  contextualSaveBar.value = rest;
  contextualSaveBarSlots.value = { contextControl, secondaryMenu };
  if (!showContextualSaveBar.value) {
    showContextualSaveBar.value = true;
  }
};

const removeContextualSaveBar = () => {
  showContextualSaveBar.value = false;

  setTimeout(() => {
    contextualSaveBar.value = null;
  }, CONTEXTUALSAVEBAR_FADE_DURATION);
};

const startLoading = () => {
  loadingStack.value = loadingStack.value + 1;
};

const stopLoading = () => {
  loadingStack.value = Math.max(0, loadingStack.value - 1);
};

const handleResize = () => {
  if (slots.globalRibbon) {
    setGlobalRibbonHeight();
  }
};

const handleFocus = () => {
  skipFocused.value = true;
};

const handleBlur = () => {
  skipFocused.value = false;
};

const handleClick = (event: Event) => {
  if (props.skipToContentTarget) {
    props.skipToContentTarget.focus();
    event.preventDefault();
  }
};

const handleNavigationDismiss = () => {
  emits('navigation-dismiss');
};

const handleNavKeydown = (event: KeyboardEvent) => {
  const { key } = event;

  const isMobileNavShowing = isNavigationCollapsed && props.showMobileNavigation;
  if (isMobileNavShowing && key === 'Escape') {
    handleNavigationDismiss();
  }
};

provide('frameContext', {
  logo: props.logo,
  showToast,
  hideToast,
  startLoading,
  stopLoading,
  setContextualSaveBar,
  removeContextualSaveBar,
});
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Frame/Frame.scss';
</style>
