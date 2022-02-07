<template lang="pug">
div
  slot
  #PolarisPortalsContainer(v-if="this.portalManager.hasContainer")
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Component,
  Provide,
} from 'vue-property-decorator';
import { ScrollLockManager } from 'polaris-react/src/utilities/scroll-lock-manager/scroll-lock-manager';
import { PortalManager } from '@/utilities/portal-manager';

@Component
export default class AppProvider extends Vue {
  @Provide() scrollLockManager = new ScrollLockManager();

  @Provide() portalManager = new PortalManager();
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/AppProvider/AppProvider.scss';
</style>
