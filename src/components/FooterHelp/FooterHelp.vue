<template lang="pug">
div(:class="styles.FooterHelp", :style="style")
  Text(
    as="p",
    variant="bodyLg",
  )
    slot
</template>

<script setup lang="ts">
import { computed, type VNode } from 'vue';
import { type VueNode } from '@/utilities/types';
import { Text } from '@/components';
import styles from '@polaris/components/FooterHelp/FooterHelp.module.css';

type FooterHelpProps = {
  /** Horizontal alignment of the component
   * @default 'center'
  */
  align?: 'start' | 'center' | 'end';
}

const props = withDefaults(defineProps<FooterHelpProps>(), {
  align: 'center',
});

const slots = defineSlots<{
  /** The content to display inside the layout. */
  default?: (_?: VueNode) => VNode[];
}>();

const style = computed(() => ({
  '--pc-footer-help-align': props.align,
}));
</script>
