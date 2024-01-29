<template>
<Banner
  title="Before you can purchase a shipping label, this change needs to be made:"
  tone="warning"
  :action="{ content: 'Edit address', url: '' }"
>
  <List>
    <ListItem>
      The name of the city you're shipping to has characters that aren't
      allowed. City name can only include spaces and hyphens.
    </ListItem>
  </List>
</Banner>
</template>
