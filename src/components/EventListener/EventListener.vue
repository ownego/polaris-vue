<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

interface BaseEventProps {
  event: string;
  capture?: boolean,
  handler(event: Event): void,
}

export interface EventListenerProps extends BaseEventProps {
  passive?: boolean;
}

@Component
export default class EventListener extends Vue {
  @Prop({ type: String, required: true })
  public event!: EventListenerProps['event'];

  @Prop({ type: Boolean })
  public capture!: EventListenerProps['capture'];

  @Prop({ type: Function })
  public handler!: EventListenerProps['handler'];

  @Prop({ type: Boolean })
  public passive!: EventListenerProps['passive'];

  // eslint-disable-next-line class-methods-use-this
  render() {
    return null;
  }

  protected mounted() {
    this.attachListener();
  }

  protected beforeDestroy() {
    this.detachListener();
  }

  private attachListener() {
    const {
      event, handler, capture, passive,
    } = this.$props;
    window.addEventListener(event, handler, { capture, passive });
  }

  private detachListener(prevProps?: BaseEventProps) {
    const { event, handler, capture } = prevProps || this.$props;
    window.removeEventListener(event, handler, capture);
  }
}
</script>
