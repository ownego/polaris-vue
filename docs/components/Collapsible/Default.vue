<template>
<Box
  padding="400"
  background="bg-surface"
  borderRadius="200"
>
  <Button
    aria-controls="basic-collapsible"
    :aria-expanded="isCollapse"
    @click="handleClick"
  >
    Toggle
  </Button>
  <Collapsible
    id="collapsible"
    :expandOnPrint="true"
    :open="isCollapse"
    :transition="{duration: '500ms', timingFunction: 'ease-in-out'}"
  >
    <Box paddingBlockStart="400">
      <Text as="p">
        Your mailing list lets you contact customers or visitors who have shown an interest in your store.
        Reach out to them with exclusive offers or updates about your products.
      </Text>
    </Box>
  </Collapsible>
</Box>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isCollapse = ref<boolean>(true);

const handleClick = () => {
  isCollapse.value = !isCollapse.value;
}
</script>
