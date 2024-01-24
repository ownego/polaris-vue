<template lang="pug">
div(:class="className")
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from '@/utilities/css';
import styles from '@polaris/components/FormLayout/FormLayout.module.scss';

type FormItemProps = {
  condensed?: boolean;
}

const props = defineProps<FormItemProps>();

const className = computed(() => classNames(
  styles.Item,
  props.condensed ? styles.condensed: styles.grouped,
));
</script>
