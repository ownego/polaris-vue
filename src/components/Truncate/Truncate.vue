<template lang="pug">
span(:class="className")
  slot
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import styles from '@/classes/Truncate.json';

@Component
export default class Truncate extends Vue {
  public className = styles.Truncate;
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Truncate/Truncate.scss';
</style>
