---
title: Utilities
outline: deep
next:
  text: 'Examples'
  link: '/examples'
---

# {{ $frontmatter.title }}

This page is about the utilities functions or setup guide that you need to know when using Polaris Vue.

## Icons

You can search for icons from [Shopify Polaris icons](https://polaris.shopify.com/icons) library or use any other SVG icon.

#### Setup

You have to use `vite-svg-loader` in your project to convert all imported SVG file into Vue standard component. See [Icon Component](/components/Icon) for more details.

Config in `vite.config.ts` if you are using Vite to compile your project:

::: code-group
```js [vite.config.ts]
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  plugins: [
    ...
    svgLoader(),
  ],
  ...
});
```
:::

::: warning
`vite-svg-loader` & `@shopify/polaris-icons` are already included in Polaris Vue package.
So you don't have to install any additional packages.
:::

#### Usage

- Search for the icon you want to use from [Shopify Polaris icons](https://polaris.shopify.com/icons) library.

- You can use the [Icon Component](/components/Icon) to display an icon in your component.

::: code-group
```vue [Composition API]
<script setup>
import CirclePlusMinor from '@shopify/polaris-icons/dist/svg/CirclePlusMinor.svg';
</script>

<template>
  <Icon :source="CirclePlusMinor">
</template>
```
```vue [Options API]
<script>
import CirclePlusMinor from '@shopify/polaris-icons/dist/svg/CirclePlusMinor.svg';

export default {
  setup() {
    return { CirclePlusMinor };
  },
}
</script>

<template>
  <Icon :source="CirclePlusMinor">
</template>
```
:::

## Locales

Polaris Vue provides the locale files for the `AppProvider` component. The locales are used for the translation of some default text in the component.

#### Setup

```vue [Layout.vue]
<template>
<AppProvider :i18n="locales">
  ...
</AppProvider>
</template>

<script setup>
import locales from '@ownego/polaris-vue/dist/locales/en.json';
</script>
```

#### List locales

The following locales are available:

- `cs` - Czech
- `da` - Danish
- `de` - German
- `en` - English
- `es` - Spanish
- `fi` - Finnish
- `fr` - French
- `it` - Italian
- `ja` - Japanese
- `ko` - Korean
- `nb` - Norwegian
- `nl` - Dutch
- `pl` - Polish
- `pt-BR` - Portuguese (Brazil)
- `pt-PT` - Portuguese (Portugal)
- `sv` - Swedish
- `th` - Thai
- `tr` - Turkish
- `vi` - Vietnamese
- `zh-CN` - Chinese (Simplified)
- `zh-TW` - Chinese (Traditional)

## Props type

There are some props is not type defined in the documentation, but you can follow the [Polaris Design Tokens](https://polaris.shopify.com/tokens) to use the correct type or value for them.

**For example:**

In [Box component](/components/Box), there are some prop types like: `ColorBackgroundAlias`, `ColorBorderAlias`, `BorderRadiusAliasOrScale`, ...

With `ColorBackgroundAlias`, you can use the color variables from [Color tokens](https://polaris.shopify.com/tokens/color) but without `--p-color` prefix.

With `BorderRadiusAliasOrScale` you can use the border radius variables from [Border radius tokens](https://polaris.shopify.com/tokens/border) but without `--p-border-radius` prefix.

```vue
<Box background="bg-fill-success-active" borderRadius="500">...</Box>
```

::: info
With other types like `Element`, `Component`,... They are normally HTML elements or Vue components.
:::
