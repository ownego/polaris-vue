<template lang="pug">
div
  slot
  #PolarisPortalsContainer
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Provide } from 'vue-property-decorator';
import { ScrollLockManager } from 'polaris-react/src/utilities/scroll-lock-manager/scroll-lock-manager';
import { UniqueIdFactory, globalIdGeneratorFactory } from 'polaris-react/src/utilities/unique-id/unique-id-factory';
import { PortalManager } from '@/utilities/portal-manager';
import { FocusManager } from '@/utilities/focus-manager';

@Component
export default class AppProvider extends Vue {
  @Provide() scrollLockManager = new ScrollLockManager();

  @Provide() portalManager = new PortalManager();

  @Provide() uniqueIdFactory = new UniqueIdFactory(globalIdGeneratorFactory);

  @Provide() focusManager = new FocusManager();
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/AppProvider/AppProvider.scss';
</style>
