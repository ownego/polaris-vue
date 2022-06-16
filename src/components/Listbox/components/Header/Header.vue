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

const isSlotContainHTMLTag = computed(() => {
  if (!defaultSlot.value) {
    return false;
  }

  // More than 2 elements => it's HTML tag
  if (defaultSlot.value.length > 1) {
    return true;
  }

  // The only element is not Text or null Symbol
  if (defaultSlot.value[0]
    && defaultSlot.value[0].type.toString() !== 'Symbol(Text)'
    && defaultSlot.value[0].type.toString() !== 'Symbol()'
  ) {
    return true;
  }

  return false;
});
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Listbox/components/Header/Header.scss';
</style>
