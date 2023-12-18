---
title: Installation
outline: deep
---

# {{ $frontmatter.title }}

Polaris Vue by [Ownego](https://ownego.com) is a component library for [Vue 3](https://vuejs.org) based on [Shopify Polaris style guide](https://polaris.shopify.com). We try to keep the package light-weight and easy to use (mostly similar with original Polaris Library).

**Follow Polaris React version:** 12.x - Migrated date: *Jan 31st, 2024*.

### Prerequisites

- [Node.js](https://nodejs.org/) version 18 or higher.
- Vue 3 version 3.3 or higher.
- [VSCode](https://code.visualstudio.com/) is recommended, along with the [official Vue extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar).

### Setup

::: code-group
```bash [npm]
npm install @ownego/polaris-vue
```
```bash [yarn]
yarn add @ownego/polaris-vue
```
:::

### Usage

You can use Polaris Vue in two ways, as a plugin or as a component library. We recommend using it as a plugin.

#### Use as a plugin

::: code-group
```js [main.js]
import { createApp } from 'vue'
import PolarisVue from '@ownego/polaris-vue' // [!code ++]
import App from './App.vue'
// This css import line will be deprecated once Vue 3 supports css injections.
import '@ownego/polaris-vue/dist/style.css' // [!code ++]

//...
const app = createApp(App)
app.use(PolarisVue) // [!code ++]
...
```
:::

#### Use as a component library

::: code-group
```vue [Component.vue]
<script setup>
import { List, Icon } from '@ownego/polaris-vue';
</script>
```
:::

::: details De-duplicating Vue version
`PolarisVue`, other packages and your project may require access to the global Vue reference. So sometimes, you may get the runtime error message like:

```
TypeError: Cannot read properties of null (reading 'isCE')
renderSlot(...)
...
```

To avoid this, simply add `dedupe: ['vue']` to your `vite.config.ts` file, like below:

```js
export default defineConfig({
  resolve: {
    ...
    dedupe: ['vue'],
  },
  ...
});
```
:::

## AppProvider

The [AppProvider](/components/AppProvider) component is **required** to use PolarisVue. Without it, the components in your application will not function correctly. You must wrap the root (the top) of your application in the app provider component.

::: code-group
```vue [App.vue]
<template>
  <AppProvider>
    ...
    <router-view />
  </AppProvider>
</template>
```
:::

## Issues & Contributions

Polaris Vue by ownego is an open source project and we are very happy to accept community contributions.

If you notice any bugs, please create issues under [Issues](https://github.com/ownego/polaris-vue/issues).

To contribute, please read [Contributing](/contributing) first.

## License

Code released under the [MIT License](https://github.com/ownego/polaris-vue/blob/master/LICENSE).

Copyright &copy; 2021 - present by [Ownego](https://ownego.com).
