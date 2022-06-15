<template lang="pug">
Stack(alignment="center", vertical)
  EmptySearchSvg
  DisplayText(size="small") {{ title }}
  TextStyle(variation="subdued")
    p(v-if="description") {{ description }}
</template>
<script setup lang="ts">
import { UseI18n } from '@/use';
import { DisplayText, TextStyle, Stack } from '@/components';

import EmptySearchSvg from 'polaris/polaris-react/src/components/EmptySearchResult/illustrations/empty-search.svg';

interface EmptySearchResultProps {
  title: string;
  description?: string;
  withIllustration?: boolean;
}

defineProps<EmptySearchResultProps>();
const i18n = UseI18n();

const altText = i18n.translate('Polaris.EmptySearchResult.altText');
</script>
