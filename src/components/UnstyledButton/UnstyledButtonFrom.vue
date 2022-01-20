<template lang="pug">
UnstyledButton(
  :key="key",
  v-bind="{ ...action, ...overrides }",
  @click="$emit('click')",
) {{ content }}
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ComplexAction } from '@/interface';
import { handleMouseUpByBlurring } from '@/utilities/focus';
import { UnstyledButtonProps } from './utils';
import UnstyledButton from './UnstyledButton.vue';

@Component({
  components: {
    UnstyledButton,
  },
})
export default class UnstyledButtonFrom extends Vue {
  @Prop() public content?: ComplexAction['content'];

  @Prop() public id?: ComplexAction['id'];

  @Prop() public accessibilityLabel?: ComplexAction['accessibilityLabel'];

  @Prop() public url?: ComplexAction['url'];

  @Prop() public external?: ComplexAction['external'];

  @Prop() public disabled?: ComplexAction['disabled'];

  @Prop() public destructive?: ComplexAction['destructive'];

  @Prop() public icon?: ComplexAction['icon'];

  @Prop() public outline?: ComplexAction['outline'];

  @Prop() public loading?: ComplexAction['loading'];

  @Prop() public plain?: ComplexAction['plain'];

  @Prop() public overrides?: Partial<UnstyledButtonProps>;

  @Prop() public key?: string;

  public onMouseUp = handleMouseUpByBlurring;
}
</script>
