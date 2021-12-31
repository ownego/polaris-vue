<template lang="pug">
#app
  list(type="number")
    list-item Yellow
    list-item Red
    list-item Blue

  icon(:source="icon")
  spinner
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CirclePlusMinor from '@icons/CirclePlusMinor.svg';

@Component
export default class Demo extends Vue {
  public icon = CirclePlusMinor;
}
</script>

<style lang="scss">
@import './scss/main.scss';

:root {
  --p-font-size-base: 14px;
}
</style>
