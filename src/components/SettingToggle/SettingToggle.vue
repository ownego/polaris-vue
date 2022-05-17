<template lang="pug">
Card(sectioned)
  SettingAction
    template(#action)
      ButtonFrom(
        v-if="action",
        :action="action",
        :overrides="{ primary: !enabled }",
      )
    template(#setting)
      slot
</template>
<script setup lang="ts">
import type { ComplexAction } from '@/utilities/interface';
import { SettingAction, ButtonFrom, Card } from '@/components';

interface SettingToggleProps {
  /** Card header actions */
  action?: ComplexAction;
  /** Sets toggle state to activated or deactivated */
  enabled?: boolean;
}

const props = defineProps<SettingToggleProps>();
</script>
