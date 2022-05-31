<template lang="pug">
div(:class="styles.PageActions")
  Stack(:distribution="distribution", spacing="tight")
    ButtonGroup(v-if="secondaryActions && secondaryActions.length > 0")
      ButtonFrom(
        v-for="action in secondaryActions",
        :key="action.id",
        :action="action",
      )
    slot(v-if="hasSlot(slots.primaryAction)", name="primaryAction")
    ButtonFrom(
      v-else-if="primaryAction",
      :action="primaryAction",
      :overrides="{ primary: true }",
    )
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import styles from '@/classes/PageActions.json';
import { Stack, ButtonGroup, ButtonFrom } from '@/components';
import type { DisableableAction, LoadableAction, ComplexAction } from '@/utilities/interface';
import { hasSlot } from '@/utilities/has-slot';

interface PageActionsProps {
  /** The primary action for the page */
  primaryAction?: DisableableAction & LoadableAction;
  /** The secondary actions for the page */
  secondaryActions?: ComplexAction[];
}

const props = defineProps<PageActionsProps>();

const slots = useSlots();

const distribution = computed(() => {
  return props.secondaryActions && props.secondaryActions.length > 0
    ? 'equalSpacing'
    : 'trailing'
});

</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/PageActions/PageActions.scss';
</style>
