<template lang="pug">
Tooltip(
  preferred-position="above",
  :hover-delay="400",
)
  template(#content)
    Text(
      as="span",
      variant="bodyMd",
      alignment="center",
    ) {{ i18n.translate('Polaris.IndexFilters.EditColumnsButton.tooltip') }}
  Button(
    size="slim",
    :disabled="disabled",
    :icon="LayoutColumns3Icon",
    :accessibility-label="i18n.translate('Polaris.IndexFilters.EditColumnsButton.accessibilityLabel')",
    @click="emits('click')",
  )
</template>

<script setup lang="ts">
import useI18n from '@/use/useI18n';
import {
  Text,
  Tooltip,
  Button,
} from '@/components';
import LayoutColumns3Icon from '@icons/LayoutColumns3Icon.svg';

type EditColumnsButtonProps = {
  disabled?: boolean;
};

type EditColumnsButtonEvents = {
  'click': [];
};

defineProps<EditColumnsButtonProps>();
const emits = defineEmits<EditColumnsButtonEvents>();

const i18n = useI18n();
</script>
