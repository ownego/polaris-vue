<template lang="pug">
Box(
  padding-inline-start="0",
  padding-inline-end="0",
  padding-block-start="500",
  padding-block-end="1600",
)
  BlockStack(inline-align="center")
    //- ImageMarkUp
    Image(
      v-if="largeImage",
      alt="",
      role="presentation",
      :source="largeImage",
      :class-name="imageContainedClass",
      :source-set="sourceSet",
    )
    Image(
      v-else,
      alt="",
      role="presentation",
      :class-name="imageContainedClass",
      :source="image",
    )
    //- Detail Markup
    Box(:max-width="fullWidth ? '100%' : '400px'")
      BlockStack(inline-align="center")
        //- TextContent
        Box(
          v-if="heading || hasSlot(slots.default)",
          padding-block-end="400",
        )
          Box(
            v-if="heading",
            padding-block-end="150",
          )
            Text(
              variant="headingMd",
              as="p",
              alignment="center",
            ) {{ heading }}
          Text(
            v-if="hasSlot(slots.default)",
            as="span",
            alignment="center",
            variant="bodySm",
          )
            slot
        //- ActionMarkup
        InlineStack(
          align="center",
          gap="200",
        )
          ButtonFrom(
            v-if="secondaryAction",
            :action="secondaryAction",
          )
          ButtonFrom(
            v-if="action",
            :action="action",
            :overrides="{ variant: 'primary', size: 'medium' }",
          )
        //- FooterContent
        Box(
          v-if="hasSlot(slots.footerContent)",
          padding-block-start="400",
        )
          Text(
            as="span",
            alignment="center",
            variant="bodySm",
          )
            slot(name="footerContent")
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import {
  Box,
  ButtonFrom,
  Image,
  Text,
  BlockStack,
  InlineStack,
} from '@/components';
import { classNames } from '@/utilities/css';
import { hasSlot } from '@/utilities/has-slot';
import type { VueNode } from '@/utilities/types';
import type { ComplexAction } from '../Button/types';

interface EmptyStateProps {
  /** The empty state heading */
  heading?: string;
  /**
   * The path to the image to display.
   * The image should have ~40px of white space above when empty state is used within a card, modal, or navigation component
   */
  image: string;
  /** The path to the image to display on large screens */
  largeImage?: string;
  /** Whether or not to limit the image to the size of its container on large screens */
  imageContained?: boolean;
  /** Whether or not the content should span the full width of its container  */
  fullWidth?: boolean;
  /** Primary action for empty state */
  action?: ComplexAction;
  /** Secondary action for empty state */
  secondaryAction?: ComplexAction;
}

const styles = useCssModule();

const slots = defineSlots<{
  /** Elements to display inside empty state */
  default: (_: VueNode) => any;
  /** Secondary elements to display below empty state actions */
  footerContent: (_: VueNode) => any;
}>();

const props = withDefaults(defineProps<EmptyStateProps>(), {
  fullWidth: false
});

const imageContainedClass = computed(() => classNames(
  props.imageContained && styles.imageContained
));

const sourceSet = computed(() => {
  return [
    { source: props.image, descriptor: '568w' },
    { source: props.largeImage, descriptor: '1136w' },
  ];
});
</script>

<style lang="scss" module>
@import '@polaris/components/EmptyState/EmptyState.scss';
</style>
