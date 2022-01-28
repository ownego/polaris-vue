<template lang="pug">
div(:class="wrapperClassName")
  div(:class="contentClassName")
    div(:class="iconClassName")
      Icon(:source="footerHelpIcon", color="highlight")
    div(:class="textClassName")
      slot
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/FooterHelp.json';
import InfoMinor from '@icons/InfoMinor.svg';
import { Icon } from '../Icon';

@Component({
  components: {
    Icon,
  },
})
export default class FooterHelp extends Vue {
  public wrapperClassName = classNames(styles.FooterHelp);

  public contentClassName = styles.Content;

  public iconClassName = styles.Icon;

  public textClassName = styles.Text;

  public footerHelpIcon = InfoMinor;
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/FooterHelp/FooterHelp.scss';
</style>
