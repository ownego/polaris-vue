// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

// Global components
import PropsTable from './components/PropsTable.vue';
import SlotsTable from './components/SlotsTable.vue';
import Lede from './components/Lede.vue';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('PropsTable', PropsTable);
    app.component('SlotsTable', SlotsTable);
    app.component('Lede', Lede);
  }
} satisfies Theme
