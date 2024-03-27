<template lang="pug">
div(
  ref="legacyCardRef",
  :class="className",
)
  Header(
    v-if="title || hasSlot(slots.title) || actions",
    :actions="actions",
    :title="title",
  )
    slot(v-if="hasSlot(slots.title)", name="title")
  Section(v-if="sectioned")
    slot
  slot(v-else)
  div(
    v-if="primaryFooterAction || (secondaryFooterActions && secondaryFooterActions.length)",
    :class="footerMarkupStyle",
  )
    ButtonGroup(v-if="footerActionAlignment === 'right'")
      ButtonFrom(
        v-if="secondaryFooterActions && secondaryFooterActions.length === 1",
        :action="secondaryFooterActions[0]",
      )
      Popover(
        v-else,
        :active="secondaryActionsPopoverOpen",
        @close="toggleSecondaryActionsPopoverOpen",
      )
        template(#activator)
          Button(
            :disclosure="true",
            @click="toggleSecondaryActionsPopoverOpen")
            | {{ secondaryFooterActionsDisclosureText || i18n.translate('Polaris.Common.more') }}
        ActionList(:items="secondaryFooterActions")
      ButtonFrom(
        v-if="primaryFooterAction",
        :action="primaryFooterAction",
        :overrides="{ variant: 'primary' }",
      )
    ButtonGroup(v-else)
      ButtonFrom(
        v-if="primaryFooterAction",
        :action="primaryFooterAction",
        :overrides="{ variant: 'primary' }",
      )
      ButtonFrom(
        v-if="secondaryFooterActions && secondaryFooterActions.length === 1",
        :action="secondaryFooterActions[0]",
      )
      Popover(
        v-else,
        :active="secondaryActionsPopoverOpen",
        @close="toggleSecondaryActionsPopoverOpen",
      )
        template(#activator)
          Button(
            :disclosure="true",
            @click="toggleSecondaryActionsPopoverOpen")
            | {{ secondaryFooterActionsDisclosureText || i18n.translate('Polaris.Common.more') }}
        ActionList(:items="secondaryFooterActions")
</template>

<script setup lang="ts">
import { computed, useSlots, provide } from 'vue';
import type {
  ComplexAction,
  DisableableAction,
} from '@/utilities/types';
import useI18n from '@/use/useI18n';
import { useToggle } from '@/use/useToggle';
import { useLegacyCardPaddingObserverRef } from '@/use/useLegacyCard';
import { classNames } from '@/utilities/css';
import { Button } from '@/components';
import { useHasSlot } from '@/use/useHasSlot';
import styles from '@polaris/components/LegacyCard/LegacyCard.module.css';
import { Header, Section } from './components';

interface LegacyCardProps {
  /** Title content for the card */
  title?: string;
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

const props = withDefaults(defineProps<LegacyCardProps>(), {
  footerActionAlignment: 'right',
});

const i18n = useI18n();
const slots = useSlots();
const legacyCardRef = useLegacyCardPaddingObserverRef();
const { hasSlot } = useHasSlot();

const {
  value: secondaryActionsPopoverOpen,
  toggle: toggleSecondaryActionsPopoverOpen,
} = useToggle(false);

const className = computed(() =>
  classNames(
    styles.LegacyCard,
    props.subdued && styles.subdued,
    props.hideOnPrint && styles.hideOnPrint,
  ),
);

const footerMarkupStyle = computed(() =>
  classNames(
    styles.Footer,
    props.footerActionAlignment === 'left' && styles.LeftJustified,
  ),
);

provide('within-content-context', true);
</script>
