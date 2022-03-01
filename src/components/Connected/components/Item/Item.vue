<template lang="pug">
div(
  :class="className",
  @focus="handleFocus",
  @blur="handleBlur",
)
  slot
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/Connected.json';

type ItemPosition = 'left' | 'right' | 'primary';

interface Props {
  position: ItemPosition;
}

const props = defineProps<Props>();

/* eslint-disable */
const emits = defineEmits<{
  (event: 'focus'): void
  (event: 'blur') : void
}>();
/* eslint-disable */

const focused = ref(false);

const className = computed(() => {
  return classNames(
    styles.Item,
    focused.value && styles['Item-focused'],
    props.position === 'primary' && styles['Item-primary'],
  );
});

const handleFocus = (): void => {
  focused.value = true;
  emits('focus');
};

const handleBlur = (): void => {
  focused.value = false;
  emits('blur');
};
</script>
