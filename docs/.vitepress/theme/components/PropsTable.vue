<template lang="pug">
.docs-props-table
  .docs-props-table__wrapper(v-if="cProps")
    .docs-props-table__table
      .docs-props-table__th interface {{ component }}Props
      .docs-props-table__row(
        v-for="p in cProps",
        :key="p.name",
      )
        dt
          span.dpt__name
            | {{ p.name }}
            span.dpt__optional(v-if="!p.required") ?
          span.dpt__types
            template(
              v-for="t, index in serializeSchema(p.schema)",
              :key="t",
            )
              span(v-if="index") |
              span.dpt__type(
                :data-props-type="defineTypeFormat(t)",
              ) {{ doubleQuoteToSingleQuote(t) }}

        dd(v-if="p.description || p.tags.length > 0")
          p.dpt__description(v-html="p.description")
          p.dpt__tags(v-if="p.tags")
            template(
              v-for="tag in p.tags",
              :key="tag.name",
            )
              span.dpt__tag(
                v-if="tag.name === 'default'",
                :data-tag-type="tag.name",
              )
                | Default to
                span {{ tag.text }}

  .docs-props-table--non-prop(v-else)
    div(v-html="noMetaContent")
</template>

<script setup lang="ts">
import { computed } from 'vue';
import MarkdownIt from 'markdown-it';
import { useMeta } from '../use/useMeta';

const {
  cProps,
  component,
  serializeSchema,
  defineTypeFormat,
} = useMeta();
const md = new MarkdownIt();

const noMetaContent = computed(() => {
  return md.render(`
    No props found for this component, run \`yarn gen:meta\` to generate component meta first.
  `);
});

const doubleQuoteToSingleQuote = (str: string) => str.replace(/"/g, "'");
</script>

<style lang="scss">
@import '../scss/meta-tables.scss';
</style>