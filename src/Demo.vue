<template lang="pug">
#app
  list(type="number")
    list-item Yellow
    list-item Red
    list-item Blue

  icon(:source="icon")
  Popover(
    :active="active",
    @close="active = !active",
  )
    button(slot="activator", @click="active = !active") Action
    list(type="number", slot="content")
      list-item a
      list-item b
      list-item c
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CirclePlusMinor from '@icons/CirclePlusMinor.svg';

@Component
export default class Demo extends Vue {
  public icon = CirclePlusMinor;

  public active = false;
}
</script>

<style lang="scss">
@import './scss/main.scss';

:root {
  --p-font-size-base: 14px;
}
</style>
