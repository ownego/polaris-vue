<script lang="ts">
export default {
  name: 'EventListener',
  inheritAttrs: false,
  render() {
    return null;
  },
}
</script>
<script setup lang="ts">
import { onMounted, watch, onBeforeUnmount } from 'vue';

type EventListenerProps = {
  event: string;
  capture?: boolean;
  handler(event: Event): void;
  passive?: boolean;
  customWindow?: Window | null;
}

const props = defineProps<EventListenerProps>();

onMounted(() => {
  attachListener();
});

onBeforeUnmount(() => {
  detachListener();
});

watch(
  () => ({ ...props }),
  (newProps, oldProps) => {
    if (newProps !== oldProps) {
      detachListener();
      attachListener();
    }
  },
);

function attachListener() {
  const window = props.customWindow || globalThis.window;

  window.addEventListener(props.event, props.handler, {
    capture: props.capture,
    passive: props.passive,
  });
}

function detachListener() {
  const window = props.customWindow || globalThis.window;

  window.removeEventListener(props.event, props.handler, {
    capture: props.capture,
  });
}
</script>
