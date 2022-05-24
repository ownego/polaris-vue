<template lang="pug">
Card(sectioned)
  SettingAction
    template(#action)
      ButtonFrom(
        v-if="action",
        :action="action",
        :overrides="{ primary: !enabled, role: 'switch', id: id, ariaChecked: enabled ? true : false }",
      )
    template(#setting)
      label(:for="id")
        slot
</template>
<script setup lang="ts">
import { globalIdGeneratorFactory } from 'polaris/polaris-react/src/utilities/unique-id/unique-id-factory';
import type { ComplexAction } from '@/utilities/interface';
import { SettingAction, ButtonFrom, Card } from '@/components';

interface SettingToggleProps {
  /** Card header actions */
  action?: ComplexAction;
  /** Sets toggle state to activated or deactivated */
  enabled?: boolean;
}

const props = defineProps<SettingToggleProps>();

const getId = globalIdGeneratorFactory('SettingToggle');

const id = getId();
</script>
