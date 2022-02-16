<template lang="pug">
component(
  :is="as",
  :p-color-scheme="colorScheme",
  :class="className",
  :style="{ color: 'var(--p-text-color)' }",
)
  <!-- @slot The content to display -->
  slot
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { styles } from 'polaris-react/src/components/CustomProperties/styles';
import { DEFAULT_COLOR_SCHEME, STYLE_SHEET_ID, CustomPropertiesProps } from './utils';

@Component
export default class CustomProperties extends Vue {
  /** Determines what color scheme is applied to child content. */
  @Prop({ type: String, default: DEFAULT_COLOR_SCHEME })
  colorScheme?: CustomPropertiesProps['colorScheme'];

  /** Class name applied to the root element. */
  @Prop({ type: String })
  className?: CustomPropertiesProps['className'];

  /** Element used for the root node. */
  @Prop({ type: String, default: 'div' })
  as?: CustomPropertiesProps['as'];

  // eslint-disable-next-line class-methods-use-this
  created() {
    let styleSheet = document.getElementById(STYLE_SHEET_ID);

    if (styleSheet) return;

    styleSheet = document.createElement('style');

    styleSheet.id = STYLE_SHEET_ID;
    styleSheet.textContent = styles;

    document.head.appendChild(styleSheet);
  }
}
</script>
