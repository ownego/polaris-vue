<template lang="pug">
</template>

<script setup lang="ts">
import { useCssModule } from 'vue';
import { themeDefault } from '@shopify/polaris-tokens';
import { findFirstKeyboardFocusableNode } from '@/utilities/focus';
import { classNames } from '@/utilities/css';
import { isElementOfType, wrapWithComponent } from '@/utilities/component';
import { Key } from '@/utilities/types';
import { overlay } from '@polaris/components/shared';
import { EventListener, PositionedOverlay } from '@/components';
import { Pane } from '../Pane';
import type {PortalsContainerElement} from '@polaris/utilities/portals';
import type { PaneProps } from '../Pane/Pane.vue';
import type { PositionedOverlayProps } from '@/components/PositionedOverlay/PositionedOverlay.vue';

export enum PopoverCloseSource {
  Click,
  EscapeKeypress,
  FocusOut,
  ScrollOut,
}

export type PopoverAutofocusTarget = 'none' | 'first-node' | 'container';

enum TransitionStatus {
  Entering = 'entering',
  Entered = 'entered',
  Exiting = 'exiting',
  Exited = 'exited',
}

export interface PopoverOverlayProps {
  fullWidth?: boolean;
  fullHeight?: boolean;
  fluidContent?: boolean;
  preferredPosition?: PositionedOverlayProps['preferredPosition'];
  preferredAlignment?: PositionedOverlayProps['preferredAlignment'];
  active: boolean;
  id: string;
  zIndexOverride?: number;
  activator: HTMLElement;
  preferInputActivator?: PositionedOverlayProps['preferInputActivator'];
  sectioned?: boolean;
  fixed?: boolean;
  hideOnPrint?: boolean;
  autofocusTarget?: PopoverAutofocusTarget;
  preventCloseOnChildOverlayClick?: boolean;
  captureOverscroll?: boolean;
}

interface State {
  transitionStatus: TransitionStatus;
}

const styles = useCssModule();
</script>

<style lang="scss" module>
@import '@polaris/components/Popover/Popover.scss';
</style>
