<template lang="pug">
div(:class="styles.PageActions")
  LegacyStack(distribution="trailing" spacing="tight")
    template(v-if="hasSlot(slots.secondaryActions)")
      slot(name="secondaryActions")
    ButtonGroup(v-else-if="secondaryActions && secondaryActions.length > 0")
      ButtonFrom(
        v-for="action, index in secondaryActions",
        :key="action.id || `${index}`",
        :action="action",
      )

    template(v-if="hasSlot(slots.primaryAction)")
      slot(name="primaryAction")
    ButtonFrom(
      v-else-if="primaryAction",
      :action="primaryAction"
      :overrides="{ variant: 'primary' }",
    )
</template>

<script setup lang="ts">
import { type VNode } from 'vue';
import type {
  ComplexAction,
  DisableableAction,
  LoadableAction,
  VueNode,
} from '@/utilities/types';
import {
  LegacyStack,
  ButtonGroup,
  ButtonFrom,
} from '@/components';
import { useHasSlot } from '@/use/useHasSlot';

import styles from '@polaris/components/PageActions/PageActions.module.scss';

export type PageActionsProps = {
  /** The primary action for the page */
  primaryAction?: DisableableAction & LoadableAction;
  /** The secondary actions for the page */
  secondaryActions?: ComplexAction[];
}

type PageActionsSlots = {
  primaryAction: (_: VueNode) => VNode[];
  secondaryActions: (_: VueNode) => VNode[];
}

defineProps<PageActionsProps>();
const slots = defineSlots<PageActionsSlots>();

const { hasSlot } = useHasSlot();
</script>
