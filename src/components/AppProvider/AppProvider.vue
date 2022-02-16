<template lang="pug">
CustomProperties(:color-scheme="colorScheme")
  slot
  #PolarisPortalsContainer
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Component, Prop, Provide, Watch,
} from 'vue-property-decorator';
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

@Component({
  components: {
    CustomProperties,
  },
})
export default class AppProvider extends Vue {
  @Provide() scrollLockManager = new ScrollLockManager();

  @Provide() portalManager = new PortalManager();

  @Provide() uniqueIdFactory = new UniqueIdFactory(globalIdGeneratorFactory);

  @Provide() focusManager = new FocusManager();

  @Prop({ type: String, default: DEFAULT_COLOR_SCHEME })
  colorScheme?: CustomPropertiesProps['colorScheme'];

  @Watch('colorScheme')
  onColorSchemeChange(newColorScheme: CustomPropertiesProps['colorScheme'], oldColorScheme: CustomPropertiesProps['colorScheme']) {
    if (newColorScheme !== oldColorScheme) {
      this.setBodyStyles();
    }
  }

  created() {
    if (document !== null) {
      this.setBodyStyles();
    }
  }

  setBodyStyles = () => {
    // Inlining the following custom properties to maintain backward
    // compatibility with the legacy ThemeProvider implementation.
    document.body.setAttribute(
      'p-color-scheme',
      this.colorScheme || DEFAULT_COLOR_SCHEME,
    );
    document.body.style.backgroundColor = 'var(--p-background)';
    document.body.style.color = 'var(--p-text)';
  };
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/AppProvider/AppProvider.scss';
</style>
