<template lang="pug">
.docs-props-table
  .docs-props-table__wrapper(v-if="cEvents")
    .docs-props-table__table
      .docs-props-table__th {{ component }} events
      .docs-props-table__row(
        v-for="p in cEvents",
        :key="p.name",
      )
        dt
          span.dpt__name
            | {{ p.name }}
          span.dpt__types
            template(
              v-for="t, index in serializeParams(p.type)",
              :key="t",
            )
              span(v-if="index") |
              span.dpt__type(
                :data-props-type="defineTypeFormat(t)",
              ) {{ t }}

        dd(v-if="p.description || p.tags.length > 0")
          p.dpt__description(v-html="p.description")

  .docs-props-table--non-prop(v-else)
    div(v-html="noMetaContent")
</template>

<script setup lang="ts">
import { computed } from 'vue';
import MarkdownIt from 'markdown-it';
import { useMeta } from '../use/useMeta';

const {
  cEvents,
  component,
  serializeSchema,
  defineTypeFormat,
} = useMeta();
const md = new MarkdownIt();

console.log(cEvents);

const noMetaContent = computed(() => {
  return md.render(`
    No slots found for this component, run \`yarn gen:docs\` to generate component meta first.
  `);
});
</script>

<style lang="scss">
@import '../scss/meta-tables.scss';
</style>
