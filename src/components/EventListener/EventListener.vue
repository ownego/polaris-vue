<script lang="ts">
export default {
  inheritAttrs: false,
  render() {
    return null;
  },
}
</script>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue';

type BaseEventProps = {
  event: string;
  capture?: boolean;
  passive?: boolean;
  handler(event: Event): void;
}

const props = defineProps({
  event: { type: String, required: true },
  capture: { type: Boolean },
  passive: { type: Boolean },
  handler: { type: Function as unknown as () => BaseEventProps['handler'], required: true },
});

function attachListener() {
  const { event, capture, passive, handler } = props;
  window.addEventListener(event, handler, { capture, passive });
}

function detachListener(prevProps?: BaseEventProps) {
  const { event, handler, capture } = prevProps || props;
  window.removeEventListener(event, handler, capture);
}

watch(
  () => ({ ...props }),
  (newProps, oldProps) => {
    if (newProps !== oldProps) {
      detachListener(oldProps);
      attachListener();
    }
  },
);

onMounted(() => attachListener());

onBeforeUnmount(() => detachListener());
</script>
