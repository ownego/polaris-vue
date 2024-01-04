<template lang="pug">
div(
  :class="className",
  @focus="forceTrueFocused",
  @blur="forceFalseFocused",
)
  component(:is="buttonProp")
</template>

<script setup lang="ts">
import { ref, computed, useCssModule } from 'vue';
import { classNames } from '@/utilities/css';

interface ItemProps {
  buttonProp: Element | any;
}

const styles = useCssModule();

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
  props.buttonProp.props?.variant === 'plain' && styles['Item-plain'],
));
</script>

<style lang="scss" module>
@import '@polaris/components/ButtonGroup/ButtonGroup.scss';
</style>
