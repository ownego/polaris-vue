<template lang="pug">
div(:class="styles.FullscreenBar")
  button(
    :class="styles.BackAction",
    :aria-label="i18n.translate('Polaris.FullscreenBar.accessibilityLabel')",
    @click="emits('action')",
  )
    Icon(:source="ExitIcon")
    Text(as="span", variant="bodyLg") {{ i18n.translate('Polaris.FullscreenBar.accessibilityLabel') }}
  slot
</template>

<script setup lang="ts">
import { type VNode } from 'vue';
import {
  Icon,
  Text,
} from '@/components';
import useI18n from '@/use/useI18n';
import type { VueNode } from '@/utilities/types';
import ExitIcon from '@icons/ExitIcon.svg';
import styles from '@polaris/components/FullscreenBar/FullscreenBar.module.scss';

type FullscreenBarEvents = {
  /** Callback when back button is clicked */
  'action': [],
};

const emits = defineEmits<FullscreenBarEvents>();
const slots = defineSlots<{
  /** Render child elements */
  default?: (_?: VueNode) => VNode[];
}>();

const i18n = useI18n();

</script>
