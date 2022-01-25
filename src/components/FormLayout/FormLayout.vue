<template lang="pug">
div(:class="className")
  slot
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/FormLayout.json';

@Component
export default class FormLayout extends Vue {
  public className = classNames(styles.FormLayout);
}
</script>
<style lang="scss">
@import 'polaris-react/src/components/FormLayout/FormLayout.scss';
</style>
