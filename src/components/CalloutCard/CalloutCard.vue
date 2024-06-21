<template lang="pug">
LegacyCard
  div(:class="containerClassName")
    div(:class="styles.Dismiss")
      Button(
        v-if="hasDismiss",
        variant="plain",
        accessibilityLabel="Dismiss card",
        :icon="XSmallIcon",
        @click="emits('dismiss')",
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
import { computed, getCurrentInstance, useSlots } from 'vue';
import type { VueNode, IconableAction } from '@/utilities/types';
import {
  LegacyCard,
  Button,
  LegacyCardSection,
  BlockStack,
  ButtonGroup,
  ButtonFrom,
  Image,
  Text,
} from '@/components';
import { classNames } from '@/utilities/css';
import { useHasSlot } from '@/use/useHasSlot';
import type { ButtonProps } from '@/components/Button/types';
import XSmallIcon from '@icons/XSmallIcon.svg';
import styles from '@polaris/components/CalloutCard/CalloutCard.module.css';

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

export type CalloutCardEvents = {
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

const emits = defineEmits<CalloutCardEvents>();

const currentInstance = getCurrentInstance();

const slots = useSlots();
const { hasSlot } = useHasSlot();

const imageClassName = computed(() =>
  classNames(
    styles.Image,
    hasDismiss.value && styles.DismissImage,
  ),
);

const containerClassName = computed(() =>
  classNames(
    styles.Container,
    hasDismiss.value && styles.hasDismiss,
  ),
);

const hasDismiss = computed(() => currentInstance?.vnode.props?.onDismiss);
</script>
