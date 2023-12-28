<template lang="pug">
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { portal } from '@polaris/components/shared';
import {
  findFirstFocusableNodeIncludingDisabled,
  focusNextFocusableNode,
} from '@/utilities/focus';
import { Portal } from '@/components';
import type { AriasAttributes } from './types';
</script>
