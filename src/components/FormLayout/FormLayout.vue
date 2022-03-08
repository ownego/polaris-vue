<template lang="pug">
div(:class="styles.FormLayout")
  template(
    v-if="slots.default",
    v-for="(item, index) in slots.default()",
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
import { onBeforeUpdate, onMounted, ref, useSlots } from 'vue';
import { Item } from './components';
import styles from '@/classes/FormLayout.json';

const itemRefs = ref<any[]>([]);

const itemGroupIndexes = ref<boolean[]>([]);

const slots = useSlots();

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
@import 'polaris-react/src/components/FormLayout/FormLayout.scss';
</style>
