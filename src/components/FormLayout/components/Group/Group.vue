<template lang="pug">
div(
  role="group",
  :class="className",
  :aria-labelledby="titleId",
  :aria-describedby="helpTextId",
)
  div(
    v-if="slots.title || title",
    :id="titleId",
    :class="styles.Title",
  )
    slot(v-if="slots.title", name="title")
    template(v-else) {{ title }}
  div(:class="styles.Items")
    template(v-if="slots.default && hasSlot(slots.default)")
      template(
        v-for="item, index in slots.default()",
        :key="index",
      )
        Item(
          v-if="item.type.toString() === 'Symbol(Fragment)' && item.el === null && item.children",
          v-for="child, childIndex in item.children",
          :key="`${index}-${childIndex.toString()}`",
        )
          component(:is="child")
        Item(v-else)
          component(:is="item")
    slot(v-else)
  div(
    v-if="slots['help-text'] || helpText",
    :id="helpTextId",
    :class="styles.HelpText",
  )
    slot(v-if="slots['help-text']", name="help-text")
    template(v-else) {{ helpText }}
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import { Item } from '../Item';
import { hasSlot } from '@/utilities/has-slot';
import styles from '@/classes/FormLayout.json';
import { UseUniqueId } from '@/use';

/**
 * Setup
 */
interface Props {
  condensed?: boolean;
  helpText?: string;
  title?: string;
}

const props = defineProps<Props>();

const slots = useSlots();

const { useUniqueId } = UseUniqueId();
const id = useUniqueId('FormLayoutGroup');

const helpTextId = `${id}HelpText`;
const titleId = `${id}Title`;

defineExpose({ name: 'FormGroup' });

/**
 * Computed
 */
const className = computed(() => {
  return classNames(props.condensed ? styles.condensed : styles.grouped);
});
</script>
