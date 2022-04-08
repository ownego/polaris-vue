<template lang="pug">
div(:class="styles.FormLayout")
  template(
    v-if="slotsElms.length",
    v-for="(item, index) in slotsElms",
  )
    Item(
      v-if="!itemGroupIndexes[index]",
      :key="index",
      :class="styles.Item",
    )
      component(
        :is="item",
        :ref="el => { itemRefs[index] = el }",
      )
    component(
      v-else,
      :is="item",
      :ref="el => { itemRefs[index] = el }",
    )
  slot(v-else)
</template>

<script setup lang="ts">
import { computed, onBeforeUpdate, onMounted, ref, useSlots } from 'vue';
import styles from '@/classes/FormLayout.json';
import { Item } from './components';

const itemRefs = ref<any[]>([]);

const itemGroupIndexes = ref<boolean[]>([]);

const slots = useSlots();

const slotsElms = computed(() => {
  const elms: any[] = [];
  const defaultSlot = slots.default && slots.default();

  // Nothing in the default slot
  if (!defaultSlot || !defaultSlot.length) { return elms; }

  for (let i = 0; i < defaultSlot.length; i++) {
    if (defaultSlot[i].type.toString() === 'Symbol()') {
      elms.push(defaultSlot[i].children);
    } else {
      elms.push(defaultSlot[i]);
    }
  }

  return elms;
});

onBeforeUpdate(() => {
  itemRefs.value = [];
});

onMounted(() => {
  // Check on the refs to see if they are a group
  // Detected by the defineExpose `name` property inside Group component
  itemRefs.value.forEach((item) => {
    itemGroupIndexes.value.push(item.name === 'FormGroup');
  });
});
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/FormLayout/FormLayout.scss';
</style>
