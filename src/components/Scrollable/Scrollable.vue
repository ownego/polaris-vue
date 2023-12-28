<template lang="pug">
</template>

<script setup lang="ts">
import {
  ref,
  useCssModule,
  onMounted,
} from 'vue';
import { StickyManager } from '@/utilities/sticky-manager';
import useStickyManager from '@/use/useStickyManager';
import useLazyRef from '@/use/useLazyRef';
import { classNames } from '@/utilities/css';
import {scrollable} from '@polaris/components/shared';
import type { VueNode } from '@/utilities/types';
import { ScrollTo } from './components';

const MAX_SCROLL_HINT_DISTANCE = 100;
const LOW_RES_BUFFER = 2;

/**
 * In react version this prop will extends React.HTMLProps<HTMLDivElement>
 * But with Vue we don't need to do that just simple pass it as others props like we passing props
 */
export interface ScrollableProps {
  /** Scroll content vertically
   * @default true
   */
  vertical?: boolean;
  /** Scroll content horizontally
   * @default true
   */
  horizontal?: boolean;
  /** Add a shadow when content is scrollable */
  shadow?: boolean;
  /** Slightly hints content upon mounting when scrollable */
  hint?: boolean;
  /** Adds a tabIndex to scrollable when children are not focusable */
  focusable?: boolean;
}

interface Emits  {
  /** Called when scrolled to the bottom of the scroll area */
  (event: 'scrolledToBottom'): void;
}

export interface ScrollToOptions {
  behavior?: 'instant' | 'smooth' | 'auto';
}

export interface ScrollableRef {
  scrollTo: (scrollY: number, options?: ScrollToOptions) => void;
}

const styles = useCssModule();

const emits = defineEmits<Emits>();
</script>

<style lang="scss" module>
@import '@polaris/components/Scrollable/Scrollable.scss';
</style>
