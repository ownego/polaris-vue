<template lang="pug">
#app
  list(type="number")
    list-item Yellow
    list-item Red
    list-item Blue

  icon(source="CirclePlusMinor")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { List, ListItem, Icon } from './polaris-vue';

@Component({
  components: {
    List,
    ListItem,
    Icon,
  },
})
export default class Demo extends Vue {}
</script>

<style lang="scss">
@import './scss/main.scss';

:root {
  --p-font-size-base: 14px;
}
</style>
