<template lang="pug">
div(:id="errorTextId", :class="className")
  div(:class="iconClassName")
    Icon(source="AlertMinor")
  span {{ message }}
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import styles from '@/classes/InlineError.json';
import { Icon } from '../Icon';

@Component({
  components: {
    Icon,
  },
})
export default class InlineError extends Vue {
  /**
   * Content briefly explaining how to resolve the invalid form field input.
   */
  @Prop({ type: String, required: true })
  public message!: string;

  /**
   * Unique identifier of the invalid form field that the message describes
   */
  @Prop({ type: String, required: true })
  public fieldId!: string;

  public className: string = styles.InlineError;

  public iconClassName: string = styles.Icon;

  get errorTextId(): string {
    return `${this.fieldId}Error`;
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/InlineError/InlineError.scss';
</style>
