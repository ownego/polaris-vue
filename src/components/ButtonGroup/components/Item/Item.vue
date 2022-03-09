<template lang="pug">
div(
  :class="className",
  @focus="forceTrueFocused",
  @blur="forceFalseFocused",
)
  slot
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/ButtonGroup.json';
import type { anyKey } from '@/utilities/interface';

const focused = ref<boolean>(false);

const slots = useSlots();

const slotProps = computed(() => {
  return slots.default && slots.default()[0].props as anyKey;
});

const className = computed(() => {
  const plain = slotProps.value && (slotProps.value.plain === '' || slotProps.value.plain);
  return classNames(
    styles.Item,
    focused.value && styles['Item-focused'],
    plain && styles['Item-plain'],
  );
});

const forceTrueFocused = () => {
  focused.value = true;
}

const forceFalseFocused = () => {
  focused.value = false;
}
</script>
