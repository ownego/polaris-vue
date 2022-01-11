<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import type { Key } from './utils';

type KeyEvent = 'keydown' | 'keyup';

@Component
export default class KeypressListener extends Vue {
  @Prop({ type: String })
  public keyCode!: Key;

  @Prop({ type: Function })
  public handler!: (event: KeyboardEvent) => void;

  @Prop({ type: String, default: 'keyup' })
  public keyEvent!: KeyEvent;

  public handleKeyEvent(event: KeyboardEvent) {
    if (event.key === this.keyCode) {
      this.handler(event);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return null;
  }

  mounted(): void {
    document.addEventListener(this.keyEvent, this.handleKeyEvent);
  }

  beforeDestroy(): void {
    document.removeEventListener(this.keyEvent, this.handleKeyEvent);
  }
}

</script>
