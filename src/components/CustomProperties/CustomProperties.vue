<template lang="pug">
component(
  :is="as",
  :p-color-scheme="colorScheme",
  :class="className",
  :style="{ color: 'var(--p-text-color)' }",
)
  slot
</template>
<script lang="ts">
import {
  defineComponent, onMounted,
} from 'vue';
import { styles } from 'polaris-react/src/components/CustomProperties/styles';
import { DEFAULT_COLOR_SCHEME, STYLE_SHEET_ID, CustomPropertiesProps } from './utils';

export default defineComponent({
  props: {
    colorScheme: {
      type: String as () => CustomPropertiesProps['colorScheme'],
      default: DEFAULT_COLOR_SCHEME,
    },
    className: {
      type: String as () => CustomPropertiesProps['className'],
    },
    as: {
      type: String as () => CustomPropertiesProps['as'],
      default: 'div',
    },
  },
  setup() {
    onMounted(() => {
      let styleSheet = document.getElementById(STYLE_SHEET_ID);

      if (styleSheet) return;

      styleSheet = document.createElement('style');

      styleSheet.id = STYLE_SHEET_ID;
      styleSheet.textContent = styles;

      document.head.appendChild(styleSheet);
    });
  },
});
</script>
