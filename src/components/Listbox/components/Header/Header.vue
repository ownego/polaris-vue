<template lang="pug">
div(:id="sectionContext", aria-hidden)
  div(v-if="!isSlotContainHTMLTag", :class="styles.Header")
    slot
  slot(v-else)
</template>

<script setup lang="ts">
import { inject, useSlots, computed } from 'vue';
import styles from '@/classes/Listbox-Header.json';

const sectionContext = inject<string>('sectionContext', '');

const slots = useSlots();
const defaultSlot = computed(() => slots.default?.());

const isSlotContainHTMLTag = computed(() => Boolean(
  defaultSlot.value
    && (defaultSlot.value.length >= 2
      || (defaultSlot.value[0]
        && defaultSlot.value[0].type.toString() !== 'Symbol(Text)')),
)); 
</script>

<style lang="scss">
@import 'polaris-react/src/components/Listbox/components/Header/Header.scss';
</style>
