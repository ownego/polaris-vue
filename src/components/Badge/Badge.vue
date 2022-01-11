<template lang="pug">
span(:class="className")
  template(v-if="hasAccessibilityLabel")
    span(
      v-if="progressLabel",
      :class="classPip",
    )
      VisuallyHidden {{ accessibilityLabel }}
    VisuallyHidden(v-else) {{ accessibilityLabel }}
  slot
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames, variationName } from 'polaris-react/src/utilities/css';
import { VisuallyHidden } from '../VisuallyHidden';
import styles from '@/classes/Badge.json';

const DEFAULT_SIZE = 'medium';

type StatusDeprecated = 'attention';

@Component({
  components: {
    VisuallyHidden,
  },
})
export default class Badge extends Vue {
  /**
   * Set the color of the badge for the given status.
   */
  @Prop({ type: String })
  public status?: 'success' | 'info' | 'critical' | 'warning' | 'new' | StatusDeprecated;

  /**
   * Render a pip showing the progress of a given task.
   */
  @Prop({ type: String })
  public progress?: 'incomplete' | 'partiallyComplete' | 'complete';

  /**
   * Medium or small size. Use `small` only in the main navigation of an app frame.
   */
  @Prop({ type: String })
  public size?: 'medium' | 'small';

  /**
   * Medium or small size. Use `small` only in the main navigation of an app frame.
   * @ignore
   */
  @Prop({ type: Boolean, default: false })
  public isWithinFilter?: boolean;

  /**
   * Pass a custom accessibilityLabel
   */
  @Prop({ type: String })
  statusAndProgressLabelOverride?: string;

  public progressLabel = '';

  public statusLabel = '';

  public classPip = classNames(styles.Pip);

  get className() {
    return classNames(
      styles.Badge,
      this.status && styles[variationName('status', this.status) as keyof typeof styles],
      this.progress && styles[variationName('progress', this.progress) as keyof typeof styles],
      this.size && this.size !== DEFAULT_SIZE && styles[variationName('size', this.size) as keyof typeof styles],
      this.isWithinFilter && styles.withinFilter,
    );
  }

  get accessibilityLabel() {
    return this.statusAndProgressLabelOverride || `${this.statusLabel} ${this.progressLabel}`;
  }

  get hasAccessibilityLabel() {
    return this.progressLabel || this.statusLabel || this.statusAndProgressLabelOverride;
  }

  created() {
    switch (this.progress) {
    case 'incomplete':
      this.progressLabel = 'incomplete';
      break;
    case 'partiallyComplete':
      this.progressLabel = 'partiallyComplete';
      break;
    case 'complete':
      this.progressLabel = 'complete';
      break;

    default:
      break;
    }

    switch (this.status) {
    case 'info':
      this.statusLabel = 'info';
      break;
    case 'success':
      this.statusLabel = 'success';
      break;
    case 'warning':
      this.statusLabel = 'warning';
      break;
    case 'critical':
      this.statusLabel = 'critical';
      break;
    case 'attention':
      this.statusLabel = 'attention';
      break;
    case 'new':
      this.statusLabel = 'new';
      break;
    default:
      break;
    }
  }
}
</script>
<style lang="scss">
@import 'polaris-react/src/components/Badge/Badge.scss';
</style>
