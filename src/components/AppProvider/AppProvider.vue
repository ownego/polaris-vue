<template lang="pug">
CustomProperties(:color-scheme="colorScheme")
  slot
  #PolarisPortalsContainer
</template>

<script lang="ts">
import {
  defineComponent, provide, ref, onMounted, watch,
} from 'vue';
import { ScrollLockManager } from 'polaris-react/src/utilities/scroll-lock-manager/scroll-lock-manager';
import { UniqueIdFactory, globalIdGeneratorFactory } from 'polaris-react/src/utilities/unique-id/unique-id-factory';
import { PortalManager } from '@/utilities/portal-manager';
import { FocusManager } from '@/utilities/focus-manager';
import {
  CustomProperties,
} from '../CustomProperties';
import {
  CustomPropertiesProps,
  DEFAULT_COLOR_SCHEME,
} from '../CustomProperties/utils';

export default defineComponent({
  components: {
    CustomProperties,
  },
  props: {
    colorScheme: {
      type: String as () => CustomPropertiesProps['colorScheme'],
      default: DEFAULT_COLOR_SCHEME,
    },
  },
  setup(props) {
    const scrollLockManager = ref(new ScrollLockManager());
    const portalManager = ref(new PortalManager());
    const uniqueIdFactory = ref(new UniqueIdFactory(globalIdGeneratorFactory));
    const focusManager = ref(new FocusManager());

    const setBodyStyles = () => {
    // Inlining the following custom properties to maintain backward
    // compatibility with the legacy ThemeProvider implementation.
      document.body.setAttribute(
        'p-color-scheme',
        props.colorScheme || DEFAULT_COLOR_SCHEME,
      );
      document.body.style.backgroundColor = 'var(--p-background)';
      document.body.style.color = 'var(--p-text)';
    };

    provide('scrollLockManager', scrollLockManager);
    provide('portalManager', portalManager);
    provide('uniqueIdFactory', uniqueIdFactory);
    provide('focusManager', focusManager);

    watch(() => props.colorScheme, (newColorScheme: CustomPropertiesProps['colorScheme'], oldColorScheme: CustomPropertiesProps['colorScheme']) => {
      if (newColorScheme !== oldColorScheme) {
        setBodyStyles();
      }
    });

    onMounted(() => {
      if (document !== null) {
        setBodyStyles();
      }
    });
  },
});
</script>

<style lang="scss">
@import 'polaris-react/src/components/AppProvider/AppProvider.scss';
</style>
