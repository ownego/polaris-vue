<template lang="pug">
button(
  :class="className",
  aria-label="Close",
  @click="emit('click')",
)
  Icon(:source="MobileCancelMajor", color="base")
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import MobileCancelMajor from '@icons/MobileCancelMajor.svg';
import { Icon } from '@/components/Icon';
import styles from '@/classes/Modal-CloseButton.json';

interface Props {
  titleHidden?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  titleHidden: false,
});

const emit = defineEmits<{
  (event: 'click'): void,
}>();

const className = computed(() => classNames(
  styles.CloseButton,
  props.titleHidden && styles.titleHidden,
));
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Modal/components/CloseButton/CloseButton.scss';
</style>
