<template lang="pug">
div(:class="styles.Connected")
  Item(v-if="slots.left", position="left")
    slot(name="left")
  Item(position="primary")
    slot
  Item(v-if="slots.right", position="right")
    slot(name="right")
</template>

<script setup lang="ts">
import { useCssModule } from 'vue';
import { Item } from './components';
import { type VueNode } from '@/utilities/types';

type ConnectedSlots = {
  left?: (_?: VueNode) => null;
  right?: (_?: VueNode) => null;
  default: (_?: VueNode) => null;
};

const styles = useCssModule();

const slots = defineSlots<ConnectedSlots>();
</script>

<style module lang="scss">
@import '@polaris/components/Connected/Connected.module.scss';
</style>
