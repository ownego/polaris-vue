<template lang="pug">
Card
  div(
    :class="mediaCardClassName",
  )
    div(
      :class="mediaContainerClassName",
    )
      slot
    div(
      :class="infoContainerClassName",
    )
      CardSection
        div(
          v-if="popoverActions.length > 0",
          :class="styles.Popover",
        )
          Popover(
            :active="popoverActive",
            @close="togglePopoverActive",
            preferredAlignment="left"
            preferredPosition="below"
          )
            template(#content)
              ActionList(
                :items="popoverActions",
                @action-any-item="togglePopoverActive",
              )
            template(#activator)
              Button(
                :icon="HorizontalDotsMinor",
                @click ="togglePopoverActive",
                size="slim",
                :plain="true",
                :accessibilityLabel="lang.Polaris.MediaCard.popoverActivatorLabel",
              )       
        Stack(
          :vertical="true",
          spacing="tight",
        )
          div(
           :class="styles.Heading",
          )
            Heading {{ title }}
          p(
            :class="styles.Description",
          ) {{ description }}
          div(
            v-if="primaryAction || secondaryAction",
            :class="actionClassName",
          )
            ButtonGroup
              div(
                v-if="primaryAction",
                :class="styles.PrimaryAction",
              )
                ButtonFrom(
                  :action="primaryAction",
                )
              div(
                v-if="secondaryAction",
                :class="styles.SecondaryAction",
              )
                ButtonFrom(
                  :action="secondaryAction",
                )
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import styles from '@/classes/MediaCard.json';
import HorizontalDotsMinor from '@shopify/polaris-icons/dist/svg/HorizontalDotsMinor.svg';
import type { ComplexAction } from '@/utilities/interface';
import type { ActionListItemDescriptor } from '@/components/ActionList/utils';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import { Card, CardSection, Popover, Button, ButtonFrom, ActionList, Stack, ButtonGroup, Heading } from "@/components";

type Size = 'small' | 'medium';

interface Props {
  /** Heading content */
  title: string;
  /** Body content */
  description: string;
  /** Main call to action, rendered as a basic button */
  primaryAction?: ComplexAction;
  /** Secondary call to action, rendered as a plain button */
  secondaryAction?: ComplexAction;
  /** Action list items to render in ellipsis popover */
  popoverActions?: ActionListItemDescriptor[];
  /** Whether or not card content should be laid out vertically
   * @default false
   */
  portrait?: boolean;
  /** Size of the visual media in the card
   * @default 'medium'
   */
  size?: Size;
}

const popoverActive = ref(false);

const togglePopoverActive = () => {
  popoverActive.value = !popoverActive.value;
};
const props = withDefaults(defineProps<Props>(), {
  popoverActions: () => [],
  size: 'medium',
  portrait: false,
});
const lang = inject('lang') as Record<string, any>;

const actionClassName = computed(() => classNames(
  styles.ActionContainer,
  props.portrait && styles.portrait,
));

const mediaCardClassName = computed(() => classNames(
  styles.MediaCard,
  props.portrait && styles.portrait,
));

const mediaContainerClassName = computed(() => classNames(
  styles.MediaContainer,
  props.portrait && styles.portrait,
  props.size === 'small' && styles.sizeSmall,
));
const infoContainerClassName = computed(() => classNames(
  styles.InfoContainer,
  props.portrait && styles.portrait,
  props.size === 'small' && styles.sizeSmall,
));

</script>

<style lang="scss">
@import "polaris/polaris-react/src/components/MediaCard/MediaCard.scss";
</style>
