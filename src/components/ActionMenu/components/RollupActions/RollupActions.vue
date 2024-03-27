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
        :icon="MenuHorizontalIcon",
        :accessibilityLabel="accessibilityLabel || i18n.translate('Polaris.ActionMenu.RollupActions.rollupButton')",
        @click="toggleRollupOpen",
      )
  ActionList(
    :items="items",
    :sections="sections",
    @action-any-item="toggleRollupOpen",
  )
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ActionListItemDescriptor, ActionListSection } from '@/utilities/types';
import MenuHorizontalIcon from '@icons/MenuHorizontalIcon.svg';
import useI18n from '@/use/useI18n';
import styles from '@polaris/components/ActionMenu/components/RollupActions/RollupActions.module.css';

interface RollupActionsProps {
  /** Accessibilty label */
  accessibilityLabel?: string;
  /** Collection of actions for the list */
  items?: ActionListItemDescriptor[];
  /** Collection of sectioned action items */
  sections?: ActionListSection[];
}

const i18n = useI18n();

defineProps<RollupActionsProps>();

const rollupOpen = ref(false);

const toggleRollupOpen = () => {
  rollupOpen.value = !rollupOpen.value;
};
</script>
