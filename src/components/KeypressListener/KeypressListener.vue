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
});

function handleKeyEvent(event: KeyboardEvent) {
  if (event.key === props.keyCode) {
    props.handler(event);
  }
}

onMounted(() => document.addEventListener(props.keyEvent, handleKeyEvent));

onBeforeUnmount(() => document.removeEventListener(props.keyEvent, handleKeyEvent));
</script>
