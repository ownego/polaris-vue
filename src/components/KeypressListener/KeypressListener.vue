<script lang="ts">
export default {
  inheritAttrs: false,
  render() {
    return null;
  },
}
</script>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';
import type { Key } from './utils';

type KeyEvent = 'keydown' | 'keyup';

const props = defineProps({
  keyCode: { type: String as () => Key, required: true },
  keyEvent: { type: String as () => KeyEvent, default: 'keyup' },
  handler: { type: Function, required: true },
  useCapture: { type: Boolean },
  // eslint-disable-next-line no-undef
  options: { type: Object as () => AddEventListenerOptions },
});

function handleKeyEvent(event: KeyboardEvent) {
  if (event.key === props.keyCode) {
    props.handler(event);
  }
}

onMounted(() => document.addEventListener(props.keyEvent, handleKeyEvent, props.useCapture || props.options));

onBeforeUnmount(() => document.removeEventListener(props.keyEvent, handleKeyEvent, props.useCapture || props.options));
</script>
