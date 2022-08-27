<template lang="pug">
Stack(v-if="heading.new", :wrap="false", alignment="center")
  span {{ heading.title }}
  Badge(status="new")
    | {{ i18n.translate('Polaris.IndexTable.onboardingBadgeText') }}
VisuallyHidden(v-else-if="heading.hidden") {{ heading.title }}
template(v-else) {{ heading.title }}
</template>
<script setup lang="ts">
import { UseI18n } from '@/use';
import { Stack, Badge, VisuallyHidden } from '@/components';
import type { IndexTableHeading } from '../utils';

interface Props {
  heading: IndexTableHeading,
}

defineProps<Props>();

const i18n = UseI18n();
</script>
