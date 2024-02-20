<template lang="pug">
LegacyStack(alignment="center", vertical)
  Image(
    v-if="withIllustration",
    :alt="i18n.translate('Polaris.EmptySearchResult.altText')",
    :source="emptySearch",
    :draggable="false",
  )
  Text(
    variant="headingLg",
    as="p"
  ) {{ title }}
  Text(
    tone="subdued",
    as="span",
  )
    p(v-if="description") {{ description }}
</template>

<script setup lang="ts">
import {
  Text,
  Image,
  LegacyStack,
} from '@/components';
import useI18n from '@/use/useI18n';
import { emptySearch } from './illustrations';

export interface EmptySearchResultProps {
  title: string;
  description?: string;
  withIllustration?: boolean;
}

defineProps<EmptySearchResultProps>();
const i18n = useI18n();
</script>
