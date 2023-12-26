<template lang="pug">
.docs-props-table
  .docs-props-table__wrapper(v-if="cSlots")
    .docs-props-table__table
      .docs-props-table__th {{ component }} slots
      .docs-props-table__row(
        v-for="p in cSlots",
        :key="p.name",
      )
        dt
          span.dpt__name
            span.dpt__name--colorize #
            | {{ p.name }}
          span.dpt__types
            span.dpt__type.dpt-type-separator(v-if="!isString(p.schema)") &lcub;&nbsp;

            template(
              v-for="t, index in serializeParams(p.schema)",
              :key="t",
            )
              span.dpt__type.dpt-type-separator(v-if="index") &comma;&nbsp;
              span.dpt__type.dpt-type-name(v-if="t.name") {{ t.name }}&colon;&nbsp;
              span.dpt__type(
                :data-props-type="defineTypeFormat(t.type)",
              ) {{ t.type }}

            span.dpt__type.dpt-type-separator(v-if="!isString(p.schema)") &nbsp;&rcub;

        dd(v-if="p.description || (ptags && p.tags.length > 0)")
          p.dpt__description(v-html="p.description")

  .docs-props-table--non-prop(v-else)
    div(v-html="noMetaContent")
</template>

<script setup lang="ts">
import { computed } from 'vue';
import MarkdownIt from 'markdown-it';
import type { PropertyMetaSchema } from 'vue-component-meta';
import { useMeta } from '../use/useMeta';

const {
  cSlots,
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

const isString = (value: any): value is string => {
  return typeof value === 'string';
};

const serializeParams = (schema: PropertyMetaSchema) => {
  if (typeof schema === 'string') {
    return serializeSchema(schema).map((key) => {
      return {
        type: key,
      };
    });
  }

  return Object.keys(schema.schema).map((key) => {
    return {
      name: key,
      type: schema.schema[key].type,
    };
  });
};
</script>

<style lang="scss">
@import '../scss/meta-tables.scss';
</style>
