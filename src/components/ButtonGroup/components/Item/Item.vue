<template lang="pug">
div(
  :class="className",
  @focus="forceTrueFocused",
  @blur="forceFalseFocused",
)
  component(:is="buttonElm")
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { classNames } from '@/utilities/css';
import styles from '@polaris/components/ButtonGroup/ButtonGroup.module.css';

interface ItemProps {
  buttonElm: Element | any;
}

const props = defineProps<ItemProps>();

const focusValue = ref(false);

const forceTrueFocused = () => {
  focusValue.value = true;
};

const forceFalseFocused = () => {
  focusValue.value = false;
};

const className = computed(() => classNames(
  styles.Item,
  focusValue.value && styles['Item-focused'],
  props.buttonElm.props?.variant === 'plain' && styles['Item-plain'],
));
</script>
