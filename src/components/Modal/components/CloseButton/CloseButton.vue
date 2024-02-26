<template lang="pug">
Button(
  variant="tertiary",
  :icon="XIcon",
  :pressed="pressed",
  :accessibility-label="i18n.translate('Polaris.Common.close')",
)
</template>

<script setup lang="ts">
import useI18n from '@/use/useI18n';
import { Button } from '@/components';
import XIcon from '@icons/XIcon.svg';

defineProps<{
  pressed?: boolean;
}>();

const i18n = useI18n();
</script>
