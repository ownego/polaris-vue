<template>
<Banner
  ref="bannerRef"
  title="High risk of fraud detected"
  tone="critical"
  :action="{ content: 'Review risk analysis', url: '' }"
>
  <Text as="p">
    Before fulfilling this order or capturing payment, please 
    <Link url="">review the Risk Analysis</Link> and determine if this order is fraudulent.
  </Text>
</Banner>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const bannerRef = ref<HTMLInputElement | null>(null);

onMounted(() => {
  bannerRef.value?.focus();
})
</script>
