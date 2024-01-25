<template>
  <!-- This component does not render anything -->
</template>

<script setup lang="ts">
import { onMounted, onUpdated, onBeforeUnmount, ref } from 'vue';

// Define the basic properties for an event listener
interface BaseEventProps {
  event: string;
  capture?: boolean;
  handler(event: Event): void;
}

// Extend the basic properties with an optional passive property
interface EventListenerProps extends BaseEventProps {
  passive?: boolean;
}

// Define the props for this component using the EventListenerProps interface
const props = defineProps<EventListenerProps>();

// Create a ref to store the previous props, which will be used to remove the old event listener when the props change
const prevProps = ref<BaseEventProps | null>(null);

// When the component is mounted, attach an event listener with the current props
onMounted(() => {
  attachListener(props);
});

// When the component is updated, remove the old event listener and attach a new one with the current props
onUpdated(() => {
  if (prevProps.value) {
    detachListener(prevProps.value);
  }

  attachListener(props);

  // Update prevProps with the current props
  prevProps.value = props;
});

// Before the component is unmounted, remove the current event listener
onBeforeUnmount(() => {
  detachListener(props);
});

// Define a function to attach an event listener to the window object
function attachListener({ event, handler, capture, passive }: EventListenerProps) {
  window.addEventListener(event, handler, { capture, passive });
}

// Define a function to remove an event listener from the window object
function detachListener({ event, handler, capture }: BaseEventProps) {
  window.removeEventListener(event, handler, capture);
}
</script>
