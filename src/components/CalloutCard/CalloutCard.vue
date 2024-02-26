<template lang="pug">
LegacyCard
  div(:class="containerClassName")
    div(:class="styles.Dismiss")
      Button(
        v-if="attrs['onDismiss']",
        variant="plain",
        accessibilityLabel="Dismiss card",
        :icon="XSmallIcon",
        @click="attrs['onDismiss']",
      )
    LegacyCardSection
      div(:class="styles.CalloutCard")
        div(:class="styles.Content")
          div(:class="styles.Title")
            Text(variant="headingMd", as="h2")
              slot(v-if="hasSlot(slots.title)", name="title")
              template(v-else) {{ title }}
          BlockStack
            slot
          div(:class="styles.Buttons")
            ButtonGroup(v-if="secondaryAction")
              ButtonFrom(:action="primaryAction")
              ButtonFrom(
                v-if="secondaryAction",
                :action="secondaryAction", 
                :overrides="{ variant: secondaryAction.variant ?? 'tertiary' }")
            ButtonFrom(
              v-else,
              :action="primaryAction",
            )
        Image(
          alt="",
          :className="imageClassName",
          :source="illustration"
        )
</template>

<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue';
import type { IconableAction, VueNode } from '@/utilities/types';
import { classNames } from '@/utilities/css';
import { useHasSlot } from '@/use/useHasSlot';
import XSmallIcon from '@icons/XSmallIcon.svg';
import styles from '@polaris/components/CalloutCard/CalloutCard.module.scss';
import type { ButtonProps } from '../Button/types';


export interface CalloutCardProps {
  /** The title of the card */
  title?: string;
  /** URL to the card illustration */
  illustration: string;
  /** Primary action for the card */
  primaryAction: IconableAction;
  /** Secondary action for the card */
  secondaryAction?: IconableAction & Pick<ButtonProps, 'variant'>;
}

export type CalloutCardEmits = {
  /** Callback when banner is dismissed */
  'dismiss': [];
}

defineProps<CalloutCardProps>();

defineSlots<{
  /** The content to display inside the button */
  default: (_: VueNode) => any;
  /** The title of the card */
  title: (_: VueNode) => any;
}>();

const attrs = useAttrs();
const slots = useSlots();
const { hasSlot } = useHasSlot();

const imageClassName = computed(() =>
  classNames(
    styles.Image,
    !!attrs['onDismiss'] && styles.DismissImage,
  ),
);

const containerClassName = computed(() =>
  classNames(
    styles.Container,
    !!attrs['onDismiss'] && styles.hasDismiss,
  ),
);
</script>
