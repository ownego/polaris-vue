---
layout: doc
title: App provider
category: Utilities
outline: deep
examples:
  - fileName: Default.vue
    title: Default
    description: AppProvider works by default without any additional options passed to it.
  - fileName: I18n.vue
    title: With i18n
    description: With an `i18n`, `AppProvider` will provide these translations to polaris components. See [using translations](https://polaris.shopify.com/components/app-provider#using-translations)
description: App provider is a required component that enables sharing global settings throughout the hierarchy of your application.
head:
  - - meta
    - name: keywords
      content: app provider appprovider internationalization i18n localization context translate translation application-wrapper wrapper sdk
  - - meta
    - name: description
      content: App provider is a required component that enables sharing global settings throughout the hierarchy of your application.
---

# {{ $frontmatter.title }}

<Lede>

{{ $frontmatter.description }}

</Lede>

<Examples>

<<< ./[examples]

</Examples>

## Props

<PropsTable />

## Slots

<SlotsTable />

## Best practices

<BestPractices />

