<template :style="{ height: '500px' }">
<Button :onClick="handleChange">Open</Button>
<Modal
  :open="active"
  :onClose="handleChange"
  title="Reach more shoppers with Instagram product tags"
  :primaryAction="{ content: 'Add Instagram', onAction: handleChange }"
  :secondaryActions="[{ content: 'Learn more', onAction: handleChange }]"
>
  <ModalSection>
    <TextContainer>
      <Banner :action="{ content: 'Connect account' }" tone="warning">
        <Text as="p">
          Connect your instagram account to your shop before proceeding.
        </Text>
      </Banner>
      <Text as="p">
        Use Instagram posts to share your products with millions of
        people. Let shoppers buy from your store without leaving
        Instagram.
      </Text>
    </TextContainer>
  </ModalSection>
</Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const active = ref<boolean>(false);

const handleChange = () => {
  active.value = !active.value;
}
</script>
