<template lang="pug">
component(
  :is="as",
  :class="classes",
)
  slot
</template>

<script setup lang="ts">
import { computed, provide } from 'vue';
import { themeNameDefault, createThemeClassName } from '@shopify/polaris-tokens';
import type { ThemeProviderProps, ThemeProviderSlots } from './types';
import { getTheme } from '@/utilities/use-theme';
import { classNames } from '@/utilities/css';
import styles from '@polaris/components/ThemeProvider/ThemeProvider.module.css';

const props = withDefaults(defineProps<ThemeProviderProps>(), {
  as: 'div',
  theme: themeNameDefault,
});

const slots = defineSlots<ThemeProviderSlots>();

const classes = computed(() => classNames(
  createThemeClassName(props.theme),
  styles.themeContainer,
  props.className,
));

provide('themeName', props.theme);
provide('theme', getTheme(props.theme));
</script>
