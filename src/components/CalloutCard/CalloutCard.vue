<template lang="pug">
Card
  div(:class="containerClassName")
    div(v-if="attrs.onDismiss", :class="styles.Dismiss")
      Button(
        plain,
        :icon="CancelSmallMinor",
        accessibilityLabel="Dismiss card",
        @click="handleClick",
      )
    CardSection
      div(:class="styles.CalloutCard")
        div(:class="styles.Content")
          div(:class="styles.Title")
            Heading {{ title }}
          TextContainer
            slot
          div(:class="styles.Buttons")
            ButtonGroup(v-if="secondaryAction")
              ButtonFrom(:action="primaryAction")
              ButtonFrom(
                :action="secondaryAction",
                :overrides="{ plain: true }",
              )
            ButtonFrom(
              v-else,
              :action="primaryAction",
            )
        Image(
          alt="",
          :class="imageClassName",
          :source="illustration",
        )
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import type { Action } from '@/utilities/type';
import { Card, TextContainer, ButtonGroup, Button, ButtonFrom, Heading, Image, CardSection } from '@/components';
import CancelSmallMinor from '@icons/CancelSmallMinor.svg';
import styles from '@/classes/CalloutCard.json';

interface CalloutCardProps {
  /** The title of the card */
  title: string;
  /** URL to the card illustration */
  illustration: string;
  /** Primary action for the card */
  primaryAction: Action;
  /** Secondary action for the card */
  secondaryAction?: Action;
}

const props = defineProps<CalloutCardProps>();

const attrs = useAttrs();

const imageClassName = computed(() => {
  return classNames(
    styles.Image,
    !!attrs['onDismiss'] && styles.DismissImage,
  );
});

const containerClassName = computed(() => {
  return classNames(
    styles.Container,
    !!attrs['onDismiss'] && styles.hasDismiss,
  );
});

const handleClick = () => {
  const onDismiss = attrs.onDismiss as () => void;
  attrs.onDismiss && onDismiss();
};
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/CalloutCard/CalloutCard.scss';
</style>
