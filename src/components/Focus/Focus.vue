<script lang="ts">
export default {
  inheritAttrs: false,
  render() {
    return null;
  },
}
</script>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { focusFirstFocusableNode } from '@/utilities/focus';

interface Props {
  disabled?: boolean;
  root: HTMLElement | null;
}

const props = defineProps<Props>();

const focusNode = () => {
  if (!props.disabled && props.root && !props.root.querySelector('[autofocus]')) {
    focusFirstFocusableNode(props.root, false);
  }
};

watch(
  [
    () => props.disabled,
    () => props.root,
  ],
  () => focusNode(),
)

onMounted(() => {
  focusNode();
});
</script>
