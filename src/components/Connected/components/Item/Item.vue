<template lang="pug">
div(
  :class="className",
  @blur="forceTrueFocused",
  @focus="forceFalseFocused",
)
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from '@/utilities/css';
import { useToggle } from '@/use/useToggle';
import styles from '@polaris/components/Connected/Connected.module.css';

type ItemPosition = 'left' | 'right' | 'primary';

type ItemProps = {
  /** Position of the item */
  position: ItemPosition;
}

const props = defineProps<ItemProps>();

const {
  value: focused,
  setTrue: forceTrueFocused,
  setFalse: forceFalseFocused,
} = useToggle(false);

const className = computed(() => classNames(
  styles.Item,
  focused && styles['Item-focused'],
  props.position === 'primary' ? styles['Item-primary'] : styles['Item-connection'],
));
</script>
