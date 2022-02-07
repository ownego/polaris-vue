<template lang="pug">
div
  slot
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Component,
  Provide,
} from 'vue-property-decorator';
import { ScrollLockManager } from 'polaris-react/src/utilities/scroll-lock-manager/scroll-lock-manager';

@Component
export default class AppProvider extends Vue {
  @Provide('scrollLockManager')
  scrollLockManager = new ScrollLockManager();
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/AppProvider/AppProvider.scss';
</style>
