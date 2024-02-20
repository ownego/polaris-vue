<template lang="pug">
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { focusFirstFocusableNode } from '@/utilities/focus';
import useI18n from '@/use/useI18n';
import {
  Box,
  InlineStack,
  Scrollable,
  Spinner,
  Portal
} from '@/components';
import styles from '@polaris/components/Modal/Modal.module.scss';
</script>
