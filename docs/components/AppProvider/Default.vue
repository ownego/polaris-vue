<template>
<AppProvider :i18n="{}">
  <Box background="bg-surface-selected">
    <Text as="h1" variant="headingLg">
      {{ content }}
    </Text>
  </Box>
</AppProvider>
</template>

<script setup>
const content = 'hello';
</script>
