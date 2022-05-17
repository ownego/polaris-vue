<template lang="pug">
Card(sectioned)
  SettingAction
    template(#action)
      ButtonFrom(
        v-if="action",
        :action="action",
        :overrides="{ primary: !connected }",
      )
    template(#setting)
      Stack
        Avatar(
          v-if="connected",
          accessibilityLabel="",
          :name="accountName",
          :initials="initials",
          :source="avatarUrl",
        )
        StackItem(fill)
          div(:class="styles.Content")
            div(v-if="title || hasSlot(slots.title)")
              template(v-if="hasSlot(slots.title)")
                slot(name="title")
              template(v-else)
                | {{ title }}
            div(v-else-if="accountName") {{ accountName }}
            div(v-if="details || hasSlot(slots.details)")
              TextStyle(variation="subdued")
                template(v-if="hasSlot(slots.details)")
                  slot(name="details")
                template(v-else)
                  | {{ details }}
  div(v-if="termsOfService || hasSlot(slots.termsOfService)", :class="styles.TermsOfService")
    template(v-if="hasSlot(slots.termsOfService)")
      slot(name="termsOfService")
    template(v-else)
      | {{ termsOfService }}
</template>
<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { Action } from '@/utilities/type';
import { hasSlot } from '@/utilities/has-slot';
import { Avatar, ButtonFrom, Card, Stack, StackItem, TextStyle, SettingAction } from '@/components';
import styles from '@/classes/AccountConnection.json';

interface AccountConnectionProps {
  /** Content to display as title */
  title?: string;
  /** Content to display as additional details */
  details?: string;
  /** Content to display as terms of service */
  termsOfService?: string;
  /** The name of the service */
  accountName?: string;
  /** URL for the user’s avatar image */
  avatarUrl?: string;
  /** Set if the account is connected */
  connected?: boolean;
  /** Action for account connection */
  action?: Action;
}

const props = withDefaults(defineProps<AccountConnectionProps>(), {
  connected: false,
  accountName: '',
});

const slots = useSlots();

const initials = computed(() => {
  return props.accountName
    ? props.accountName
      .split(/\s+/)
      .map((name) => name[0])
      .join('')
    : undefined
});
</script>
<style lang="scss">
@import 'polaris/polaris-react/src/components/AccountConnection/AccountConnection.scss';
</style>
