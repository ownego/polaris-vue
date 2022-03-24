provide, import { computed } from 'vue';
<template lang="pug">
div(:class="className")
  Header(
    v-if="slots.title || actions",
    :actions="actions",
  )
    template(#title)
      slot(name="title")
  Section(v-if="sectioned")
    slot
  slot(v-else)
  div(
    v-if="primaryFooterAction || (secondaryFooterActions && secondaryFooterActions.length)",
    :class="footerClassName",
  )
    ButtonGroup(v-if="footerActionAlignment === 'right'")
      ButtonFrom(
        v-if="secondaryFooterActions && secondaryFooterActions.length === 1",
        :action="secondaryFooterActions[0]",
      )
      Popover(
        v-else-if="secondaryFooterActions && secondaryFooterActions.length > 1",
        :active="secondaryActionsPopoverOpen",
        @close="toggleSecondaryActionsPopoverOpen",
      )
        template(#activator)
          Button(:disclosure="true", @click="toggleSecondaryActionsPopoverOpen")
            | {{ secondaryFooterActionsDisclosureText || lang.Polaris.Common.more }}
        template(#content)
          ActionList(:items="secondaryFooterActions")
      ButtonFrom(
        v-if="primaryFooterAction",
        :action="primaryFooterAction",
        :overrides="{ primary: true }",
      )
    ButtonGroup(v-else)
      ButtonFrom(
        v-if="primaryFooterAction",
        :action="primaryFooterAction",
        :overrides="{ primary: true }",
      )
      ButtonFrom(
        v-if="secondaryFooterActions && secondaryFooterActions.length === 1",
        :action="secondaryFooterActions[0]"
      )
      Popover(
        v-else-if="secondaryFooterActions && secondaryFooterActions.length > 1",
        :active="secondaryActionsPopoverOpen",
        @close="toggleSecondaryActionsPopoverOpen",
      )
        template(#activator)
          Button(disclosure, @click="toggleSecondaryActionsPopoverOpen")
            | {{ secondaryFooterActionsDisclosureText || lang.Polaris.Common.more }}
        template(#content)
          ActionList(:items="secondaryFooterActions")
</template>

<script setup lang="ts">
import { computed, provide, ref, useSlots } from 'vue';
import { classNames } from 'polaris-react/src/utilities/css';
import lang from 'polaris-react/locales/en.json';
import styles from '@/classes/Card.json';
import { ButtonGroup, ActionList, Button, Popover } from '@/components';
import { ButtonFrom } from '@/components/Button';
import type { DisableableAction, ComplexAction } from '@/utilities/interface';
import { Header, Section } from './components';

export interface CardProps {
  /** A less prominent card */
  subdued?: boolean;
  /** Auto wrap content in section */
  sectioned?: boolean;
  /** Card header actions */
  actions?: DisableableAction[];
  /** Primary action in the card footer */
  primaryFooterAction?: ComplexAction;
  /** Secondary actions in the card footer */
  secondaryFooterActions?: ComplexAction[];
  /** The content of the disclosure button rendered when there is more than one secondary footer action */
  secondaryFooterActionsDisclosureText?: string;
  /** Alignment of the footer actions on the card, defaults to right */
  footerActionAlignment?: 'right' | 'left';
  /** Allow the card to be hidden when printing */
  hideOnPrint?: boolean;
}

const props = withDefaults(defineProps<CardProps>(), {
  footerActionAlignment: 'right',
});

const slots = useSlots();

const secondaryActionsPopoverOpen = ref(false);

const toggleSecondaryActionsPopoverOpen = () => {
  secondaryActionsPopoverOpen.value = !secondaryActionsPopoverOpen.value;
};

const className = computed(() => {
  return classNames(
    styles.Card,
    props.subdued && styles.subdued,
    props.hideOnPrint && styles.hideOnPrint,
  );
});

const footerClassName = computed(() => {
  return classNames(
    styles.Footer,
    props.footerActionAlignment === 'left' && styles.LeftJustified,
  )
});

provide('WithinContentContext', false);
</script>

<style lang="scss">
@import 'polaris-react/src/components/Card/Card.scss';
</style>
