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
            span.dpt__name--colorize @
            | {{ p.name }}
          span.dpt__types
            | (
            template(
              v-for="t, index in serializeParams(p.params)",
              :key="t",
            )
              span.dpt__type.dpt-type-separator(v-if="index") ,&nbsp;
              span.dpt__type.dpt-type-name {{ t.name }}:&nbsp;
              span.dpt__type(
                :data-props-type="defineTypeFormat(t.type)",
              ) {{ t.type }}
            | )

        dd(v-if="p.description || p.tags.length > 0")
          p.dpt__description(v-html="p.description")

  .docs-props-table--non-prop(v-else)
    div(v-html="noMetaContent")
</template>

<script setup lang="ts">
import { computed } from 'vue';
import MarkdownIt from 'markdown-it';
import { useMeta } from '../use/useMeta';

type EventParams = {
  [key: string]: string;
};

const {
  cEvents,
  component,
  serializeSchema,
  defineTypeFormat,
} = useMeta();
const md = new MarkdownIt();

const noMetaContent = computed(() => {
  return md.render(`
    No slots found for this component, run \`yarn gen:docs\` to generate component meta first.
  `);
});

const serializeParams = (params: Record<string, any>) => {
  return Object.keys(params).map((key) => {
    return {
      name: key,
      type: params[key],
    };
  });
};
</script>

<style lang="scss">
@import '../scss/meta-tables.scss';
</style>
