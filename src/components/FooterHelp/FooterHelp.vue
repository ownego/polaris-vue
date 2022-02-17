<template lang="pug">
div(:class="footerHelpClassName")
  div(:class="textClassName")
    slot
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import styles from '@/classes/FooterHelp.json';

@Component
export default class FooterHelp extends Vue {
  public footerHelpClassName = styles.FooterHelp;

  public textClassName = styles.Text;
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/FooterHelp/FooterHelp.scss';
</style>
