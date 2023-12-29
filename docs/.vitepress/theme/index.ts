// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './scss/global.scss'
import './style.css'

// Global components
import BestPractices from './components/BestPractices.vue';
import PropsTable from './components/PropsTable.vue';
import SlotsTable from './components/SlotsTable.vue';
import EventsTable from './components/EventsTable.vue';
import Lede from './components/Lede.vue';
import Examples from './components/Examples.vue';
import ListComponents from './components/ListComponents.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('BestPractices', BestPractices);
    app.component('PropsTable', PropsTable);
    app.component('SlotsTable', SlotsTable);
    app.component('EventsTable', EventsTable);
    app.component('Lede', Lede);
    app.component('Examples', Examples);
    app.component('ListComponents', ListComponents);
  }
} satisfies Theme
