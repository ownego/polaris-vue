<template lang="pug">
Banner(
  title="Your shipping label is ready to print."
  tone="success"
  :action="{ content: 'Print label', url: '' }"
  @dismiss="() => {}"
)
</template>
