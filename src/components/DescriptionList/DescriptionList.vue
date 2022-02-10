<template lang="pug">
dl(:class="className")
  slot
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/DescriptionList.json';

@Component
export default class DescriptionList extends Vue {
  /**
   * Determines the spacing between list items
   * @default 'loose'
   */
  @Prop({ type: String, default: 'loose' })
  public spacing?: 'tight' | 'loose';

  get className() {
    return classNames(
      styles.DescriptionList,
      this.spacing === 'tight' && styles.spacingTight,
    );
  }
}
</script>
<style lang="scss">
@import 'polaris-react/src/components/DescriptionList/DescriptionList.scss';
</style>
