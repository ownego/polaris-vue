<template lang="pug">
div(:class="className")
  template(
    v-if="$slots",
    v-for="(field, index) in Object.keys($slots)",
  )
    slot(
      v-if="field.startsWith('group-')",
      :name="field",
    )
    Item(
      v-else,
      :key="index",
    )
      slot(:name="field")
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/FormLayout.json';
import { Item, Group } from './components';

@Component({
  components: {
    Item,
    Group,
  },
})
export default class FormLayout extends Vue {
  public className = classNames(styles.FormLayout);
}
</script>
<style lang="scss">
@import 'polaris-react/src/components/FormLayout/FormLayout.scss';
</style>
