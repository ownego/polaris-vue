<template>
<Page
  title="Product"
  :primaryAction="{
    content: 'Save',
  }"
  :secondaryActions="[{
    content: 'Import',
    disabled: true,
    helpText: 'You need permission to import products.',
  }]"
/>
</template>
