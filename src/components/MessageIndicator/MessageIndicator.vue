<template lang="pug">
div(:class="styles.MessageIndicatorWrapper")
  div(v-if="active", :class="styles.MessageIndicator")
  slot
</template>

<script setup lang="ts">
import styles from '@/classes/MessageIndicator.json';

interface MessageIndicatorProps {
  active?: boolean;
}

const props = defineProps<MessageIndicatorProps>();
</script>

<style lang="scss">
@import 'polaris-react/src/components/MessageIndicator/MessageIndicator.scss';
</style>
