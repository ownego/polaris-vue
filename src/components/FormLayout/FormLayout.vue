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
import type { VNodeArrayChildren } from 'vue';
import styles from '@/classes/FormLayout.json';
import { Item } from './components';

const itemRefs = ref<any[]>([]);

const itemGroupIndexes = ref<boolean[]>([]);

const slots = useSlots();

const slotsElms = computed(() => {
  const items : VNodeArrayChildren = [];
  if (slots.default) {
    slots.default().map(item => {
      const children = item.children as VNodeArrayChildren;
      if (typeof children === 'string' && children === 'v-if') {
        return;
      }

      if (item.type.toString() === 'Symbol(Fragment)' || item.type.toString() === 'Symbol()') {
        children.forEach(child => {
          items.push(child);
        });
      } else {
        items.push(item);
      }
    });
  }
  return items;
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
