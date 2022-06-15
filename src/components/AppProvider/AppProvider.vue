<template lang="pug">
CustomProperties(:color-scheme="colorScheme")
  EventListener(event="resize", :handler="handleResize")
  slot
  #PolarisPortalsContainer
</template>

<script setup lang="ts">
import { provide, ref, onMounted, watch } from 'vue';
import { debounce } from 'polaris/polaris-react/src/utilities/debounce';
import { ScrollLockManager } from 'polaris/polaris-react/src/utilities/scroll-lock-manager/scroll-lock-manager';
import { UniqueIdFactory, globalIdGeneratorFactory } from 'polaris/polaris-react/src/utilities/unique-id/unique-id-factory';
import { navigationBarCollapsed } from 'polaris/polaris-react/src/utilities/breakpoints';
import { I18n } from '@/utilities/i18n';
import lang from 'polaris/polaris-react/locales/en.json';
import { EventListener, CustomProperties } from '@/components';
import { PortalManager } from '@/utilities/portal-manager';
import { FocusManager } from '@/utilities/focus-manager';
import { StickyManager } from '@/utilities/sticky-manager';
import type { CustomPropertiesProps } from '../CustomProperties/utils';
import { DEFAULT_COLOR_SCHEME } from '../CustomProperties/utils';

const props = defineProps({
  colorScheme: {
    type: String as () => CustomPropertiesProps['colorScheme'],
    default: DEFAULT_COLOR_SCHEME,
  },
});

const stickyManager = new StickyManager();

const scrollLockManager = new ScrollLockManager();

const portalManager = new PortalManager();

const uniqueIdFactory = ref(new UniqueIdFactory(globalIdGeneratorFactory));

const focusManager = new FocusManager();

const isNavigationCollapsed = ref(navigationBarCollapsed().matches);

const setBodyStyles = () => {
  // Inlining the following custom properties to maintain backward
  // compatibility with the legacy ThemeProvider implementation.
  document.body.setAttribute('p-color-scheme', props.colorScheme || DEFAULT_COLOR_SCHEME);
  document.body.style.backgroundColor = 'var(--p-background)';
  document.body.style.color = 'var(--p-text)';
};

const handleResize = debounce(
  () => {
    if (isNavigationCollapsed.value !== navigationBarCollapsed().matches) {
      isNavigationCollapsed.value = !isNavigationCollapsed.value;
    }
  },
  40,
  {trailing: true, leading: true, maxWait: 40},
);

watch(
  () => props.colorScheme,
  (newColorScheme: CustomPropertiesProps['colorScheme'], oldColorScheme: CustomPropertiesProps['colorScheme']) => {
    if (newColorScheme !== oldColorScheme) {
      setBodyStyles();
    }
  },
);

onMounted(() => {
  if (document !== null) {
    setBodyStyles();
    stickyManager.setContainer(document);
  }
});

const i18n = new I18n(lang);

provide('mediaQueryContext', { isNavigationCollapsed: isNavigationCollapsed.value });
provide('stickyManagerContext', stickyManager);
provide('scrollLockManager', scrollLockManager);
provide('portalManager', portalManager);
provide('uniqueIdFactory', uniqueIdFactory.value);
provide('focusManager', focusManager);
provide('lang', lang);
provide('i18n', i18n);
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/AppProvider/AppProvider.scss';
</style>
