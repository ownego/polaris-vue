<template lang="pug">
p(:class="className")
  slot
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/Caption.json';

@Component
export default class Caption extends Vue {
  public className = classNames(styles.Caption);
}
</script>
<style lang="scss">
@import 'polaris-react/src/components/Caption/Caption.scss';
</style>
