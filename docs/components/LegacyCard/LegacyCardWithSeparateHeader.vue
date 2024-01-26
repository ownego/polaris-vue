<template>
<LegacyCard>
  <LegacyCardHeader
    title="Staff accounts"
    :actions="[{ content: 'Preview' }]"
  >
    <Popover
      active
      @close="() => {}"
    >
      <template #activator>
        <Button disclosure variant="plain">
          Add account
        </Button>
      </template>
      <ActionList :items="[{ content: 'Member' }, { content: 'Admin' }]" />
    </Popover>
  </LegacyCardHeader>
  <LegacyCardSection>
    <List>
      <ListItem>Felix Crafford</ListItem>
      <ListItem>Ezequiel Manno</ListItem>
    </List>
  </LegacyCardSection>
</LegacyCard>
</template>
