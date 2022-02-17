<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { focusFirstFocusableNode } from '@/utilities/focus';

@Component
export default class Focus extends Vue {
  @Prop({ type: Boolean }) public disabled?: boolean;

  @Prop({ type: HTMLElement }) public root?: HTMLElement;

  // eslint-disable-next-line class-methods-use-this
  render() {
    return null;
  }

  @Watch('disabled')
  @Watch('root')
  onChanged() {
    this.focusNode();
  }

  public focusNode() {
    if (!this.disabled && this.root && !this.root.querySelector('[autofocus]')) {
      focusFirstFocusableNode(this.root, false);
    }
  }

  mounted(): void {
    this.focusNode();
  }
}
</script>
