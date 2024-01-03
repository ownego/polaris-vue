<template lang="pug">
</template>

<script setup lang="ts">
import { useCssModule } from 'vue';
import { classNames } from '@/utilities/css';
import {getRectForNode, Rect} from '@/utilities/geometry';
import { EventListener, Scrollable } from '@/components';
import {layer, dataPolarisTopBar} from '@polaris/components/shared';

import {
  calculateVerticalPosition,
  calculateHorizontalPosition,
  rectIsOutsideOfRect,
  intersectionWithViewport,
  windowRect,
} from './utilities/math';
import type {PreferredPosition, PreferredAlignment} from './utilities/math';

type Positioning = 'above' | 'below';

interface OverlayDetails {
  left?: number;
  right?: number;
  desiredHeight: number;
  positioning: Positioning;
  measuring: boolean;
  activatorRect: Rect;
  chevronOffset: number;
}

export interface PositionedOverlayProps {
  active: boolean;
  activator: HTMLElement;
  preferInputActivator?: boolean;
  preferredPosition?: PreferredPosition;
  preferredAlignment?: PreferredAlignment;
  fullWidth?: boolean;
  fixed?: boolean;
  preventInteraction?: boolean;
  classNames?: string;
  zIndexOverride?: number;
  // render(overlayDetails: OverlayDetails): React.ReactNode;
  // onScrollOut?(): void;
}

interface State {
  measuring: boolean;
  activatorRect: Rect;
  left?: number;
  right?: number;
  top: number;
  height: number;
  width: number | null;
  positioning: Positioning;
  zIndex: number | null;
  outsideScrollableContainer: boolean;
  lockPosition: boolean;
  chevronOffset: number;
}

const OBSERVER_CONFIG = {
  childList: true,
  subtree: true,
  characterData: true,
  attributeFilter: ['style'],
}

const styles = useCssModule();
</script>

<style lang="scss" module>
@import '@polaris/components/PositionedOverlay/PositionOverlay.scss';
</style>
