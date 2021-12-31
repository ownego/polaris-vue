<template lang="pug">
div(:className="className", v-bind="overlayAttr")
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import { overlay } from '@/components/shared';
import { attachListener, detachListener } from '@/utilities/helper';
import styles from '@/classes/List.json';

@Component
export default class PopoverOverlay extends Vue {
  public className = classNames(styles.Item);

  public overlayAttr = overlay.props;

  private handleClick = (event: Event) => {
    const target = event.target as HTMLElement;
  };

  mounted(): void {
    attachListener('click', this.handleClick);
    attachListener('touchstart', this.handleClick);
  }

  beforeDestroy(): void {
    detachListener('click', this.handleClick);
    detachListener('touchstart', this.handleClick);
  }
}
</script>
