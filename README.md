# Polaris Vue

# Not released yet. Coming soon...


Polaris Vue by Qikify based on [Shopify Polaris style guide](https://polaris.shopify.com/).
We're trying to make it mostly close with Shopify style guide and get a better performance.

### Documentation

Online documentation: [Click Here](https://qikify.github.io/polaris-vue/)

## Installation

Via NPM:

```bash
npm install @qikify/polaris-vue
```

Via Yarn:

```bash
yarn add @qikify/polaris-vue
```

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

## Components List

Here are all the components and their status. Please check the [component's documentation](https://polaris.qikify.com/) for more information.
If you want to contribute, all pull requests are welcome.

| Component           | Status          | Description |
| ---                 | ---             | ---         |
| Button              | *Ongoing*       | - |
| Icon                | Completed       | - |
| Link                | Completed       | - |
| List                | Completed       | - |

---

## Developers / Build

```bash
# Clone repo
git clone https://github.com/qikify/polaris-vue.git

# Install packages
yarn

# Development & Demo - http://localhost:1902
yarn serve

# Build main library
yarn build-bundle
```

## Contributing

Polaris Vue by qikify is an open source project and we are very happy to accept community contributions.

If you notice any bugs, please create issues under [Issues](https://github.com/qikify/polaris-vue/issues).
We will update the contribution rules later.

## License

Code released under the  [MIT License](https://github.com/qikify/polaris-vue/LICENSE).
Copyright (c) 2021 Qikify

**Thank you!** :tada:
