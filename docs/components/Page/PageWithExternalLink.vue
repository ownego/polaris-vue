<template>
<Page
  title="Jar With Lock-Lid"
  :primaryAction="{content: 'Save', disabled: true}"
  :secondaryActions="[
    {
      content: 'Promote',
      external: true,
      icon: ExternalIcon,
      url: 'https://www.facebook.com/business/learn/facebook-page-build-audience',
    },
  ]"
>
  <LegacyCard title="Credit card" sectioned>
    <Text as="p">Credit card information</Text>
  </LegacyCard>
</Page>
</template>

<script setup lang="ts">
import ExternalIcon from '@icons/ExternalIcon.svg'
</script>
