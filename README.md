# Polaris Vue

Polaris Vue by Qikify based on [Shopify Polaris style guide](https://polaris.shopify.com/).
We're trying to make it mostly close with Shopify style guide and get a better performance.

#### Progress: 30% (We're working very hard to make it 99%)

**Package size:** ~55KB (all components).

**Follow Polaris React version:** [7.6.0](https://github.com/Shopify/polaris-react/releases/tag/v7.6.0) - Release date: *19/01/2022*.

<br/>

## Documentation

Online documentation: [Click Here](https://qikify.github.io/polaris-vue/)

<br/>

## Installation

Via NPM:

```bash
npm install @qikify/polaris-vue
```

Via Yarn:

```bash
yarn add @qikify/polaris-vue
```

<br/>

## Usage

Use as a Vue plugin (globally registers all components):

```js
import Vue from 'vue';
import PolarisVue from '@qikify/polaris-vue';
import '@qikify/polaris-vue/dist/polaris-vue.css';

Vue.use(PolarisVue);

new Vue({
  components: {
    // all Polaris Vue components already registered
  }
});
```

**OR** use individual component:

```js
import Vue from 'vue';
import { List, Icon } from '@qikify/polaris-vue';

new Vue({
  components: {
    List,
    Icon
  }
});
```

<<<<<<< HEAD
### **Styles**
=======
<br/>

## **Styles**
>>>>>>> origin/dev

Polaris Vue supports both **CSS** & **SCSS**, you can find the neccessary styles files in `node_modules/@qikify/polaris-vue/dist/`.

#### **SCSS**

To use scss, you can import the `main.scss` file in your `.vue` or `.scss` file.

Or you can import separated scss files from dist to your project scss file.

Example:

```javascript
<style lang="scss">
@import '@qikify/polaris-vue/dist/scss/main.scss';
</style>
```

#### **CSS**

Similar with SCSS, you can import the `main.css` file in your `.vue` file. Or use it as standalone css file.

```javascript
<style>
@import '@qikify/polaris-vue/dist/css/main.css';
</style>
```

<br/>

## Aliasing Vue import

`PolarisVue` and `PortalVue` require access to the global Vue reference (via `import Vue from 'vue'`).

<<<<<<< HEAD
<font color="#0c5460">If you are using a specific build of Vue (i.e. runtime-only vs. compiler + runtime), you will need to set up an alias to `vue` in your bundler config to ensure that your project, **PolarisVue** and **PortalVue** are all using the same build version of Vue. If you are seeing an error such as <font color="red">"$attr and $listeners is readonly"</font>, or <font color="red">"Multiple instances of Vue detected"</font>, then you will need to set up an alias.</font>
=======
If you are using a specific build of Vue (i.e. runtime-only vs. compiler + runtime), you will need to set up an alias to `vue` in your bundler config to ensure that your project, **PolarisVue** and **PortalVue** are all using the same build version of Vue. If you are seeing an error such as `$attr and $listeners is readonly`, or `Multiple instances of Vue detected`, then you will need to set up an alias.
>>>>>>> origin/dev

<br/>

Example: Vue alias for `Vue CLI` in `vue.config.js`

```js
module.exports = {
  // ...
  resolve: {
    alias: {
      // If using the runtime only build
      vue$: 'vue/dist/vue.runtime.esm.js' // 'vue/dist/vue.runtime.common.js' for webpack 1
      // Or if using full build of Vue (runtime + compiler)
      // vue$: 'vue/dist/vue.esm.js'      // 'vue/dist/vue.common.js' for webpack 1
    }
  }
}
```

Example: Vue alias in `webpack.config.js`

```js
const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set(
      'vue$',
      // If using the runtime only build
      path.resolve(__dirname, 'node_modules/vue/dist/vue.runtime.esm.js')
      // Or if using full build of Vue (runtime + compiler)
      // path.resolve(__dirname, 'node_modules/vue/dist/vue.esm.js')
    )
  }
}
```

<br/>

## Components List

See [Component Status](https://qikify.github.io/polaris-vue/?path=/docs/component-status--page) in documentation.

---

## Developers / Build

```bash
# Clone repo
git clone https://github.com/qikify/polaris-vue.git

# Install packages
yarn

# Create a Demo.vue file to test

# Development & Demo - http://localhost:1902
yarn serve
```

## Contributing

Polaris Vue by qikify is an open source project and we are very happy to accept community contributions.

If you notice any bugs, please create issues under [Issues](https://github.com/qikify/polaris-vue/issues).
We will update the contribution rules later.

## License

Code released under the  [MIT License](https://github.com/qikify/polaris-vue/LICENSE).
Copyright (c) 2021 Qikify

**Thank you!** :tada:
