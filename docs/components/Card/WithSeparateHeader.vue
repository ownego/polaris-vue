<template>
<Card roundedAbove="sm">
  <BlockStack gap="200">
    <InlineGrid columns="1fr auto">
      <Text as="h2" variant="headingSm">
        Staff accounts
      </Text>
      <ButtonGroup>
        <Button
          variant="plain"
          accessibilityLabel="Preview"
          @click="() => {}"
        >
          Preview
        </Button>
        <Popover
          active={actionActive}
          activator={disclosureButtonActivator}
          @close="handleToggleAction"
        >
          <ActionList :items="items" />
          <template #activator>
            <Button variant="plain" disclosure @click="handleToggleAction">
              Add account
            </Button>
          </template>
        </Popover>
      </ButtonGroup>
    </InlineGrid>
    <List>
      <List.Item>Felix Crafford</List.Item>
      <List.Item>Ezequiel Manno</List.Item>
    </List>
  </BlockStack>
</Card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const actionActive = ref(false);

const handleToggleAction = () => {
  actionActive.value = !actionActive.value;
};

const items = [{content: 'Member'}, {content: 'Admin'}];
</script>
