<template lang="pug">
div(:class="className")
  div(:class="styles.Section")
    div(
      v-if="hasDetails",
      :class="styles.DetailsContainer",
    )
      div(:class="styles.Details")
        TextContainer(
          v-if="heading || hasSlot(slots.default)",
        )
          DisplayText(v-if="heading", :size="headingSize")
            | {{ heading }}
          div(v-if="hasSlot(slots.default)", :class="styles.Content")
            slot
        div(v-if="action || secondaryAction", :class="styles.Actions")
          Stack(alignment="center", distribution="center", spacing="tight")
            ButtonFrom(
              v-if="action",
              :action="action",
              :overrides="{ primary: true, size: 'medium' }",
            )
            ButtonFrom(
              v-if="secondaryAction",
              :action="secondaryAction",
            )
        div(v-if="hasSlot(slots.footerContent)", :class="styles.FooterContent")
          TextContainer
            slot(name="footerContent")
    div(
      v-else,
      :class="styles.DetailsContainer",
    )
    div(:class="styles.ImageContainer")
      Image(
        v-if="largeImage",
        alt="",
        role="presentation",
        :class="styles.Image",
        :source="largeImage",
        :sourceSet="[{source: image, descriptor: '568w'}, {source: largeImage, descriptor: '1136w'}]",
        sizes="(max-width: 568px) 60vw"
      )
      Image(
        v-else,
        role="presentation",
        alt="",
        :class="styles.Image",
        :source="image",
      )
</template>

<script setup lang="ts">
import { inject, computed, useSlots } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import type { ComplexAction } from '@/utilities/interface';
import { hasSlot } from '@/utilities/has-slot';
import { Image, ButtonFrom, Stack, TextContainer, DisplayText } from '@/components';
import styles from '@/classes/EmptyState.json';

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

const props = withDefaults(defineProps<EmptyStateProps>(), {
  fullWidth: false,
});

const withinContentContainer = inject('WithinContentContext', false);
const slots = useSlots();

const className = computed(() => {
  return classNames(
    styles.EmptyState,
    props.fullWidth && styles.fullWidth,
    props.imageContained && styles.imageContained,
    withinContentContainer && styles.withinContentContainer,
  );
});

const headingSize = computed(() => withinContentContainer ? 'small' : 'medium');

const hasDetails = computed(() => {
  return (props.heading || hasSlot(slots.default))
    || (props.action || props.secondaryAction)
    || (hasSlot(slots.footerContent));
});
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/EmptyState/EmptyState.scss';
</style>
