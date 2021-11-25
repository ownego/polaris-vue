<template lang="pug">
li(:class="className")
  slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Item extends Vue {
  public className = this.$style.Item;
}
</script>

<style lang="scss" module>
@import './Item.scss';
</style>
