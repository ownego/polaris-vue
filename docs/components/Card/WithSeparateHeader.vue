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
          :active="actionActive"
          @close="handleToggleAction"
        >
          <template #activator>
            <Button variant="plain" disclosure @click="handleToggleAction">
              Add account
            </Button>
          </template>
          <ActionList :items="items" />
        </Popover>
      </ButtonGroup>
    </InlineGrid>
    <List>
      <ListItem>Felix Crafford</ListItem>
      <ListItem>Ezequiel Manno</ListItem>
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
