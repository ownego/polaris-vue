<template lang="pug">
</template>

<script setup lang="ts">
import { useCssModule } from 'vue';
import { themeDefault } from '@shopify/polaris-tokens';
import { classNames } from '@/utilities/css';
import { findFirstKeyboardFocusableNode } from '@/utilities/focus';
import { EventListener, PositionedOverlay } from '@/components';

const styles = useCssModule();
</script>

<style lang="scss" module>
@import '@polaris/components/Popover/Popover.scss';
</style>
