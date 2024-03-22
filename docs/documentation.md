---
title: Installation
outline: deep
---

# {{ $frontmatter.title }}

Polaris Vue by [Ownego](https://ownego.com?utm_source=polaris-vue&utm_medium=referral&utm_campaign=website) is a component library for [Vue 3](https://vuejs.org) based on [Shopify Polaris style guide](https://polaris.shopify.com). We try to keep the package light-weight and easy to use (mostly similar with original Polaris Library).

**Following Shopify Polaris React version:** %POLARIS_VERSION%.

### Prerequisites

- [Node.js](https://nodejs.org/) version 18 or higher. (`lts/hydrogen` is recommended)
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

The `i18n` prop is required to pass the locales, you can check the [supported locales](/utilities#locales) here.

::: code-group
```vue [App.vue]
<template>
  <AppProvider :i18n="locales">
    ...
    <router-view />
  </AppProvider>
</template>
<script setup>
import locales from '@ownego/polaris-vue/dist/locales/en.json';
</script>
```
:::

## Nuxt 3

We have tested support for Nuxt 3 in non-SSR mode only. To use with Nuxt 3, follow the below configuration and then use the plugin in your `components/pages`.

#### Plugin

Create a new plugin file at `<project-root>/plugins/polaris.client.ts` and update the content to following

::: code-group
```ts [polaris.client.ts]
import PolarisVue from "@ownego/polaris-vue";
import "@ownego/polaris-vue/dist/style.css";

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(PolarisVue);
});
```
:::

#### Nuxt Config

Update `<project-root>/nuxt.config.ts` to include following config values

::: code-group
```ts [nuxt.config.ts]
export default defineNuxtConfig({
  ...
  build: {
    transpile: ["@ownego/polaris-vue"],
  },
  ...
});
```
:::

## Issues & Contributions

Polaris Vue by ownego is an open source project and we are very happy to accept community contributions.

If you notice any bugs, please create issues under [Issues](https://github.com/ownego/polaris-vue/issues).
To contribute, please read [Contributing](/contributing) first.

--

###  Missing declaration types?

At this moment, you should add the property `skipLibCheck: true` to `tsconfig.json` file. This will skip the check for missing declaration types.

Mostly components have been typed, but somehow if you find missing declaration types, please create an issue under [Issues](https://github.com/ownego/polaris-vue/issues).

::: code-group
```json [tsconfig.json]
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}
```
:::

### Types & CSS Variables

All tokens & variables are following the [Polaris Design Tokens](https://polaris.shopify.com/tokens/color).

For example, in the `Box` component, there is `background?: ColorBackgroundAlias` property.
`ColorBackgroundAlias` is a type that contains all the color tokens from Polaris (without prefix `--p-color`), similar with original Shopify Polaris React version.

```vue
<template>
<Box background="bg-fill-success">
  <p>Success</p>
</Box>
</template>
```

### Volar & Vue language service

If you are using Volar (Vue language features) plugin, you can specify global component types by configuring `compilerOptions.types` in `tsconfig.json`.

::: code-group
```json [tsconfig.json]
{
  "compilerOptions": {
    "types": [
      "@ownego/polaris-vue/dist/volar"
    ]
  }
}
```
:::

## License

Code released under the [MIT License](https://github.com/ownego/polaris-vue/blob/master/LICENSE).

Copyright &copy; 2021 - present by [Ownego](https://ownego.com?utm_source=polaris-vue&utm_medium=referral&utm_campaign=website).
