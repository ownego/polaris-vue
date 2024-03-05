<template lang="pug">
LegacyStack(alignment="center", vertical)
  Image(
    v-if="withIllustration",
    :alt="i18n.translate('Polaris.EmptySearchResult.altText')",
    :source="source",
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

export interface EmptySearchResultProps {
  title: string;
  description?: string;
  withIllustration?: boolean;
}

defineProps<EmptySearchResultProps>();
const i18n = useI18n();

const source = 'data:image/svg+xml,%3csvg width=\'60\' height=\'60\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3cpath fill-rule=\'evenodd\' d=\'M41.87 24a17.87 17.87 0 11-35.74 0 17.87 17.87 0 0135.74 0zm-3.15 18.96a24 24 0 114.24-4.24L59.04 54.8a3 3 0 11-4.24 4.24L38.72 42.96z\' fill=\'%238C9196\'/%3e%3c/svg%3e';
</script>
