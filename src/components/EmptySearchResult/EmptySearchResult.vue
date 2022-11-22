<template lang="pug">
Stack(alignment="center", vertical)
  EmptySearchSvg
  Text(variant="headingLg", as="p") {{ title }}
  Text(variant="bodyMd", color="subdued", as="span")
    p(v-if="description") {{ description }}
</template>
<script setup lang="ts">
import { UseI18n } from '@/use';
import { Text, Stack } from '@/components';

import EmptySearchSvg from 'polaris/polaris-react/src/components/EmptySearchResult/illustrations/empty-search.svg?component';

interface EmptySearchResultProps {
  title: string;
  description?: string;
  withIllustration?: boolean;
}

defineProps<EmptySearchResultProps>();
const i18n = UseI18n();

const altText = i18n.translate('Polaris.EmptySearchResult.altText');
</script>
