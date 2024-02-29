---
title: Contributing
outline: deep
next: false
---

# Contributing

Polaris Vue by ownego is an open source project and we are very happy to accept community contributions.

## Issues

If you find a bug in the source code or a mistake in the documentation, you can help us by submitting an issue to our [GitHub Repository](https://github.com/ownego/polaris-vue). Even better, you can submit a Pull Request with a fix.

Follow [Github Project](https://github.com/orgs/ownego/projects/2) to see what we are working on and the progress of the project.

## Dev locally

Clone/Fork the repository then install dependencies with `yarn install`

#### Install Shopify Polaris submodule
- Fetch the Shopify Polaris submodule with `git submodule update --init --recursive`
- Go to `/polaris` folder and install dependencies with `yarn install`
- Build tokens & neccessary resources with `yarn build`

#### Run
- Create `Demo.vue` file in `src/` folder and test your component there.
- Run the development server with `yarn dev`

## Pull Requests

We actively welcome your Pull Requests. Before you submit a Pull Request, please make sure that your code follows our coding conventions.

To submit a Pull Request, follow these steps:

1. Fork the repository and create your branch from `main`.
2. If you've added code that should be tested.
3. The whole documentation is automatically generated from the source code. If you've changed something in the source code, please make sure that the documentation is still correct.
4. Issue that Pull Request!

### Testing

Currently, we have not used any testing framework yet. You can create Demo.vue file in `src/` folder and test your component there.

You can also create examples in `docs/components/...` folder and test your component there.

### Coding conventions

- We use [ESLint](https://eslint.org/) to ensure that our code follows our coding conventions.
- We use [Pug](https://pugjs.org/api/getting-started.html) for HTML templating.

You can check `AppProvider.vue` to see the basic structure of a component and how it written.

Mostly cases we will comment on your Pull Request and ask you to fix it. If you have any questions, please feel free to ask us.

## Documentation

We use [VitePress](https://vitepress.vuejs.org/) for documentation. The whole documentation is automatically generated from the source code. It's very easy, huh?

The main works you have to do is:

1. Create a new folder in `docs/components/` with the name of your component.
2. Create `README.md` file in that folder. That's it.

For more details, please check `AppProvider` component documentation in `docs/components/AppProvider/README.md` file.

### How to run the documentation locally

1. Using Node.js `v18.18.2` as required.
2. Run `yarn gen:init` to prepare automatically generate types.
3. Run `yarn gen:docs` to generate component's metadata & content. (You have to run this command every time you change the component's props, events or slots)
4. Preview the docs by: `yarn docs:dev`

### Create examples

Check this PR for more details: [Text component examples](https://github.com/ownego/polaris-vue/pull/232/files)










