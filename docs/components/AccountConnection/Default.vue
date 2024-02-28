<template>
  <AccountConnection
    :connected="connected"
    :account-name="accountName"
    :action="action"
  >
    <template #title>
      Example App
    </template>

    <template #details>
      {{ details }}
    </template>

    <template #term-of-service>
      <p v-if="!connected">
        By clicking <strong>Connect</strong>, you agree to accept Sample App’s
        <Link url="Example App">terms and conditions</Link>. You’ll pay a
        commission rate of 15% on sales made through Sample App.
      </p>
    </template>
  </AccountConnection>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const connected = ref(false);

const accountName = computed(() => connected.value ? 'Jane Appleseed' : '');
const buttonText = computed(() => connected.value ? 'Disconnect' : 'Connect');
const details = computed(() => connected.value ? 'Connected' : 'Not connected');
const action = computed(() => {
  return {
    content: buttonText.value,
    onAction: handleAction,
  };
});

const handleAction = () => {
  connected.value = !connected.value;
};
</script>
