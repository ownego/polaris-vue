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
      Item(
        v-for="item, index in slotsElms",
        :key="index",
      )
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
import type { VNodeArrayChildren } from 'vue';
import { classNames } from '@/utilities/css';
import { Item } from '../Item';
import { hasSlot } from '@/utilities/has-slot';
import { extractElement } from '@/utilities/extract-fragment';
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
</script>
