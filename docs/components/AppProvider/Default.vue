<template>
<AppProvider :i18n="{}">
  <Box background="bg-surface-selected">
    {{ content }}
  </Box>
</AppProvider>
</template>

<script setup>
const content = 'hello';
</script>
