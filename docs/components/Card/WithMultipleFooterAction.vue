<template>
<Card roundedAbove="sm">
  <BlockStack gap="200">
    <Text as="h2" variant="headingSm">
      Shipment 1234
    </Text>
    <BlockStack gap="200">
      <Text as="h3" variant="headingSm" fontWeight="medium">
        Items
      </Text>
      <List>
        <ListItem>1 &times; Oasis Glass, 4-Pack</ListItem>
        <ListItem>1 &times; Anubis Cup, 2-Pack</ListItem>
      </List>
    </BlockStack>
    <InlineStack align="end">
      <ButtonGroup>
        <Popover
          :active="actionActive"
          @close="handleToggleAction"
        >
          <ActionList :items="items" />
          <template #activator>
            <Button disclosure accessibilityLabel="More" @click="handleToggleAction">
              More
            </Button>
          </template>
        </Popover>
        <Button
          variant="primary"
          accessibilityLabel="Add tracking number"
          @click="() => {}"
        >
          Add tracking number
        </Button>
      </ButtonGroup>
    </InlineStack>
  </BlockStack>
</Card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const items = [
  {content: 'Cancel shipment', destructive: true},
  {content: 'Add another shipment', disabled: true},
];

const actionActive = ref(false);

const handleToggleAction = () => {
  actionActive.value = !actionActive.value;
};
</script>
