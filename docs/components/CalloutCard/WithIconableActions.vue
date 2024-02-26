<template>
<CalloutCard
  title="Tell us how we're doing"
  illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
  :primaryAction="{
    content: 'Good',
    icon: SmileyHappyIcon,
  }"
  :secondaryAction="{
    content: 'Bad',
    icon: SmileySadIcon,
    variant: 'secondary',
  }"
>
  <p>How do you like our app?</p>
</CalloutCard>
</template>

<script setup lang="ts">
// import SmileyHappyIcon from '@shopify/polaris-icons/dist/svg/SmileyHappyIcon.svg';
// import SmileySadIcon from '@shopify/polaris-icons/dist/svg/SmileySadIcon.svg';
import SmileyHappyIcon from '@icons/SmileyHappyIcon.svg';
import SmileySadIcon from '@icons/SmileySadIcon.svg';
</script>
