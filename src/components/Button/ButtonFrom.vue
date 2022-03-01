<template lang="pug">
ButtonGroupItem(v-if="action")
  Button(
    v-bind="props",
    @click="action.onAction",
  ) {{ action.content }}
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ComplexAction } from '@/interface';
import { ButtonGroupItem } from '@/components/ButtonGroup';
import { Button } from '@/components/Button';
import { ButtonProps } from './utils';

@Component({
  components: {
    ButtonGroupItem,
    Button,
  },
})
export default class ButtonFrom extends Vue {
  @Prop() public action!: ComplexAction;

  @Prop() public overrides!: Partial<ButtonProps>;

  get props() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { onAction, content, ...other } = this.action;
    return { ...other, ...this.overrides };
  }
}
</script>
