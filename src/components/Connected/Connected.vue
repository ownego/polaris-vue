<template lang="pug">
div(:class="className")
  slot(name="left")
  Item(position="primary")
    slot
  slot(name="right")
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import styles from '@/classes/Connected.json';
import { Item } from './components';

@Component({
  components: {
    Item,
  },
})
export default class Connected extends Vue {
  public className = styles.Connected;
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Connected/Connected.scss';
</style>
