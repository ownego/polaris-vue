<template lang="pug">
.polaris-app-provider
  slot
  #PolarisPortalsContainer(ref="portalsContainerRef")
</template>

<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue';
import type { ThemeName } from '@shopify/polaris-tokens';
import {
  createThemeClassName,
  themeNameDefault,
  themeNames,
} from '@shopify/polaris-tokens';
import { I18n } from '@polaris/utilities/i18n/I18n';
import { ScrollLockManager } from '@polaris/utilities/scroll-lock-manager/scroll-lock-manager';
import { StickyManager } from '@/utilities/sticky-manager';
import type { LinkLikeComponent } from '@/utilities/link';
import type { VueNode } from '@/utilities/types';
import { type FeaturesConfig } from '@/utilities/features';
import { getTheme } from '@/utilities/use-theme';
import { useMediaQueryContext } from '@/use/useMediaQuery';
import { useFocusManagerContext } from '@/use/useFocusManager';
import { useEphemeralPresenceManagerContext } from '@/use/useEphemeralPresenceManager';
import { useBreakpointsContext } from '@/use/useBreakpoints';

export type AppProviderProps = {
  theme?: ThemeName;
  /** A locale object or array of locale objects that overrides default translations. If specifying an array then your primary language dictionary should come first, followed by your fallback language dictionaries */
  i18n: ConstructorParameters<typeof I18n>[0];
  /** A custom component to use for all links used by Polaris components */
  linkComponent?: LinkLikeComponent;
  /** For toggling features */
  features?: FeaturesConfig;
}

export type AppProviderSlots = {
  /** Inner content of the application */
  default?: (_: VueNode) => any;
}

const MAX_SCROLLBAR_WIDTH = 20;
const SCROLLBAR_TEST_ELEMENT_PARENT_SIZE = 30;
const SCROLLBAR_TEST_ELEMENT_CHILD_SIZE = SCROLLBAR_TEST_ELEMENT_PARENT_SIZE + 10;
const APP_FRAME_SCROLLABLE = 'AppFrameScollable';

const props = defineProps<AppProviderProps>();
defineSlots<AppProviderSlots>();

const stickyManager = ref(new StickyManager());
const scrollLockManager = new ScrollLockManager();

const { isNavigationCollapsed } = useMediaQueryContext();
const focusManager = useFocusManagerContext();
const ephemeralPresenceManager = useEphemeralPresenceManagerContext();
const { breakpoints } = useBreakpointsContext();

const portalsContainerRef = ref<HTMLElement | null>(null);

const themeName = computed<ThemeName>(() => props.theme ?? themeNameDefault);

onMounted(() => {
  if (document != null) {

    if (!props.features?.dynamicTopBarAndReframe) {
      stickyManager.value.setContainer(document);
    } else {
      const scrollContainerElement = document.getElementById(APP_FRAME_SCROLLABLE);

      stickyManager.value.setContainer(scrollContainerElement || document);
    }

    setBodyStyles();
    setRootAttributes();

    const isSafari16 =
      navigator.userAgent.includes('Safari') &&
      !navigator.userAgent.includes('Chrome') &&
      (navigator.userAgent.includes('Version/16.1') ||
        navigator.userAgent.includes('Version/16.2') ||
        navigator.userAgent.includes('Version/16.3'));

    const isMobileApp16 =
      navigator.userAgent.includes('Shopify Mobile/iOS') &&
      (navigator.userAgent.includes('OS 16_1') ||
        navigator.userAgent.includes('OS 16_2') ||
        navigator.userAgent.includes('OS 16_3'));

    if (isSafari16 || isMobileApp16) {
      document.documentElement.classList.add(
        'Polaris-Safari-16-Font-Optical-Sizing-Patch',
      );
    }
  }
  measureScrollbars();
});

const setBodyStyles = () => {
  document.body.style.backgroundColor = 'var(--p-color-bg)';
  document.body.style.color = 'var(--p-color-text)';
};

const setRootAttributes = () => {
  const activeThemeName = themeName.value;

  themeNames.forEach((themeName) => {
    document.documentElement.classList.toggle(
      createThemeClassName(themeName),
      themeName === activeThemeName,
    );
  });
};

function measureScrollbars() {
  const parentEl = document.createElement('div');
  parentEl.setAttribute(
    'style',
    `position: absolute; opacity: 0; transform: translate3d(-9999px, -9999px, 0); pointer-events: none; width:${SCROLLBAR_TEST_ELEMENT_PARENT_SIZE}px; height:${SCROLLBAR_TEST_ELEMENT_PARENT_SIZE}px;`,
  );

  const child = document.createElement('div');
  child.setAttribute(
    'style',
    `width:100%; height: ${SCROLLBAR_TEST_ELEMENT_CHILD_SIZE}; overflow:scroll; ; scrollbar-width: thin;`,
  );
  parentEl.appendChild(child);
  document.body.appendChild(parentEl);

  const scrollbarWidth =
    SCROLLBAR_TEST_ELEMENT_PARENT_SIZE -
    (parentEl.firstElementChild?.clientWidth ?? 0);

  const scrollbarWidthWithSafetyHatch = Math.min(
    scrollbarWidth,
    MAX_SCROLLBAR_WIDTH,
  );

  document.documentElement.style.setProperty(
    '--pc-app-provider-scrollbar-width',
    `${scrollbarWidthWithSafetyHatch}px`,
  );

  document.body.removeChild(parentEl);
}

provide('themeName', themeName);
provide('theme', getTheme(themeName.value)); // TODO: This should be reactive
provide('features', props.features ?? {});
provide('i18n', new I18n(props.i18n));
provide('scroll-lock-manager', scrollLockManager);
provide('sticky-manager', stickyManager);
provide('link', props.linkComponent);
provide('media-query', { isNavigationCollapsed });
provide('portals-manager', portalsContainerRef);
provide('focus-manager', focusManager);
provide('ephemeral-presence-manager', ephemeralPresenceManager);
provide('breakpoints', breakpoints);
</script>

<style lang="scss">
@import '@polaris/components/AppProvider/global.css';
</style>
