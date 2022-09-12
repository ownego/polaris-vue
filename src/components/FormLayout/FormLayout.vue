<template lang="pug">
div(:class="styles.FormLayout")
  template(
    v-if="!noItemWrap && slotsElms.length",
    v-for="(item, index) in slotsElms",
  )
    Item(
      v-if="!itemGroupIndexes[index]",
      :key="index",
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
import { extractElement } from '@/utilities/extract-fragment';
import styles from '@/classes/FormLayout.json';
import { Item } from './components';

interface Props {
  /** No wrap all stack elements with FormItem  */
  noItemWrap?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  noItemWrap: false,
});

const itemRefs = ref<any[]>([]);

const itemGroupIndexes = ref<boolean[]>([]);

const slots = useSlots();

const slotsElms = computed(() => {
  let elms : VNodeArrayChildren = [];
  if (slots.default) {
    const groups = slots.default().map(group => {
      return extractElement(group);
    });
    elms = groups.flat();
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
