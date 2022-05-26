<template lang="pug">
Popover(
  v-if="items?.length || sections?.length",
  :active="rollupOpen",
  preferredAlignment="right",
  @close="toggleRollupOpen",
  hideOnPrint,
)
  template(#activator)
    div(:class="styles.RollupActivator")
      Button(
        outline,
        :icon="HorizontalDotsMinor",
        :accessibilityLabel="accessibilityLabel || i18n.translate('Polaris.ActionMenu.RollupActions.rollupButton')",
        @click="toggleRollupOpen",
      )
  template(#content)
    ActionList(
      :items="items",
      :sections="sections",
      @action-any-item="toggleRollupOpen",
    )
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HorizontalDotsMinor from '@icons/HorizontalDotsMinor.svg';
import styles from '@/classes/ActionMenu-RollupActions.json';
import { ActionList, Button, Popover } from '@/components';
import { UseI18n } from '@/use';
import type { ActionListItemDescriptor, ActionListSection } from '@/components/ActionList/utils';

interface RollupActionsProps {
  /** Accessibilty label */
  accessibilityLabel?: string;
  /** Collection of actions for the list */
  items?: ActionListItemDescriptor[];
  /** Collection of sectioned action items */
  sections?: ActionListSection[];
}

const i18n = UseI18n();

defineProps<RollupActionsProps>();

const rollupOpen = ref(false);

const toggleRollupOpen = () => {
  rollupOpen.value = !rollupOpen.value;
};

</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/ActionMenu/components/RollupActions/RollupActions.scss';
</style>
