<template lang="pug">
div(:class="className")
  div(:class="classLabelWrapper")
    Label(
      v-if="hasLabelSlot",
      :id="id",
      :requiredIndicator="requiredIndicator",
      :hidden="false",
      v-bind="$attrs",
    )
      slot(name="label")
    div(
      v-if="action",
      :class="classAction"
    )
      //- TODO
      //- buttonFrom(action, {plain: true})
  slot
  div(
    v-if="isError",
    :class="classError",
  )
    InlineError(
      v-if="typeof error === 'string'",
      :message="error",
      :fieldID="errorId",
    )
    component(
      v-else,
      :is="error",
    )
  div(
    v-if="hasHelpTextSlot",
    :class="classHelpText",
    :id="helpTextId",
  )
    slot(name="help-text")
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import type { Action } from 'types/type';
import styles from '@/classes/Labelled.json';
import { Label } from '../Label';
import { helpTextID, errorID, LabelledProps } from './utils';
import { InlineError } from '../InlineError';

@Component({
  components: {
    Label,
    InlineError,
  },
})
export default class Labelled extends Vue {
  @Prop({ type: String })
  public id!: LabelledProps['id'];

  @Prop({ type: Boolean })
  public labelHidden?: LabelledProps['labelHidden'];

  @Prop({ type: Boolean })
  public requiredIndicator?: LabelledProps['requiredIndicator'];

  @Prop({ type: [Boolean, String, Array, Object, Function] })
  public error?: LabelledProps['error'];

  @Prop({ type: Object })
  public action?: Action;

  classLabelWrapper = classNames(styles.LabelWrapper);

  classAction = classNames(styles.Action);

  classError = classNames(styles.Error);

  classHelpText = classNames(styles.HelpText);

  get className() {
    return classNames(this.labelHidden && styles.hidden);
  }

  get hasLabelSlot() {
    return !!this.$slots.label;
  }

  get hasHelpTextSlot() {
    return !!this.$slots['help-text'];
  }

  get helpTextId() {
    return helpTextID(this.id);
  }

  get errorId() {
    return errorID(this.id);
  }

  get isError() {
    return this.error && typeof this.error !== 'boolean';
  }
}
</script>
<style lang="scss">
@import 'polaris-react/src/components/Labelled/Labelled.scss';
</style>
