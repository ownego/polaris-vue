<template lang="pug">
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import useTheme from '@/use/useTheme';
import { focusFirstFocusableNode } from '@/utilities/focus';
import { classNames, variationName } from '@/utilities/css';
import {
  KeypressListener,
  Text,
  TrapFocus,
} from '@/components';
import styles from '@polaris/components/Modal/components/Dialog/Dialog.module.scss';
import { Key } from '@/utilities/types';
import type { ModalSize } from '../utils';

export interface DialogProps {
  labelledBy?: string;
  instant?: boolean;
  limitHeight?: boolean;
  size?: ModalSize;
  in?: boolean;
  hasToasts?: boolean;
}

const theme = useTheme();

const containerNode = ref<HTMLDivElement | null>(null);
</script>
