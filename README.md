# Polaris Vue (Support Vue 3.0)

Polaris Vue by Ownego only supports **Vue 3.0+**.

Polaris Vue based on [Shopify Polaris style guide](https://polaris.shopify.com/), built especially for Vue 3.
We're trying to make it mostly close with Shopify style guide and get a better performance.

**Follow Polaris React version:** [10.12.0](https://github.com/Shopify/polaris/releases/tag/%40shopify%2Fpolaris%4010.12.0) - Migrated date: *Nov 23rd, 2022*.

<br/>

## Documentation

Online documentation: [Click Here](https://ownego.github.io/polaris-vue/)

<br/>

## Installation

Via NPM:

```bash
npm install @ownego/polaris-vue
```

Via Yarn:

```bash
yarn add @ownego/polaris-vue
```

<br/>

## Usage

Use as a Vue 3 plugin (globally registers all components):

```js
//main.js
import { createApp } from 'vue'
import PolarisVue from '@ownego/polaris-vue' // (✓)
import '@ownego/polaris-vue/dist/style.css' // (✓) This will be deprecated in the future, right after Vue 3 supports css injections.
import App from './App.vue'

//...
const app = createApp(App)
app.use(PolarisVue) // (✓)
...
```

**OR** use individual component:

```js
import { List, Icon } from '@ownego/polaris-vue';
```

<br/>

### **AppProvider**
The AppProvider component is `required` to use PolarisVue. Without it, the components in your application will not function correctly. You must wrap the root (the top) of your application in the app provider component.

```javascript
// App.vue
<template>
<AppProvider>
  ...
</AppProvider>
</template>

<script></script>
```


## NUXT 3

We have tested support for Nuxt 3 in non-SSR mode only. To use with Nuxt 3, follow the below configuration and then use the plugin in your components/pages

### Plugin File

Create a new plugin file at `<project-root>/plugins/polaris.client.ts` and update the content to following

```ts
import PolarisVue from "@ownego/polaris-vue";
import "@ownego/polaris-vue/dist/style.css";

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(PolarisVue);
});
```

### Nuxt Config

Update `<project-root>/nuxt.config.ts` to include following config values

```ts
export default defineNuxtConfig({
  ...
  build: {
    transpile: ["@ownego/polaris-vue"],
  },
  ...
});
```


## De-duplicating Vue version

`PolarisVue`, other packages and your project may require access to the global Vue reference. So sometimes, you may get the runtime error message like:

```bash
TypeError: Cannot read properties of null (reading 'isCE')
renderSlot(...)
...
```

To avoid this, simply add `dedupe: ['vue']` to your `vite.config.ts` file, like below:

```bash
export default defineConfig({
  resolve: {
    ...
    dedupe: ['vue'],
  },
  ...
});
```

---

## Developers / Build

```bash
# Clone repo
git clone https://github.com/ownego/polaris-vue.git

# Install packages
yarn

# Create a Demo.vue file to test

# Development & Demo
yarn dev
```

## Contributing

Polaris Vue by Ownego is an open source project and we are very happy to accept community contributions.

If you notice any bugs, please create issues under [Issues](https://github.com/ownego/polaris-vue/issues).
We will update the contribution rules later.

## License

Code released under the  [MIT License](https://github.com/ownego/polaris-vue/LICENSE).
Copyright (c) 2021 Ownego

**Thank you!** :tada:
