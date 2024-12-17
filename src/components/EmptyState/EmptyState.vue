<template lang="pug">
Box(
  padding-inline-start="0",
  padding-inline-end="0",
  padding-block-start="500",
  padding-block-end="1600",
)
  BlockStack(inline-align="center")
    //- ImageMarkUp
    div(
      :class="imageContainerClassNames",
    )
      Image(
        v-if="largeImage",
        ref="imageRef",
        alt="",
        role="presentation",
        :source="largeImage",
        :class-name="imageClassName",
        :source-set="sourceSet",
        @load="imageLoaded = true",
      )
      Image(
        v-else,
        ref="imageRef",
        alt="",
        role="presentation",
        :class-name="imageClassName",
        :source="image",
        @load="imageLoaded = true",
      )
      div(
        :class="skeletonImageClass",
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
import { ref, computed, watch } from 'vue';
import {
  Box,
  ButtonFrom,
  Image,
  Text,
  BlockStack,
  InlineStack,
} from '@/components';
import { useHasSlot } from '@/use/useHasSlot';
import { classNames } from '@/utilities/css';
import type { VueNode, ComplexAction } from '@/utilities/types';
import styles from '@polaris/components/EmptyState/EmptyState.module.css';

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

const { hasSlot } = useHasSlot();

const slots = defineSlots<{
  /** Elements to display inside empty state */
  default: (_: VueNode) => any;
  /** Secondary elements to display below empty state actions */
  footerContent: (_: VueNode) => any;
}>();

const props = withDefaults(defineProps<EmptyStateProps>(), {
  fullWidth: false
});

const imageLoaded = ref<boolean>(false);
const imageRef = ref<HTMLImageElement | null>(null);

const imageClassName = computed(() => classNames(
  styles.Image,
  imageLoaded.value && styles.loaded,
  props.imageContained && styles.imageContained,
));

const skeletonImageClass = computed(() => classNames(
  styles.SkeletonImage,
  imageLoaded.value && styles.loaded,
));

const imageContainerClassNames = computed(() => classNames(
  styles.ImageContainer,
  !imageLoaded.value && styles.SkeletonImageContainer,
));

const sourceSet = computed(() => {
  return [
    { source: props.image, descriptor: '568w' },
    { source: props.largeImage, descriptor: '1136w' },
  ];
});

watch(
  () => imageRef.value,
  newVal => {
    if (newVal && newVal.complete) {
      imageLoaded.value = true;
    }
  }
);
</script>
