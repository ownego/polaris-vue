<template lang="pug">
ul(:class="className")
  slot
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import styles from '@/classes/ExceptionList.json';
import { Icon } from '../Icon';
import { Truncate } from '../Truncate';

@Component({
  components: {
    Icon,
    Truncate,
  },
})
export default class ExceptionList extends Vue {
  public className = styles.ExceptionList;
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/ExceptionList/ExceptionList.scss';
</style>
