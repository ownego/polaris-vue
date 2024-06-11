<template lang="pug">
Card
  SettingAction
    template(#action)
      ButtonFrom(
        v-if="action",
        :action="action",
        :overrides="{ variant: connected ? undefined : 'primary' }",
      )

    InlineStack(gap="400")
      span(v-if="connected")
        Avatar(
          accessibility-label="",
          :name="accountName",
          :initials="initials",
          :source="avatarUrl",
        )

      BlockStack(gap="100")
        Text(
          as="h2",
          variant="headingSm",
        )
          slot(
            v-if="hasSlot(slots.title)",
            name="title",
          )
          span(v-else) {{ accountName }}

        Text(
          v-if="hasSlot(slots.details)",
          as="span",
          variant="bodyMd",
          tone="subdued",
        )
          slot(name="details")

  Box(
    v-if="hasSlot(slots['term-of-service'])"
    :padding-block-start="breakpoints.mdUp ? '400' : '500'",
  )
    Text(
      as="span",
      variant="bodyMd",
    )
      slot(name="term-of-service")
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { useBreakpoints } from '@/use/useBreakpoints';
import { useHasSlot } from '@/use/useHasSlot';
import {
  Avatar,
  ButtonFrom,
  SettingAction,
  Card,
  Box,
  InlineStack,
  Text,
  BlockStack,
} from '@/components';
import type { Action, VueNode } from '@/utilities/types';

export interface AccountConnectionProps {
  /** The name of the service */
  accountName?: string;
  /** URL for the user’s avatar image */
  avatarUrl?: string;
  /** Set if the account is connected */
  connected?: boolean;
  /** Action for account connection */
  action?: Action;
}

export type AccountConnectionSlots = {
  /** Content to display as title */
  title: (_: VueNode) => any;
  /** Content to display as additional details */
  details: (_: VueNode) => any;
  /** Content to display as terms of service */
  'term-of-service': (_: VueNode) => any;
};

const breakpoints = useBreakpoints();
const { hasSlot } = useHasSlot();

const props = withDefaults(defineProps<AccountConnectionProps>(), {
  connected: false,
  accountName: '',
});

defineSlots<AccountConnectionSlots>();

const slots = useSlots();

const initials = computed(() => {
  return props.accountName
    ? props.accountName
      .split(/\s+/)
      .map((name) => name[0])
      .join('')
  : undefined;
});
</script>
